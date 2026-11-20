# Verification record

15 November 2026. Browser: Chromium-based browser. Production browser and unrestricted public access checks are recorded separately in DEPLOYMENT.md. Initial preview exposed a JSX configuration error; automatic JSX transformation was configured and the server restarted before the tests below. Historical console entries from that failed initial preview are not evidence of errors in the corrected build.

| Check | Actions and expected result | Observed result |
|---|---|---|
| Browse and shared selection | Add mug, socks, chocolate; all routes show 3 gifts | Passed; 4/6 spaces and Rs 2,400 including packaging/delivery |
| Parameterized details and refresh | Open mug route and refresh | Passed; details and saved 3-gift box restored after mock loading |
| Search improvement | Search zzznogift123; clear filters | Passed; explanation, hidden-selection count and recovery button; selections retained |
| Capacity boundary | Increase mug to reach 6/6 | Passed; exact boundary accepted; extra mug disabled |
| Keyboard packaging | Enter on Big Hug; Space on Lilac | Passed; size/wrap updated, 6/10 spaces and recalculated price |
| Validation preservation | Name Noor, submit missing email/address | Passed; named errors, first invalid field focused, Noor and message retained |
| Unsupported area | Select Lahore and submit otherwise valid form | Passed; area-specific feedback; no confirmation |
| Completion | Correct to Islamabad with fictional details | Passed; demo receipt with 4 gifts, Rs 3,400 total |
| Loading failure | Failure scenario then Try again | Passed; error and normal catalogue recovery; box retained |
| Changed stock recovery | Make selected mug unavailable | Passed; exact conflict and disabled continuation; normal stock can be restored |
| Scent compatibility | Add candle then enable scent-free | Passed; candle-specific conflict; disabling preference resolves it |
| Mobile | 390 px viewport, browse/detail/box | Passed for tested screens; document width 375 px within 390 px viewport (scrollbar accounts for difference) |
| Back navigation | Search tea, sort low, open tea, Back | Passed; search value tea restored |
| Empty catalogue | Empty scenario then Reload shelf | Passed; distinct empty-dataset message and recovery |
| Invalid ID | /gifts/not-a-gift | Passed; after mock loading, useful not-found feedback and a shelf link are shown |

## Reference keyboard observation

The inspected Original Creme label is a DIV (`build-box--item__button`); its `build-box--item` parent is also a DIV. Both lack role and tabindex. After Tab from this area, focus moved to a link and then FAQ, ABOUT, CAREERS, CONTACT, BLOG, THE FOX FLEET, ACCESSIBILITY and THE HOLIDAY SHOP. Package choices were not reached in that path. This records the observed sequence rather than claiming a full accessibility audit.

## Automated tests

`npm test` / `node --test`: **6 passed, 0 failed**. The exported capacity function is the one called by addReason and selectionIssues in the application. Valid, boundary and over-capacity cases are separate assertions; supplementary cases check invalid capacity inputs, the delivery threshold and restored compatibility/stock conflicts.

## Final production-preview checks

The corrected production build was opened in a fresh browser tab: 12 product cards loaded and console error/warning capture was empty. At 1280 px the document was 1265 px wide (the remainder is the scrollbar). Product details still loaded after direct-route refresh. Invalid product ID feedback was confirmed after loading completed. Vercel production deployment at https://happy-parcel.vercel.app was verified without login. The deployed product route refreshed correctly and a full demo order reached confirmation with an empty console error/warning capture.

## Outstanding submission checks

Public GitHub access is not connected. The project has genuine local incremental commits, but a public repository was not present at the beginning. Do not describe that requirement as complete. Public Vercel access, direct-route refresh, the final journey and the current console have now been checked. Student report includes these limits.


## Product photo update

All 12 catalogue products use locally served, generated photorealistic WebP images with useful alt text. The set is approximately 159 KB in total. Shelf images, the mug detail photo and the cart thumbnail loaded correctly. At 390 px the two-column photo grid had no page-wide horizontal overflow. A missing-photo check temporarily renamed only the built mug image: ProductPhoto rendered its accessible SVG fallback. The built asset was restored immediately after this test. The hero and interactive packing preview intentionally retain illustrations.


## 20 November redesign verification

- Node business-rule runner: 6 passed, 0 failed.
- Vite production build: passed (54 modules). Dependency use-client directives are ignored by bundling; they are build notices, not observed browser errors.
- Source checked for photographic hero/packing preview, readable mobile sizing, filter-preserving product return links and unavailable-city summary wording.
- Fresh browser, keyboard, 390/1280 px layout, console and deployed nested-route checks: not verified in this revision. The browser automation runtime could not start. Historical results above must not be presented as a new visual audit.
