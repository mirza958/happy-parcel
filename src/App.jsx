import { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { boxes, wraps } from "./data/products.js";
import { loadProducts } from "./services/loadProducts.js";
import {
  selectionIssues,
  deliveryFee,
  checkCapacity,
  money,
} from "./utils/rules.js";
import Browse from "./pages/Browse.jsx";
import Details from "./pages/Details.jsx";
import Box from "./pages/Box.jsx";
import Checkout from "./pages/Checkout.jsx";
import Confirmation from "./pages/Confirmation.jsx";

const STORAGE = "happy-parcel-v1";
const initial = {
  cart: [],
  box: "mini",
  wrap: "peach",
  budget: 3000,
  scentFree: false,
  cardTo: "",
  cardMessage: "",
};
function restoreDraft() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return { draft: initial, note: "" };
    const saved = JSON.parse(raw);
    if (!saved || !Array.isArray(saved.cart))
      throw new Error("Invalid saved draft");
    const seen = new Set();
    const cart = [];
    for (const line of saved.cart) {
      const valid =
        line &&
        typeof line.id === "string" &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0 &&
        line.quantity <= 100;
      if (valid && !seen.has(line.id)) {
        cart.push({ id: line.id, quantity: line.quantity });
        seen.add(line.id);
      }
    }
    return {
      draft: {
        ...initial,
        cart,
        box: boxes.some((b) => b.id === saved.box) ? saved.box : "mini",
        wrap: wraps.some((w) => w.id === saved.wrap) ? saved.wrap : "peach",
        budget: Number.isFinite(saved.budget)
          ? Math.max(0, Math.min(saved.budget, 100000))
          : 3000,
        scentFree: saved.scentFree === true,
        cardTo:
          typeof saved.cardTo === "string" ? saved.cardTo.slice(0, 40) : "",
        cardMessage:
          typeof saved.cardMessage === "string"
            ? saved.cardMessage.slice(0, 180)
            : "",
      },
      note: "Your last little box is back. We’ll check it against today’s stock.",
    };
  } catch {
    return {
      draft: initial,
      note: "Your saved box could not be read, so we started a fresh one.",
    };
  }
}

