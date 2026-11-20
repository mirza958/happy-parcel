# Deployment handoff

The website is prepared as a Vite static React application. The hosting service must return `index.html` for unknown non-asset routes so BrowserRouter links such as `/gifts/sunny-mug` can refresh directly. Netlify uses the included `_redirects` file; Vercel can use `vercel.json`.

Public Vercel website: https://happy-parcel.vercel.app

Vercel production deployment succeeded under the owner's existing account. The production domain opens in a browser without Vercel login. Twelve gifts loaded, a direct product-page refresh worked, and a complete simulated checkout reached confirmation with no console warnings/errors. Vercel uses the explicit Vite build and SPA rewrite in vercel.json. A public GitHub repository still needs to be connected and pushed with the existing local history. The exact source commit is recorded in the final handoff.

To push the preserved history after creating an empty GitHub repository:

```sh
git branch -M main
git remote add origin YOUR_EMPTY_GITHUB_REPOSITORY_URL
git push -u origin main
```

Use your own GitHub account. Never place a password/token in source code, README or a ZIP. Do not initialise the remote with a separate README before pushing this history.


## 20 November 2026 redesign

Production deployment reported READY and aliased to https://happy-parcel.vercel.app. An unauthenticated HTTP request returned 200. This verifies reachability, not a fresh visual, keyboard or nested-route browser test.
