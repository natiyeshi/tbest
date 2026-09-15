# TBeST Law LLP

The firm's website, plus the dashboard at `/admin` the firm uses to keep it up
to date.

## Running it

```bash
npm install
cp .env.example .env.local   # then fill it in — see below
npm run dev
```

## Environment

`.env.local` is not committed. It needs:

| Variable                 | What it is                                                        |
| ------------------------ | ----------------------------------------------------------------- |
| `MONGODB_URI`            | The MongoDB server. Shared with the firm's other sites.            |
| `MONGODB_DB`             | The database. `tbest` — its own, not shared.                       |
| `BETTER_AUTH_SECRET`     | Signs admin sessions. Unique to this site; never reuse another's.  |
| `BETTER_AUTH_URL`        | The canonical origin. Sign-in is rejected from any other in prod.  |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Read once, by `seed:admin`.                    |
| `NEXT_PUBLIC_CLOUD_NAME` | Cloudinary cloud for images uploaded through the dashboard.        |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

## First-time setup

```bash
npm run seed:admin     # creates the one admin account from ADMIN_EMAIL/ADMIN_PASSWORD
npm run seed:content   # copies the bundled updates and practice areas into MongoDB
```

Then delete `ADMIN_PASSWORD` from `.env.local` — the password is in the
database now, and is changed from the dashboard's **Security** page.

Both scripts are safe to re-run. `seed:content` matches on slug and leaves
anything that already exists exactly as the dashboard last saved it; pass
`--force` to overwrite.

## The dashboard

`/admin`, behind a single account. There is no public sign-up: `seed:admin` is
the only way an account is created.

| Section            | What it manages                                                |
| ------------------ | -------------------------------------------------------------- |
| **Updates**        | Legal updates, blog posts and firm news — the three streams under `/updates`. Each has a stream, a topic, a date, authors, an optional cover image and a published flag. |
| **Practice areas** | The practices under `/practices`, including their order.        |
| **Enquiries**      | Everything sent through the contact form, read/unread.          |
| **Security**       | Change the admin password.                                      |

### How content reaches the site

Public pages read MongoDB through `src/lib/public-content.ts` and fall back to
the copy bundled in `src/lib/insights.ts` and `src/lib/practices.ts` whenever
the database is empty or unreachable — so `next build` works without a database,
and the site keeps serving the last shipped copy if the database goes away.

Pages are cached and revalidated every five minutes; saving in the dashboard
also revalidates the affected paths immediately, so an edit is live at once.

### Article bodies

The body field is one block per line:

```
## A heading
A paragraph.
- A list item
> A pull quote
```

That is the same dialect the articles migrated from the old site use, so a piece
written in the dashboard and one carried over render through the same path.

## Images

Three dials decide how a photograph looks: **how many pixels** it is served at,
**how hard those pixels are compressed**, and **how many of those pixels the
browser throws away again** on the way into the frame. The original files were
wrong on the first two — 1200x1800 at roughly 0.15 bits per pixel, then
re-encoded at quality 75 on the way out. The third is subtler and is what made
the boardroom photograph on the landing page look soft long after the other
two were fixed.

The settings now:

- **Sources are the untouched camera files** — `public/new/*/original/` and
  `public/new/team/original/`, copied in byte for byte (2336x3504, ~1.5 MB
  each). Downscaling is only as good as what it starts from.
- **`next/image` resizes per device.** A card 384 px wide is sent ~828 px, not
  the full 2336 px. Nobody can see more than their screen holds.
- **`qualities: [90]`, and 90 is the only allowed value.** Next clamps an
  unmatched `quality` to the nearest entry, so a component that passes nothing
  gets 90 rather than the framework default of 75 — which is what every card,
  insight and practice thumbnail was quietly being served at. One line, instead
  of a `quality` prop on thirteen components.

### Why 90, measured

On a camera original, compared at the size a card is actually displayed
(768 device px), against the same image downscaled with no compression at all:

| Quality | File | SSIM | PSNR |
| ------: | ---: | ---: | ---: |
| 75  |  17 KB | 0.9856 | 41.4 dB |
| 88  |  34 KB | 0.9900 | 43.6 dB |
| **90** | **40 KB** | **0.9908** | **44.1 dB** |
| 95  |  73 KB | 0.9927 | 45.3 dB |
| 100 | 115 KB | 0.9938 | 45.8 dB |

90 sits on the knee. Going to 100 costs three times the bytes for 1.7 dB;
dropping to 75 is where artefacts start showing in skin and fabric. Rendered
end to end and diffed against the untouched-original build, the same card comes
out at SSIM 0.991, mean channel difference 1.05/255 — not visible.

### The third dial: oversampling

`next/image` builds its `srcset` from `deviceSizes` + `imageSizes` — rungs at
16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840.
The browser picks the smallest rung at or above `width x devicePixelRatio`, so
an honest `sizes` gets you a file served at roughly 1:1. That is normally
exactly right.

