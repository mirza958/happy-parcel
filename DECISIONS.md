# Frontend decisions

Reference inspected: https://boxfox.com/pages/build-a-boxfox?step=1&build_box=1 on 15 November 2026. Observations apply to the inspected interface, not every BOXFOX page or device.

## 1. Make the cost of packaging visible when choosing it

- **Problem:** the packaging cards display names and images without individual prices. Selecting Original Creme advances to the items step, where the selected Mini box shows $9.00. The inspected cards did not explain their costs before selection.
- **Decision:** show space capacity and packaging price together on every size button, plus an itemised total. On mobile, stack the buttons rather than squeeze prices into a narrow row.
- **Alternative:** show prices only in a final order review.
- **Reason:** customers can choose a parcel size with its financial consequence visible.
- **Tradeoff:** extra information makes the size selector taller on mobile. Our separate space-unit model is deliberately simpler than BOXFOX's automatic sizing; it does not claim accurate physical packing.
- **Code:** `src/pages/Box.jsx` size-options; `src/components/Summary.jsx`; `src/styles/main.css` mobile size-options.
- **Evidence:** `docs/screenshots/reference-packaging.jpg`, `app-box.jpg`, `app-mobile-box.jpg`. Open /box and compare the size buttons and calculated total before/after choosing Big Hug.

## 2. Give an empty search a clear way back

- **Problem:** in BOXFOX step 2, searching `zzznogift123` removes the product cards but leaves a blank area without a no-match explanation or explicit recovery action.
- **Decision:** distinguish a no-match search, an empty catalogue and a failed load. A no-match state offers Show all gifts and preserves the box. If filters hide selected gift types, explain that they are still selected.
- **Alternative:** clear search automatically when no products match.
- **Reason:** the user understands the result and decides how to recover without losing work.
- **Tradeoff:** conditional rendering adds a few states to maintain and test.
- **Code:** `src/pages/Browse.jsx`: results, selectedHidden and conditional state panels. Shared cart remains in `App.jsx`.
- **Evidence:** `reference-empty-search.jpg`, `app-empty-search.jpg`. Add gifts, search the same nonsense term, then choose Show all gifts; selections remain.

## 3. Use genuine keyboard controls for packaging

- **Problem:** BOXFOX's inspected Original Creme option and its clickable parent are DIV elements without a role or tabindex. The accessibility snapshot exposes names as generic text; tabbing from that area moves into footer links instead of the package choices. Pointer clicking the same card advances to step 2.
- **Decision:** size and wrap choices are native buttons with aria-pressed, visible focus and a selected state. All main tasks also work without dragging.
- **Alternative:** keep clickable DIV cards and add custom keyboard handling and ARIA manually.
- **Reason:** native controls give predictable Tab, Enter and Space interaction with less code.
- **Tradeoff:** buttons require authored styles to look like selectable cards, and every option is a tab stop.
- **Code:** `src/pages/Box.jsx` fieldsets and button handlers; focus-visible styles in `src/styles/main.css`.
- **Evidence:** `reference-keyboard.jpg` and the tab-order observations in `docs/VERIFICATION.md`; `app-mobile-box.jpg`. Focus Big Hug and press Enter, then focus Lilac daydream and press Space. Both change their selected state and the preview.

Possible business consequences are inferred: late price information may cause rework, unclear empty results may end browsing, and inaccessible choices can prevent keyboard customers from completing an order. No sales or abandonment statistics are claimed.
