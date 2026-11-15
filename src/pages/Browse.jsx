import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import GiftArt from "../components/GiftArt.jsx";
import { money, deliveryFee } from "../utils/rules.js";

export default function Browse({
  products,
  cart,
  add,
  addReason,
  draft,
  setDraft,
  total,
  status,
  retry,
  mode,
  setMode,
  storageNote,
}) {
  const [params, setParams] = useSearchParams();
  const search = params.get("q") || "";
  const category = params.get("category") || "All gifts";
  const sort = params.get("sort") || "featured";
  const affordable = params.get("budget") === "yes";
  const merchandise = cart.reduce(
    (sum, line) =>
      sum +
      (products.find((p) => p.id === line.id)?.price || 0) * line.quantity,
    0,
  );
  // Adding a gift may cross the free-delivery threshold, so recalculate its fee.
  const priceAfterAdding = (price) =>
    total -
    deliveryFee("Islamabad", merchandise) +
    price +
    deliveryFee("Islamabad", merchandise + price);
  const update = (key, value) =>
    setParams(
      (old) => {
        const next = new URLSearchParams(old);
        value ? next.set(key, value) : next.delete(key);
        return next;
      },
      { replace: true },
    );
  const results = products
    .filter(
      (p) =>
        `${p.name} ${p.category} ${p.description}`
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (category === "All gifts" || p.category === category) &&
        (!affordable || priceAfterAdding(p.price) <= draft.budget),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : 0,
    );
  const selectedHidden = cart.filter(
    (line) => !results.some((p) => p.id === line.id),
  ).length;
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="spark">✦</span> GOOD THINGS COME IN YOUR BOX
          </p>
          <h1>
            A little box.
            <br />A <em>whole lot</em> of happy.
          </h1>
          <p>
            For your favourite human. Pick the little things they love, add a
            note, and make it unmistakably theirs.
          </p>
          <a className="button primary" href="#gift-shelf">
            Let’s make their day <span aria-hidden="true">↗</span>
          </a>
          <div className="hero-foot">
            <span>✧ Packed with personality</span>
            <span>♡ Made by you</span>
          </div>
        </div>
        <div
          className="hero-scene"
          aria-label="An illustrated gift box with a mug, socks and chocolate"
          role="img"
        >
          <span className="scribble">a hug, but in a box ↘</span>
          <div className="orbit orbit-one">✳</div>
          <div className="orbit orbit-two">✧</div>
          <div className="sample-lid">
            happy parcel <span>☺</span>
          </div>
          <div className="sample-box">
            <GiftArt
              item={
                products.find((p) => p.art === "mug") || {
                  art: "mug",
                  colour: "#efbe50",
                  name: "Mug",
                }
              }
            />
            <GiftArt
              item={{ art: "socks", colour: "#a8b4df", name: "Socks" }}
            />
            <GiftArt
              item={{ art: "chocolate", colour: "#df9bc7", name: "Chocolate" }}
            />
            <span className="sample-stamp">
              a little
              <br />
              something
              <br />
              <b>lovely.</b>
            </span>
          </div>
          <div className="round-sticker">
            100%
            <br />
            <strong>thoughtful</strong>
            <br />
            0% boring
          </div>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <span>SMALL GIFTS, BIG FEELINGS</span>✳<span>YOU PICK. WE PACK.</span>✳
        <span>HAPPINESS, DELIVERED.</span>✳
        <span>SMALL GIFTS, BIG FEELINGS</span>
      </div>
      <section id="gift-shelf" className="shelf">
        <div className="section-head">
          <div>
            <p className="eyebrow">01 / THE FUN PART</p>
            <h2>What’s their kind of happy?</h2>
            <p>A little sweet, a little cosy, a little “this is so you”.</p>
          </div>
          <div className="budget-input">
            <label htmlFor="budget">
              Your happy budget <span>(optional guide)</span>
            </label>
            <div>
              <span>Rs</span>
              <input
                id="budget"
                type="number"
                min="0"
                max="100000"
                step="100"
                value={draft.budget}
                onChange={(e) =>
                  setDraft((old) => ({
                    ...old,
                    budget: Math.max(
                      0,
                      Math.min(100000, Number(e.target.value)),
                    ),
                  }))
                }
              />
            </div>
          </div>
        </div>
        {storageNote && (
          <p className="notice" role="status">
            {storageNote}
          </p>
        )}
        <div className="discovery">
          <label className="search-label">
            <span className="sr-only">Search gifts</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Find their next favourite thing…"
              value={search}
              onChange={(e) => update("q", e.target.value)}
            />
          </label>
          <label className="sort-label">
            Sort{" "}
            <select
              value={sort}
              onChange={(e) => update("sort", e.target.value)}
            >
              <option value="featured">Our favourites</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>
        <div className="filters" aria-label="Gift categories">
          {[
            "All gifts",
            "Little comforts",
            "Sweet things",
            "Slow moments",
            "Desk joy",
          ].map((c) => (
            <button
              key={c}
              className={category === c ? "active" : ""}
              aria-pressed={category === c}
              onClick={() => update("category", c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="results-line">
          <span>{results.length} little reasons to smile</span>
          <label>
            <input
              type="checkbox"
              checked={affordable}
              onChange={(e) => update("budget", e.target.checked ? "yes" : "")}
            />{" "}
            Fits my remaining budget
          </label>
        </div>
        {selectedHidden > 0 && (
          <p className="notice">
            {selectedHidden} selected gift type(s) are hidden by your filters.
            They’re still safely in <Link to="/box">your box</Link>.
          </p>
        )}
        {status === "loading" ? (
          <div className="state-card" role="status">
            <span className="loader">✳</span>
            <h3>Stocking the happy shelf…</h3>
            <p>Your selections are staying right here.</p>
          </div>
        ) : status === "error" ? (
          <div className="state-card" role="alert">
            <h3>A small packing hiccup.</h3>
            <p>
              We couldn’t load the gifts. Your saved box hasn’t been cleared.
            </p>
            <button className="button primary" onClick={retry}>
              Try again
            </button>
          </div>
        ) : !products.length ? (
          <div className="state-card">
            <h3>The shelf is taking a little break.</h3>
            <p>There are no gifts in this catalogue right now.</p>
            <button className="button primary" onClick={retry}>
              Reload the shelf
            </button>
          </div>
        ) : !results.length ? (
          <div className="state-card">
            <h3>No matches, plenty of possibilities.</h3>
            <p>
              Try a shorter search or clear your filters. Your box stays as it
              is.
            </p>
            <button className="button primary" onClick={() => setParams({})}>
              Show all gifts
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {results.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                quantity={cart.find((l) => l.id === item.id)?.quantity || 0}
                add={add}
                reason={addReason(item)}
              />
            ))}
          </div>
        )}
        <p className="small-print">
          Space units are our simple packing guide, not a physical 3D fit
          calculation. Delivery: Rs 250; free at {money(4000)} in gifts.
          Islamabad & Rawalpindi.
        </p>
        <details className="demo-controls">
          <summary>Assignment demo controls</summary>
          <p>
            These controls intentionally change the mock catalogue. They never
            place an order.
          </p>
          <label>
            Catalogue scenario{" "}
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="normal">Normal catalogue</option>
              <option value="failure">Simulate loading failure</option>
              <option value="stock">Sunny Side Mug becomes unavailable</option>
              <option value="empty">Empty catalogue</option>
            </select>
          </label>
          <button onClick={retry}>Restore normal stock / retry</button>
        </details>
      </section>
    </>
  );
}
