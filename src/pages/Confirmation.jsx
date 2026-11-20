import { Link } from "react-router-dom";
import BoxPreview from "../components/BoxPreview.jsx";
import { money } from "../utils/rules.js";
export default function Confirmation({ order }) {
  if (!order)
    return (
      <section className="page state-card">
        <h1>No order to display.</h1>
        <p>Complete your box and demo checkout to see its confirmation.</p>
        <Link className="button primary" to="/">
          Browse the collection
        </Link>
      </section>
    );
  return (
    <section className="page confirmation">
      <p className="eyebrow">ORDER REVIEW</p>
      <h1>Your parcel is ready.</h1>
      <p>
        Your demo parcel for <strong>{order.recipient}</strong> is complete.
      </p>
      <p className="order-number">{order.reference} · SIMULATED ORDER</p>
      <BoxPreview
        lines={order.lines}
        capacity={order.box.capacity}
        colour={order.colour}
        recipient={order.recipient}
        message={order.message}
      />
      <div className="confirmation-receipt">
        <h2>Order receipt</h2>
        {order.lines.map((l) => (
          <p key={l.id}>
            <span>
              {l.quantity} × {l.name}
            </span>
            <strong>{money(l.price * l.quantity)}</strong>
          </p>
        ))}
        <p>
          <span>{order.box.name} + card</span>
          <strong>{money(order.box.price)}</strong>
        </p>
        <p>
          <span>Delivery to {order.city}</span>
          <strong>{money(order.fee)}</strong>
        </p>
        <p className="total-row">
          <span>Total</span>
          <strong>{money(order.total)}</strong>
        </p>
      </div>
      <p>
        Nothing was charged, emailed or delivered. This confirmation lasts for
        this session.
      </p>
      <Link className="button primary" to="/">
        Back to the collection
      </Link>
      <Link className="text-link" to="/box">
        Edit this box
      </Link>
    </section>
  );
}
