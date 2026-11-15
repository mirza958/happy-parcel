import GiftArt from "./GiftArt.jsx";
export default function BoxPreview({
  lines,
  capacity,
  colour,
  message = "",
  recipient = "",
}) {
  const packed = lines.flatMap((line) =>
    Array.from({ length: Math.min(line.quantity, 14) }, (_, i) => ({
      ...line,
      key: `${line.id}-${i}`,
    })),
  );
  return (
    <div className="packing-scene" style={{ "--wrap": colour }}>
      <div className="packing-lid">
        <span>made for {recipient.trim() || "someone lovely"}</span>
        <span aria-hidden="true">✧</span>
      </div>
      <div className="packing-box">
        <div className="packing-tissue">
          <div className="packed-grid">
            {packed.length ? (
              packed.map((item, index) => (
                <div
                  className="packed-gift"
                  style={{ "--tilt": `${index % 2 ? 8 : -8}deg` }}
                  key={item.key}
                >
                  <GiftArt item={item} />
                  <span>{item.name}</span>
                </div>
              ))
            ) : (
              <div className="empty-box">
                <span aria-hidden="true">♡</span>
                <p>
                  A little empty.
                  <br />
                  Full of possibility.
                </p>
              </div>
            )}
          </div>
        </div>
        <span className="parcel-label">
          happy parcel <b>☺</b>
        </span>
      </div>
      <p className="packing-caption">
        Your {capacity}-space box · illustrated packing preview
      </p>
      {message && (
        <div className="card-preview">
          <span>DEAR {recipient.trim() || "YOU"},</span>
          <p>{message}</p>
          <span>A LITTLE LOVE, FROM ME ♡</span>
        </div>
      )}
    </div>
  );
}
