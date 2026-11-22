# Why I built it this way

I looked at the [BOXFOX gift builder](https://boxfox.com/pages/build-a-boxfox?step=1&build_box=1) on 15 November 2026. These are the three things I noticed in the flow I tried.

## I show the packaging price with the size

I could see the BOXFOX packaging choices before I could see what my selected box cost. I considered putting packaging prices in the final summary, but that would make someone go back if they picked a size outside their budget. In Happy Parcel the capacity and price are right on each size button. That makes the options take up a little more space on a phone. The options live in `src/pages/Box.jsx` and the total is in `src/components/Summary.jsx`.

## I give an empty search somewhere to go

Searching for `zzznogift123` in the reference left me with an empty shelf. I kept the search term visible and added **Show all gifts** so the customer decides when to clear it. I also wrote a separate message for a catalogue that fails to load or has no items. It takes a few extra states, but each message gives the customer the right action. The states are in `src/pages/Browse.jsx`.

## I made the packaging choices work with the keyboard

I couldn't reach the reference packaging choices by tabbing through that part of the page. I could have added keyboard handlers to custom cards, but regular buttons already respond to Enter and Space. I styled the buttons to show focus and used `aria-pressed` for the selected option. Each option adds a tab stop, which keeps the choices individually reachable. The buttons are in `src/pages/Box.jsx`.

The screenshots in `docs/screenshots` show the reference I reviewed and an earlier version of my app.
