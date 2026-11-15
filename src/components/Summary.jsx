import { Link } from "react-router-dom";
import { money } from "../utils/rules.js";
export default function Summary({
  count,
  used,
  box,
  subtotal,
  fee,
  total,
  budget,
  issues,
  compact = false,
}) {
  return (
    <div className={compact ? "summary compact" : "summary"}>
      <div className="summary-heading">
        <h3>Your little happiness tally</h3>
        <span aria-hidden="true">✳</span>
      </div>
      <div className="space-label">
        <span>Box space</span>
        <strong>
          {used} / {box.capacity}
        </strong>
      </div>
      <meter
        min="0"
        max={box.capacity}
        value={Math.min(used, box.capacity)}
        aria-label={`${used} of ${box.capacity} spaces used`}
      />
      <p className={used > box.capacity ? "error-text" : "muted"}>
        {used > box.capacity
          ? "A little too full. Time for a bigger box."
          : `${box.capacity - used} spaces left for something lovely`}
      </p>
      <dl>
        <div>
          <dt>Gifts ({count})</dt>
          <dd>{money(subtotal)}</dd>
        </div>
        <div>
          <dt>{box.name} box + card</dt>
          <dd>{money(box.price)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>
            {fee === null
              ? "Area unavailable"
              : fee === 0
                ? "On us ♡"
                : money(fee)}
          </dd>
        </div>
        <div className="total-row">
          <dt>Total</dt>
          <dd>{money(total)}</dd>
        </div>
      </dl>
      <p
        className={budget && total > budget ? "budget-warning" : "budget-good"}
      >
        {!budget
          ? "Set a budget on the gift shelf if you like."
          : total > budget
            ? `${money(total - budget)} over your guide budget`
            : `${money(budget - total)} left in your budget`}
      </p>
      <p className="small-print">
        Free delivery at Rs 4,000 in gifts; box fee excluded. All prices are
        final demo prices.
      </p>
      {!!issues.length && (
        <div className="issue-list" role="status">
          <strong>A little adjustment needed</strong>
          <ul>
            {issues.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}
      {compact && (
        <Link to="/box" className="button primary">
          Open my box <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
