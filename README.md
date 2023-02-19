# Syntax Podcast: _The Missing Browser_

![Syntax podcast: the missing browser](https://syntax.bald.design/og-image-syntax.jpg)

Hosted by two developers [Scott Tolinski](https://levelup.video) and [Wes Bos](https://wesbos.com), **[Syntax](https://syntax.fm)** is one of the most enjoyable tech podcasts available.

While their official website of [Syntax.fm](https://syntax.fm) offers a nice listening experience, it can be tricky to search by keyword or filter by category.

Using their `/api/` route in their Next.js app, I created a wrapper around Syntax Podcast content data.

---

### Features

- Grouped by release year (_i.e. 2017 to 2023 and counting_)
- Tagged by episode category (_e.g. Potluck, Hasty Treat, etc_)
- Searchable by title (powered by [Fuse.js](https://fusejs.io/))

### Built with

- [Next.js](https://nextjs.org/) w/ TypeScript
- SCSS Module (initially coded with Styled Components, but ditched it soon after)
- `localStorage` to avoid unnecessary data fetching

### TODO

- [x] ~~Build dark/light mode themes~~
- [x] ~~Extend to Sick Pick browser~~
- [x] ~~Refine visual design and layout~~
- [ ] Add a preloading screen
- [ ] Improve performance

---

## Running the app

Start the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- Subscribe to [Syntax](https://syntax.fm) podcast.
- All content belong to Scott and Wes. No copyright infringement intended! I just wanted convenience.
- No API is provided here. Go check out `https://syntax.fm/api/shows` and `https://syntax.fm/api/sickpicks` routes for original APIs.
