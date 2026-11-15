# Verification record

15 November 2026. Browser: Chromium-based ChatGPT browser. Production browser and unrestricted public access checks are recorded separately in DEPLOYMENT.md. Initial preview exposed a JSX configuration error; automatic JSX transformation was configured and the server restarted before the tests below. Historical console entries from that failed initial preview are not evidence of errors in the corrected build.

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

## Outstanding submission checks

Public GitHub access is not connected. The project has genuine local incremental commits, but a public repository was not present at the beginning. Do not describe that requirement as complete. Check final hosted direct-route refresh and current console separately. Student report includes these limits.
