import { Link, useLocation } from "react-router-dom";
import ProductPhoto from "./ProductPhoto.jsx";
import { money } from "../utils/rules.js";
export default function ProductCard({ item, quantity, add, reason }) {
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}`;
  return (
    <article className="product-card">
      <Link
        to={`/gifts/${item.id}`}
        state={{ returnTo }}
        className="art-link"
        aria-label={`View ${item.name}`}
      >
        <div className={`art-back art-${item.art}`}>
          <span className="product-tag">{item.tag}</span>
          <ProductPhoto item={item} />
          {quantity > 0 && (
            <span className="in-box">{quantity} in your box</span>
          )}
        </div>
      </Link>
      <div className="product-copy">
        <p className="eyebrow">{item.category}</p>
        <Link className="product-name" to={`/gifts/${item.id}`} state={{ returnTo }}>
          {item.name}
        </Link>
        <div className="product-meta">
          <strong>{money(item.price)}</strong>
          <span>
            {item.slots} {item.slots === 1 ? "space" : "spaces"} ·{" "}
            {item.stock ? `${item.stock} left` : "Sold out"}
          </span>
        </div>
        <button
          className="add-button"
          disabled={!!reason}
          onClick={() => add(item.id)}
        >
          {reason || (
            <>
              Add to box <span aria-hidden="true">＋</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
