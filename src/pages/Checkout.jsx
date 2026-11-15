import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Summary from "../components/Summary.jsx";
import { validateForm } from "../utils/rules.js";
export default function Checkout({ draft, summary, status, complete }) {
  const [form, setForm] = useState({
    recipient: draft.cardTo,
    email: "",
    address: "",
    city: "Islamabad",
    message: draft.cardMessage,
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const field = (name, value) => {
    const next = { ...form, [name]: value };
    setForm(next);
    if (submitted) setErrors(validateForm(next));
  };
  const submit = (e) => {
    e.preventDefault();
    const next = validateForm(form);
    setErrors(next);
    setSubmitted(true);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    if (status !== "ready" || summary.issues.length) return;
    complete(form);
    navigate("/confirmation");
  };
  const error = (name) =>
    errors[name] && (
      <span className="error-text" id={`${name}-error`}>
        {errors[name]}
      </span>
    );
  const props = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: (e) => field(name, e.target.value),
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  return (
    <section className="page">
      <p className="eyebrow">03 / THE FINISHING TOUCHES</p>
      <h1>Nearly ready to make their day.</h1>
      <p className="notice">
        Demo checkout only. Use fictional details such as Noor,
        hello@example.com and 12 Example Street, F-6. Nothing is sent, charged
        or delivered.
      </p>
      <div className="checkout-layout">
        <form ref={formRef} onSubmit={submit} noValidate>
          <h2>Who’s the lucky human?</h2>
          <label htmlFor="recipient">Recipient name</label>
          <input {...props("recipient")} autoComplete="off" maxLength="60" />
          {error("recipient")}
          <label htmlFor="email">Your email</label>
          <input {...props("email")} type="email" autoComplete="off" />
          {error("email")}
          <label htmlFor="city">Delivery city</label>
          <select {...props("city")}>
            <option>Islamabad</option>
            <option>Rawalpindi</option>
            <option>Lahore</option>
            <option>Other</option>
          </select>
          {error("city")}
          <small>
            Islamabad and Rawalpindi only. Rs 250 delivery; free from Rs 4,000
            in gifts.
          </small>
          <label htmlFor="address">Street and area</label>
          <textarea {...props("address")} rows="3" autoComplete="off" />
          {error("address")}
          <label htmlFor="message">
            Gift message <span>(optional)</span>
          </label>
          <textarea {...props("message")} rows="3" />
          {error("message")}
          <small>{form.message.length}/180 characters</small>
          <label className="consent">
            <input
              id="consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => field("consent", e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            I understand this is a simulated order, with no payment or delivery.
          </label>
          {error("consent")}
          {submitted && !!Object.keys(errors).length && (
            <p role="alert" className="error-text">
              Please fix the highlighted fields. Your other details are still
              here.
            </p>
          )}
          <button
            className="button primary wide"
            disabled={status !== "ready" || !!summary.issues.length}
          >
            Confirm my demo parcel ✧
          </button>
          <Link className="text-link" to="/box">
            ← Make a change to my box
          </Link>
        </form>
        <Summary
          {...summary}
          fee={
            ["Islamabad", "Rawalpindi"].includes(form.city) ? summary.fee : null
          }
        />
      </div>
    </section>
  );
}
