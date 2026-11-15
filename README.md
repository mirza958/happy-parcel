# Happy Parcel

**Irum · 24i2105 · Section A**  
CS4032 Web Programming — Assignment 02, Fall 2026

A fictional gift-box studio for students and young professionals sending thoughtful gifts in Islamabad and Rawalpindi. Customers browse 12 gifts, personalise a box and card, and finish a **simulated** checkout. The objective is a completed custom-box order with clear prices and recoverable mistakes.

## Run locally

Install Node.js 22.12+ (24 also works), then in this folder:

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Open the local address printed by Vite. Use a server; double-clicking index.html does not run JSX.

## Links and submission status

- Public GitHub repository: **not yet connected**. The real local development commits are included in the working repository. Push the existing history; do not recreate or backdate commits. A public GitHub repository was not available at the beginning, so the brief's public-from-start requirement has not been fully met.
- Public Vercel website: https://happy-parcel.vercel.app (opens without login).
- Final source commit: run `git rev-parse HEAD`; the handoff records it outside the source tree to avoid a self-referencing commit.
- Student name is the supplied name, Irum. Use the full official name if your class requires it.

## Routes

| Route | Purpose |
|---|---|
| `/` | Gift shelf, search, category filter, sorting, optional budget filter |
| `/gifts/:id` | Gift details, availability, ingredients/care and add action |
| `/box` | Quantities, packaging, scent-free preference, card and itemised total |
| `/checkout` | Controlled delivery form with validation |
| `/confirmation` | Current-session demo receipt; useful guidance without an order |
| Other routes | Helpful not-found screen |

## Operating rules

1. **Capacity / availability:** boxes hold 6, 10 or 14 space units. A gift uses 1 or 2 units per copy. Stock limits also apply. Exactly full is valid; adding beyond the limit is disabled. Switching to a smaller box preserves items, explains excess and blocks checkout until corrected.
2. **Compatibility:** scent-free packing cannot contain fragranced candles or soap. Switching it on preserves existing gifts, explains conflicts and blocks checkout until they are removed or the preference is changed. This is not an allergy-safe claim.
3. **Fulfilment / pricing:** deliver to Islamabad or Rawalpindi only. Delivery is Rs 250 below Rs 4,000 in merchandise and zero at or above Rs 4,000. Packaging is excluded from the threshold. An unsupported city blocks completion. Budget is a guide, not an operating restriction.

The same exported `checkCapacity` function is used in the app and Node tests. Tests cover normal input, exactly 6/6, 7/6, malformed values, delivery boundaries and restored stock/scent conflicts.

## Reproduce edge cases

Open **Assignment demo controls** below the gift shelf.

- Loading failure: choose *Simulate loading failure*. The error preserves your box; *Try again* reloads normal data.
- Changed stock: add Sunny Side Mug, choose *Sunny Side Mug becomes unavailable*, then open your box. A conflict is displayed and checkout is blocked. Remove the mug or restore normal stock.
- Empty dataset: choose *Empty catalogue*. A shelf-empty message differs from search results with no matches. *Reload the shelf* restores normal data.
- No matches: search `zzznogift123`. *Show all gifts* clears filters without clearing your box.
- Capacity: pack 6 units in Little Hello; extra additions are blocked. Choose Big Hug, add more, then switch back to Little Hello to test recovery from a smaller capacity.
- Compatibility: add Peach Please Candle, then turn on scent-free packing in your box. Remove it or turn the preference off.
- Invalid ID: open `/gifts/not-a-gift`.
- Form errors: use Noor as recipient, leave email/address empty and submit. Valid fields remain. Choose Lahore to test the delivery-area rule.
- Persistence: pack a few gifts, change wrap/size and refresh. Current stock is checked again.
- Long content: the card accepts up to 180 characters; previews wrap. Unknown illustration types use the gift fallback in `GiftArt.jsx`.

## React concept map

| Concept | File / component |
|---|---|
| Shared state, functional updates and immutable arrays | `src/App.jsx`: add, remove, changeQuantity |
| Controlled fields, validation and focused errors | `src/pages/Checkout.jsx` |
| Props and callback props | `Browse` → `ProductCard`: item, add, addReason |
| Search/filter/sort and URL state | `src/pages/Browse.jsx` |
| Derived counts, spaces and totals | `src/App.jsx`, `Summary.jsx` |
| Promise loader, error handling and cancellation | `src/services/loadProducts.js`, App effect |
| Storage synchronization and cleanup | App storage effect; toast timeout cleanup |
| Router and URL parameters | `src/main.jsx`, `App.jsx`, `Details.jsx` |
| Independent operating rule and tests | `src/utils/rules.js`, `rules.test.js` |

## Assets, privacy and limits

All gift illustrations and layouts are original SVG/CSS. Google Fonts supplies DM Sans and Space Grotesk (open font licences); system fallbacks work if unavailable. No UI kit or prebuilt template is used. There are no remote product images to fail; missing illustration types show a generic parcel.

This is a frontend simulation: no payments, accounts, email, inventory reservation or deliveries. Use fictional checkout details. Email and street address are not stored; the box, optional card text/name and preferences are saved on this browser. Confirmation is held in session state and is intentionally not an order-tracking service. Packing units model capacity rather than actual geometry. Mock stock scenarios reset on page reload. The public deployment was verified on Vercel, including a refreshed product route and a completed demo order. The public GitHub repository is still needed before final submission.
