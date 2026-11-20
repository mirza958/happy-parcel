import ProductPhoto from "./ProductPhoto.jsx";
export default function BoxPreview({ lines, capacity, colour, message = "", recipient = "" }) {
  const packed = lines.flatMap(line => Array.from({length: Math.min(line.quantity,14)}, (_,i) => ({...line,key:`${line.id}-${i}`})));
  return <div className="packing-scene" style={{"--wrap":colour}}>
    <div className="packing-lid"><span>{recipient.trim() ? `For ${recipient.trim()}` : "Your gift selection"}</span><span className="preview-count">{packed.length} items</span></div>
    <div className="packing-box"><div className="packing-tissue"><div className="packed-grid">
      {packed.length ? packed.map(item => <div className="packed-gift" key={item.key}><ProductPhoto item={item}/><span>{item.name}</span></div>) : <div className="empty-box"><p>Start with something they love.</p><span>Your chosen gifts will appear here.</span></div>}
    </div></div><span className="parcel-label">HAPPY PARCEL</span></div>
    <p className="packing-caption">{capacity}-space box. Arrangement is a guide, not a physical fit calculation.</p>
    {message && <div className="card-preview"><span>DEAR {recipient.trim() || "YOU"},</span><p>{message}</p><span>YOUR PERSONAL MESSAGE</span></div>}
  </div>;
}
