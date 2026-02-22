# The Peasant's Palette - Food Blog

## Project Overview
A single-page, infinite-scrolling food blog. Each post has 1-2 photos, a written review, and a small Google Maps embed showing the restaurant location. Hosted on GitHub Pages.

## Architecture
- **No build step, no framework** — plain HTML + CSS + JS
- `index.html` — the single page
- `posts.js` — array of post objects (this is what gets edited to add new content)
- `images/` — photo assets
- JS renders posts with lazy loading for infinite scroll feel
- Google Maps embeds use place name queries (no API key needed)

## Adding a New Post
Edit `posts.js` and add an entry to the top of the array:
```js
{
  title: "Restaurant Name",
  date: "YYYY-MM-DD",
  photos: ["images/filename1.jpg", "images/filename2.jpg"],
  review: "Your review text here...",
  mapQuery: "Restaurant Name, City"
}
```
Then drop the photos into `images/` and commit + push.

## Design / Aesthetic
- **Web 1.0 aesthetic — played straight, not ironic**
- Think "first food blog ever published" circa late 90s/early 2000s
- Tiled wallpaper/texture background
- Old-school fonts (Times New Roman, Georgia, Comic Sans where appropriate)
- Table-based or table-looking layouts
- Beveled edges, subtle drop shadows, thin HR dividers
- "Welcome to my page" energy
- Hit counter vibes
- No novelty cursors or joke elements — sincerely retro, not parody
- Still needs to be readable and functional

## Other Goals
- Easy for non-technical users to update (just edit posts.js + add images)
- Mobile-friendly (as much as web 1.0 can be)
- No dependencies or build tools
