import { Link } from "react-router-dom";
import { boxes, wraps } from "../data/products.js";
import BoxPreview from "../components/BoxPreview.jsx";
import Summary from "../components/Summary.jsx";
import ProductPhoto from "../components/ProductPhoto.jsx";
import { money } from "../utils/rules.js";
export default function Box({
  draft,
  setDraft,
  lines,
  changeQuantity,
  remove,
  box,
  used,
  summary,
  status,
}) {
  const wrap = wraps.find((w) => w.id === draft.wrap);
  return (
    <section className="page">
      <div className="section-head">
        <div>
          <p className="eyebrow">YOUR BOX</p>
          <h1>Make it personal.</h1>
          <p>Review your gifts, choose the packaging and add a note.</p>
        </div>
        <Link className="back-link" to="/">
          Continue browsing
        </Link>
      </div>
      <div className="box-layout">
        <div>
          <BoxPreview
            lines={lines}
            capacity={box.capacity}
            colour={wrap.colour}
            recipient={draft.cardTo}
            message={draft.cardMessage}
          />
          <fieldset className="option-group">
            <legend>Choose your box size</legend>
            <p>
              Capacity and packaging price are shown for each box. Exactly full is allowed.
            </p>
            <div className="size-options">
              {boxes.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  aria-pressed={draft.box === b.id}
                  className={draft.box === b.id ? "selected" : ""}
                  onClick={() => setDraft((old) => ({ ...old, box: b.id }))}
                >
                  <strong>{b.name}</strong>
                  <span>
                    {b.capacity} spaces · {money(b.price)}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="option-group">
            <legend>Choose the finish</legend>
            <div className="wrap-options">
              {wraps.map((w) => (
                <button
                  type="button"
                  key={w.id}
                  aria-pressed={draft.wrap === w.id}
                  onClick={() => setDraft((old) => ({ ...old, wrap: w.id }))}
                  className={draft.wrap === w.id ? "selected" : ""}
                >
                  <span style={{ background: w.colour }} aria-hidden="true" />
                  {w.name}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="check-panel">
            <input
              type="checkbox"
              checked={draft.scentFree}
              onChange={(e) =>
                setDraft((old) => ({ ...old, scentFree: e.target.checked }))
              }
            />
            <span>
              <strong>Keep it scent-free</strong>
              <small>
                No added-fragrance candles or soaps. This is not an allergy-safe
                guarantee.
              </small>
            </span>
          </label>
          <div className="card-fields">
            <h2>Add a personal note</h2>
            <label htmlFor="cardTo">
              Recipient first name <span>(optional)</span>
            </label>
            <input
              id="cardTo"
              maxLength="40"
              placeholder="e.g. Noor"
              value={draft.cardTo}
              onChange={(e) =>
                setDraft((old) => ({ ...old, cardTo: e.target.value }))
              }
            />
            <label htmlFor="cardMessage">
              Your card message <span>(optional)</span>
            </label>
            <textarea
              id="cardMessage"
              maxLength="180"
              rows="3"
              placeholder="A little something to remind you how lovely you are…"
              value={draft.cardMessage}
              onChange={(e) =>
                setDraft((old) => ({ ...old, cardMessage: e.target.value }))
              }
            />
            <small>
              {draft.cardMessage.length}/180 · Printed on a complimentary card
            </small>
          </div>
        </div>
        <div className="box-right">
          <div className="selected-list">
            <h2>Selected gifts</h2>
            {status !== "ready" && (
              <p role="status">
                Checking the latest shelf… Review opens once the catalogue is
                ready.
              </p>
            )}
            {lines.length ? (
              lines.map((item) => (
                <div className="selected-item" key={item.id}>
                  <ProductPhoto item={item} />
                  <div>
                    <Link to={`/gifts/${item.id}`}>{item.name}</Link>
                    <small>
                      {money(item.price)} each · {item.slots} spaces each
                    </small>
                    <div className="quantity">
                      <button
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span aria-label={`Quantity ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <button
                        aria-label={`Increase ${item.name}`}
                        disabled={!!item.addReason}
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        ＋
                      </button>
                      <button
                        className="remove"
                        onClick={() => remove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-selection">
                <p>Your box is empty. Choose a gift to get started.</p>
                <Link to="/" className="button secondary">
                  Browse the collection
                </Link>
              </div>
            )}
          </div>
          <Summary {...summary} />
          {status === "ready" && !summary.issues.length ? (
            <Link className="button primary wide" to="/checkout">
              Continue to delivery
            </Link>
          ) : (
            <button className="button primary wide" disabled>
              Resolve the selection issues to continue
            </button>
          )}
          <p className="small-print">
            Your box is saved on this browser. Checkout is a simulation.
          </p>
        </div>
      </div>
    </section>
  );
}
