# Landing V3 redesign — developer handoff

The approved design for the Linqo landing page, in Korean and English, as two static preview pages.
Treat them as a **visual and motion spec**: port them into the Next.js app (`src/app`, `src/components`, `src/content`) rather than shipping the HTML as is.

## Preview

| | Local (`pnpm dev`) | Hosted preview |
|---|---|---|
| ko | `/lab/hero-v3-kinetic.html` | https://claude.ai/artifact/4mdBL1JzbJeer7VQbedTgr |
| en | `/lab/hero-v3-kinetic-en.html` | https://claude.ai/artifact/2iRxSMRCrpu9Nh5cPNcpVu |

Hosted previews are private; ask the owner for access.

## Files

```
public/lab/
├─ hero-v3-kinetic.html      # ko: source of truth for layout, CSS and motion
├─ hero-v3-kinetic-en.html   # en: generated from ko, do not edit by hand
├─ fonts/PretendardVariable.woff2
├─ linqo-logo.png
├─ og-ko.png, og-en.png   # 1200×630 social preview images
├─ favicon.ico            # 16/32/48, the logo's Q on ink
├─ apple-touch-icon.png   # 180×180
└─ icon-512.png           # 512×512 source for manifests
scripts/lab-ko-to-en.py      # builds the en file from ko with a string table
```

Regenerate en after editing ko:

```sh
python3 scripts/lab-ko-to-en.py public/lab/hero-v3-kinetic.html public/lab/hero-v3-kinetic-en.html
```

It prints `MISS:` for any table entry that no longer matches and lists the Korean left in the output (the remaining Korean is intentional: Korean speakers' original lines, greetings, the language name 한국어).

Each page is one self-contained file: inline CSS, inline SVG icon sprite, one inline script. The only dependency is GSAP 3.12.5 + ScrollTrigger from cdnjs.

## Page structure

| # | Section (`id` / class) | Content | Motion |
|---|---|---|---|
| — | `.nav` | Logo, anchors, login, KO/EN switch, Google CTA | Sticky with blur. Below 420px the CTA label shortens (`.lf` / `.ls`) |
| 1 | `.hero` | Kinetic headline, subline, Google CTA | Greeting pill cycles languages every 1s, script tile flips, wrong→right name correction loops, headline rows drift on scroll |
| — | `.mq` | Greeting marquee | Endless GSAP scroll (40s loop) |
| 2 | `.wid` | One meeting, many languages: mock meeting screen + floating speech bubbles | Bubbles fly in on scroll, then the mock pins for ~1100px (`pin: true`) |
| 3 | `.ctx` (demo `#cx`) | Context demo: "without context" vs "with context" transcript/translation | Scrubbed: scan beam sweeps, misheard terms flip to correct ones, counter counts up |
| 4 | `.mcp` (window `#chat`) | AI connection: 3 prompt bubbles (ChatGPT / Claude / Grok) + chat window | Plays once on enter, auto-advances through 3 scenes (`timeScale(2.5)`), click a bubble to jump |
| 5 | `#cases` | Meeting card + Lecture/Conference card | Cards rise in; live feed and phone subtitles loop only while on screen (`onToggle`) |
| 6 | `#features` | 6 feature cards | Stagger in once |
| 7 | `#pricing` | Free / Pro / Premium / Max + event note | — |
| 8 | `#faq` | 8 Q&As, `<details name="faq">` exclusive accordion | Animated open via `::details-content` + `interpolate-size` |
| 9 | `.fin` | Final CTA with floating greeting chips | Chips float (CSS), content rises once |
| — | `.footer` | Links, copyright | — |

All motion respects `prefers-reduced-motion`: loops stop and every section renders in its final state.

## Design tokens (`:root`)

- Font: Pretendard Variable (already a dependency: `pretendard`)
- Brand: `--accent #6b7bff`; accents `--mint --sky --amber --coral --pink --violet --lime`
- Surfaces: `--ink #0b0c0f`, `--panel`, `--raised`; text `--white`, `--paper`, `--muted`
- Glass: `.glass/.card/.tier` = translucent gradient + `backdrop-filter: blur(18px)`, no visible border
- Grain: fixed SVG noise on `body::after` at opacity .07
- Buttons and chips are fully rounded (`999px`)

Copy rule: no periods or commas in marketing copy where avoidable.

## Porting notes

- **Copy → `src/content`.** Move every string into `ko.ts` and a new `en.ts` with the same shape; the en string table in `scripts/lab-ko-to-en.py` is the ready-made translation. Demo data inside the JS (`said`, `subs`, chat `scenes`) belongs there too.
- **Language routing.** The KO/EN switch currently links to the two preview files (and to the hosted previews off localhost). Replace with real locale routes (e.g. `/ko`, `/en`) and set `<html lang>` per locale.
- **Links.** Every CTA is `href="#"`. Google buttons, login and pricing buttons → `AUTH_URL`; footer Privacy/Terms need real URLs.
- **GSAP.** Use the installed `gsap` + `@gsap/react` (`useGSAP`) instead of the CDN, and scope/cleanup per component. Keep the reduced-motion branches.
- **Availability.** Claims the team has not confirmed should go through `published()` with `availability: "verify"` (see `src/content/availability.ts`) so they never reach production unconfirmed.
- **Metadata.** Each preview has title, description, Open Graph and Twitter tags pointing at absolute GitHub Pages URLs. In the app, use the Metadata API per locale (`openGraph.images` with `og-ko.png` / `og-en.png`, `metadataBase` set to the real domain). `src/app/favicon.ico` and `src/app/apple-icon.png` already use the new icon.
- **`public/lab` is publicly served.** Remove it (or block it) once the port is live.

## Needs team confirmation before launch

- Pricing tiers, prices and hours (Free 30 min · Pro $29/50h · Premium $100/180h · Max $200/360h), "unused add-ons roll over", event note (up to 4 audience languages at no extra cost)
- Supported context file types (only PDF is shown)
- Data handling: "video never stored, audio only for recognition", "external AI read-only and only when approved"
- Speaker identification ("Notes who said what")
- Whether the AI connection (ChatGPT / Claude / Grok) is available on the Free plan; section 4 copy names ChatGPT and Claude only while the demo also shows Grok
- Google Meet / Zoom web capture via browser tab audio
- All people, companies and numbers in the mockups are fictional demo data
