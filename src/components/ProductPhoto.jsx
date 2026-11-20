import { useState } from "react";
import GiftArt from "./GiftArt.jsx";

export default function ProductPhoto({ item, eager = false }) {
  const [failed, setFailed] = useState(false);

  // Show a fallback when the product photo cannot load.
  if (!item.id || failed) {
    return (
      <div className="product-photo photo-fallback">
        <GiftArt item={item} />
      </div>
    );
  }

  return (
    <img
      className="product-photo"
      src={`/images/products/${item.id}.webp`}
      alt={item.name}
      width="362"
      height="362"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
