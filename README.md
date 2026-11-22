# Happy Parcel

**Irum Fatima | 24i2105 | Section A**
CS4032 Web Programming | Assignment 02

I made Happy Parcel for someone who wants to put together a personal gift without having to buy everything separately. I wanted the site to feel like a small gift shop, so I used a warm colour palette, a photo of an open gift box and a catalogue you can browse at your own pace.

- [Live website](https://happy-parcel.vercel.app/)
- [GitHub repository](https://github.com/mirza958/happy-parcel)

## Running my project

With Node.js 22.12 or newer installed, I run these commands from the extracted project folder:

```sh
npm ci
npm run dev
```

Vite prints the local address. I use `npm test` for the rule tests and `npm run build` for the production build.

## What I built

| Page | What it does |
|---|---|
| Collection | Search, filter and sort 12 gifts, with an optional budget filter |
| Gift details | Show the price, stock, packing space and care or ingredient details |
| Your box | Change quantities, size and wrap, add a note and see the total |
| Checkout | Validate the delivery form and explain which fields need fixing |
| Confirmation | Show a receipt for the simulated order |

I keep the box in React state so that the count, preview and total all use the same selections. I save the gift selections and preferences in local storage so a refresh doesn't undo the box. The catalogue uses local data and an asynchronous mock loader.

## The three rules I used

1. Small, Medium and Large hold 6, 10 and 14 space units. A box can be exactly full. Choosing a smaller size keeps the gifts visible and shows what needs fixing.
2. Scent-free packing conflicts with fragranced candles and soap. If one is already in the box, the customer can remove it or turn off the preference.
3. The delivery areas are Islamabad and Rawalpindi. Delivery costs Rs 250 below Rs 4,000 in gifts and is free from Rs 4,000. Packaging doesn't count towards that threshold.

## What I show in my demo

I add a gift, search for `zzznogift123`, then use **Show all gifts** to get back to the catalogue. The gift is still in my box. I also turn on scent-free packing after adding a candle to show how the box explains the conflict. The **Assignment demo controls** let me show a failed load, an empty catalogue and a stock change.

Checkout is a simulation. I use made-up details in the demo. Email and street address aren't stored. The packing units are an estimate of capacity. The report covers my reference research and the decisions I made from it.