It stops being right when the scene is dense. The boardroom shot in the
**Firm** section is 36rem wide with ten faces in it and the firm's logo on a
screen behind them. At 1:1 on an ordinary non-retina desktop that is a 640px
file, and quality 90 turns each face to mush. More quality cannot fix it —
the loss is in the pixel count, not the encoder:

| Served | Quality | File | SSIM vs source |
| -----: | ------: | ---: | -------------: |
| 640px  | 90  | 28 KB | 0.9584 |
| 640px  | 95  | 47 KB | 0.9604 |
| 640px  | 100 | 64 KB | 0.9612 |
| **1080px** | **90** | **64 KB** | **0.9952** |

Same 64 KB, 11 dB apart. The extra pixels get averaged down into the frame and
the averaging takes the compression noise with it.

So that one section deliberately over-declares its `sizes` — 60rem for a 36rem
frame, 24rem for a 16rem inset — to land on a higher rung. It is the only place
that does, and both are commented as such. Everything else is served near 1:1
on purpose; if another photograph ever looks soft, check its oversampling ratio
before reaching for the quality dial.

### Why not lossless

Lossless re-compression of a photograph comes out *larger* than the JPEG it
came from; there is nothing left to squeeze. Measured on a 1.98 MB original:

| Encoding | Size | Pixels identical to source |
| -------- | ---- | -------------------------- |
| The camera original | 1.98 MB | — it is the source |
| WebP, lossless | 3.51 MB (177%) | yes |
| PNG, lossless  | 5.17 MB (262%) | yes |
| JPEG at q100   | 3.15 MB (159%) | **no** |

So there is no "smaller and bit-exact" option. The originals are kept as the
build sources, and the only lossy step in the chain is the single per-device
encode at 90.

### Where the weight actually is

Production build, each page scrolled to the bottom:

| Page | Images | Page total |
| ---- | -----: | ---------: |
| `/team` | 0.84 MB | ~2.8 MB |
| `/practices` | 0.4 MB | ~2.3 MB |
| `/` | 0.78 MB | **33.4 MB of hero video** |

Images are no longer the problem anywhere. The landing page is dominated by
`public/new/team/hero2.webm` at **33.4 MB** — about 40x the weight of every
image on the page combined. `hero-web.webm` (2.9 MB) and `hero-web.mp4`
(4.1 MB) are already in the repo as web-weight cuts of the earlier edit;
`hero2.webm` is a newer cut that has never been encoded for the web.

To serve `<Image>` unoptimised again (camera bytes to the browser, ~39 MB on
`/team`), set `images.unoptimized: true` in `next.config.ts`.

## SEO and share cards

Every public page carries a title, a description, a canonical URL, Open Graph
and a Twitter card. They all go through one helper, `pageMetadata` in
`src/lib/seo.ts`, so a new page cannot quietly ship without a share image —
which is the failure that sends a link into Slack or LinkedIn as a grey
rectangle.

Also generated: `sitemap.xml` (built from the same sources the pages are, so
anything added in the dashboard appears in it) and `robots.txt`, which keeps
crawlers out of `/admin` and `/api`.

### Structured data

`src/components/json-ld.tsx` renders schema.org JSON-LD: `LegalService` for the
firm on the landing page, `Person` on each member's page, `Article` on each
insight, and a `BreadcrumbList` on both. This is what lets Google show the
firm's address and phone in a knowledge panel, and an author and date under an
article.

### The share cards

`public/og` holds one 1200x630 card per page — 58 of them, about 4 MB. They are
built, not drawn by hand:

```bash
npm run og:build
```

`scripts/og-manifest.mts` reads the real content modules and lists what to
draw; `scripts/build_og_images.py` composites each card from the firm's own
photography with Butler set over a wash of brand teal. Because the manifest
reads `src/lib/content.ts` and friends, a new team member or practice area
needs no second list — add them there and re-run.

Re-run it after adding content in the dashboard, too. Until you do, a page with
no card of its own falls back to its section's card rather than pointing a
crawler at a missing file (`src/lib/og-image.ts`).

Two build-time details worth knowing: Butler ships as woff2, which Pillow
cannot read, so the script converts it in memory with `fontTools` — that needs
`brotli` installed beside it (`pip install brotli`). And the content modules
import photographs, which mean nothing outside Next's build, so the manifest
runs behind a pair of small loaders that stub each image import out to the path
it came from.

### Video in a share card

Each member's page also emits `og:video` pointing at their clip. Be aware that
**no major network will actually play it**: Facebook and X accept only MP4/H.264
for `og:video`, LinkedIn ignores the tag entirely, and WhatsApp, Telegram and
Slack show the image alone. The clips are WebM, so the tag is there for the
handful of readers that honour it and the share card is what everyone will
really see.

Transcoding the clips to MP4 would change that, and needs ffmpeg, which is not
installed here — the same tool the 33 MB `hero2.webm` is waiting on.

## Layout of the app

```
src/app/(site)/    the public website — carries the header, footer and scroll animations
src/app/admin/     the dashboard — deliberately outside (site), so it has none of that chrome
src/app/api/       the auth handler and the contact endpoint
src/lib/           content, the public read layer, and admin/ for the data layer and actions
```

The `(site)` group does not appear in any URL.
