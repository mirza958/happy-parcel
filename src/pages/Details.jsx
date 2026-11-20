import { Link, useParams, useLocation } from "react-router-dom";
import ProductPhoto from "../components/ProductPhoto.jsx";
import { money } from "../utils/rules.js";
export default function Details({ products, status, add, addReason, retry }) {
  const { id } = useParams();
  const { state } = useLocation();
  const returnTo = state?.returnTo?.startsWith("/?") ? state.returnTo : "/";
  if (status === "loading")
    return (
      <section className="page state-card" role="status">
        Finding your little favourite…
      </section>
    );
  if (status === "error")
    return (
      <section className="page state-card">
        <h1>The shelf didn’t load.</h1>
        <button onClick={retry}>Try again</button>
      </section>
    );
  const item = products.find((p) => p.id === id);
  if (!item)
    return (
      <section className="page state-card">
        <h1>Gift not found.</h1>
        <p>This link may be old, or this gift is no longer available.</p>
        <Link className="button primary" to="/">
          Browse available gifts
        </Link>
      </section>
    );
  return (
    <section className="page">
      <Link className="back-link" to={returnTo}>
        Back to the collection
      </Link>
      <div className="details-layout">
        <div className={`detail-art art-${item.art}`}>
          <ProductPhoto key={item.id} item={item} eager />
        </div>
        <div>
          <p className="eyebrow">{item.category}</p>
          <h1>{item.name}</h1>
          <p className="detail-price">{money(item.price)}</p>
          <p>{item.description}</p>
          <dl className="specs">
            <div>
              <dt>Box space</dt>
              <dd>{item.slots} of your box’s space units</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>
                {item.stock
                  ? `${item.stock} ready to pack`
                  : "Temporarily sold out"}
              </dd>
            </div>
            <div>
              <dt>Fragrance</dt>
              <dd>
                {item.scented ? "Contains fragrance" : "No added fragrance"}
              </dd>
            </div>
          </dl>
          <p className="notice">{item.details}</p>
          <button
            className="button primary"
            disabled={!!addReason(item)}
            onClick={() => add(item.id)}
          >
            {addReason(item) || "Add this little happy ＋"}
          </button>
          <Link className="text-link" to="/box">
            Review your box
          </Link>
        </div>
      </div>
    </section>
  );
}
