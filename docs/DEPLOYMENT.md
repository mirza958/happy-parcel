# Deployment handoff

The website is prepared as a Vite static React application. The hosting service must return `index.html` for unknown non-asset routes so BrowserRouter links such as `/gifts/sunny-mug` can refresh directly. Netlify uses the included `_redirects` file; Vercel can use `vercel.json`.

Hosted preview: https://happy-parcel-studio.tunedcocoa514.chatgpt.site

Deployment succeeded. The hosted page displays a ChatGPT sign-in gate; authenticated hosted journey verification is incomplete. A public GitHub repository still needs to be connected and pushed with the existing local history. This preview is owner-private, not an unrestricted public submission URL. The exact source commit is recorded in the final handoff.

To push the preserved history after creating an empty GitHub repository:

```sh
git branch -M main
git remote add origin YOUR_EMPTY_GITHUB_REPOSITORY_URL
git push -u origin main
```

Use your own GitHub account. Never place a password/token in source code, README or a ZIP. Do not initialise the remote with a separate README before pushing this history.
