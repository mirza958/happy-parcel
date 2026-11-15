import { useState } from "react";
import GiftArt from "./GiftArt.jsx";

export default function ProductPhoto({ item, eager = false }) {
  const [failed, setFailed] = useState(false);

  // The illustration keeps a missing photo from becoming a broken-image icon.
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