export default function App() {
  const [restored] = useState(restoreDraft);
  const [draft, setDraft] = useState(restored.draft);
  const [storageNote, setStorageNote] = useState(restored.note);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [mode, setMode] = useState("normal");
  const [attempt, setAttempt] = useState(0);
  const [toast, setToast] = useState("");
  const [order, setOrder] = useState(null);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    loadProducts(mode, controller.signal)
      .then((data) => {
        setProducts(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, [mode, attempt]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(draft));
    } catch {
      setStorageNote(
        "Browser storage is unavailable. Keep this tab open to keep your box.",
      );
    }
  }, [draft]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  const box = boxes.find((b) => b.id === draft.box);
  // Keep unavailable items visible so the user can remove them.
  const lines = draft.cart.map((line) => {
    const item = products.find((p) => p.id === line.id);
    return {
      ...item,
      ...line,
      name: item?.name || "Unavailable gift",
      price: item?.price || 0,
      slots: item?.slots || 0,
    };
  });
  const used = lines.reduce((sum, l) => sum + l.slots * l.quantity, 0);
  const count = draft.cart.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const fee = deliveryFee("Islamabad", subtotal);
  const total = subtotal + box.price + fee;
  const issues =
    status === "ready"
      ? selectionIssues(draft.cart, products, box, draft.scentFree)
      : ["Wait for the gift shelf to load before continuing."];
  const summary = {
    box,
    count,
    used,
    subtotal,
    fee,
    total,
    budget: draft.budget,
    issues,
  };
  function addReason(item) {
    if (status !== "ready") return "Checking stock";
    const quantity = draft.cart.find((l) => l.id === item.id)?.quantity || 0;
    if (!item.stock) return "Back soon";
    if (quantity >= item.stock) return "All available packed";
    if (draft.scentFree && item.scented) return "Not scent-free";
    if (!checkCapacity(used + item.slots, box.capacity))
      return "Needs a bigger box";
    return "";
  }
  function add(id) {
    const item = products.find((p) => p.id === id);
    if (!item || addReason(item)) return;
    setDraft((old) => ({
      ...old,
      cart: old.cart.some((l) => l.id === id)
        ? old.cart.map((l) =>
            l.id === id ? { ...l, quantity: l.quantity + 1 } : l,
          )
        : [...old.cart, { id, quantity: 1 }],
    }));
    setToast(`${item.name} — added to your box.`);
  }
  function remove(id) {
    setDraft((old) => ({ ...old, cart: old.cart.filter((l) => l.id !== id) }));
    setToast("Gift removed. Room for something else.");
  }
  function changeQuantity(id, delta) {
    if (delta > 0) {
      add(id);
      return;
    }
    setDraft((old) => ({
      ...old,
      cart: old.cart.flatMap((l) =>
        l.id !== id
          ? [l]
          : l.quantity === 1
            ? []
            : [{ ...l, quantity: l.quantity - 1 }],
      ),
    }));
  }
  function complete(form) {
    if (issues.length || status !== "ready") return;
    setOrder({
      reference: `HP-${Date.now().toString().slice(-6)}`,
      recipient: form.recipient.trim(),
      city: form.city,
      message: form.message,
      lines: lines.map((l) => ({ ...l })),
      box: { ...box },
      colour: wraps.find((w) => w.id === draft.wrap).colour,
      fee,
      total,
    });
  }
  const retry = () => {
    setMode("normal");
    setAttempt((old) => old + 1);
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="announcement">Delivery to Islamabad & Rawalpindi <span>Free delivery on Rs 4,000 in gifts</span></div>
      <header>
        <Link to="/" className="brand" aria-label="Happy Parcel home">
          <svg className="brand-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 10h22v17H5zM3 6h26v6H3zM16 6v21M16 6c-7 1-10-5-6-5 3 0 6 5 6 5Zm0 0c7 1 10-5 6-5-3 0-6 5-6 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
          <span>happy parcel<span className="brand-dot">.</span></span>
        </Link>
        <nav aria-label="Main navigation"><NavLink to="/" end>Collection</NavLink><NavLink to="/box">Build your box</NavLink></nav>
        <Link className="bag-link" to="/box">Your box <b>{count}</b></Link>
      </header>
      <main id="main">
        <Routes>
          <Route
            path="/"
            element={
              <Browse
                products={products}
                cart={draft.cart}
                add={add}
                addReason={addReason}
                draft={draft}
                setDraft={setDraft}
                total={total}
                status={status}
                retry={retry}
                mode={mode}
                setMode={setMode}
                storageNote={storageNote}
              />
            }
          />
          <Route
            path="/gifts/:id"
            element={
              <Details
                products={products}
                status={status}
                add={add}
                addReason={addReason}
                retry={retry}
              />
            }
          />
          <Route
            path="/box"
            element={
              <Box
                draft={draft}
                setDraft={setDraft}
                lines={lines.map((l) => ({
                  ...l,
                  addReason: addReason(
                    products.find((p) => p.id === l.id) || { stock: 0 },
                  ),
                }))}
                changeQuantity={changeQuantity}
                remove={remove}
                box={box}
                used={used}
                summary={summary}
                status={status}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                draft={draft}
                summary={summary}
                status={status}
                complete={complete}
              />
            }
          />
          <Route
            path="/confirmation"
            element={<Confirmation order={order} />}
          />
          <Route
            path="*"
            element={
              <section className="page state-card">
                <h1>Page not found.</h1>
                <p>That page isn’t on our shelf.</p>
                <Link className="button primary" to="/">
                  Browse gifts
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <footer>
        <div><Link className="footer-brand" to="/">happy parcel.</Link><p>Gifts chosen with someone in mind.</p></div>
        <p>Thoughtfully packed in Islamabad.<br />Delivery to Islamabad & Rawalpindi.</p>
        <small>Fictional student business. Simulated orders only. Product imagery created for this project.</small>
      </footer>
      {location.pathname === "/" && count > 0 && (
        <div className="floating-box">
          <span>
            <b>{count} gifts selected</b>
            <small>
              {used}/{box.capacity} spaces · {money(total)} incl. delivery
            </small>
          </span>
          <Link className="button primary" to="/box">
            Review your box
          </Link>
        </div>
      )}
      <div
        className={`toast ${toast ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </>
  );
}
