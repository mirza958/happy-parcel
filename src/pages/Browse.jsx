import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import ProductPhoto from "../components/ProductPhoto.jsx";
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
          <p className="eyebrow">PERSONAL GIFTING / ISLAMABAD & RAWALPINDI</p>
          <h1>A considered gift.<br /><em>Entirely their own.</em></h1>
          <p>Everyday comforts, good chocolate and a note from you. Choose the pieces, personalise the parcel, and see the full price before you finish.</p>
          <div className="hero-actions"><a className="button primary" href="#gift-shelf">Explore the collection</a><Link className="button secondary" to="/box">Build your box</Link></div>
          <div className="hero-foot"><span>12 individual gifts</span><span>Boxes from Rs 300</span><span>A personal card included</span></div>
        </div>
        <figure className="hero-collection">
          <div className="hero-photo-main"><ProductPhoto item={{id:"sunny-mug",name:"Sunny Side ceramic mug"}} eager /></div>
          <div className="hero-photo-small"><ProductPhoto item={{id:"notebook",name:"Dotted notebook"}} eager /></div>
          <div className="hero-photo-small"><ProductPhoto item={{id:"chocolate",name:"Caramel milk chocolate"}} eager /></div>
          <figcaption><span>THE EVERYDAY COLLECTION</span><span>Small things. Chosen well.</span></figcaption>
        </figure>
      </section>
      <div className="service-strip"><span>Choose your gifts</span><span>Pick the box & finish</span><span>Add a personal note</span></div>
      <section id="gift-shelf" className="shelf">
        <div className="section-head">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Find their next favourite.</h2>
            <p>Compare prices, stock and packing space before adding a gift.</p>
          </div>
          <div className="budget-input">
            <label htmlFor="budget">
              Your budget <span>(optional guide)</span>
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
              <option value="featured">Featured</option>
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
          <span>{results.length} gifts in the collection</span>
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
            <span className="loader" aria-hidden="true" />
            <h3>Stocking the happy shelf…</h3>
            <p>Your selections are staying right here.</p>
          </div>
        ) : status === "error" ? (
          <div className="state-card" role="alert">
            <h3>The collection could not be loaded.</h3>
            <p>
              We couldn’t load the gifts. Your saved box hasn’t been cleared.
            </p>
            <button className="button primary" onClick={retry}>
              Try again
            </button>
          </div>
        ) : !products.length ? (
          <div className="state-card">
            <h3>The collection is currently empty.</h3>
            <p>There are no gifts in this catalogue right now.</p>
            <button className="button primary" onClick={retry}>
              Reload the shelf
            </button>
          </div>
        ) : !results.length ? (
          <div className="state-card">
            <h3>No gifts match your search.</h3>
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
