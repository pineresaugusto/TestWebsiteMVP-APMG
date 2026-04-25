# Photo assets

Six image files power the site. Save each photo with the exact filename
below so the existing `<Image>` references in the app resolve correctly.

| Filename                    | Where it lives                                                          | What it shows                                           | Suggested crop / ratio            |
|-----------------------------|-------------------------------------------------------------------------|---------------------------------------------------------|-----------------------------------|
| `home-assessment.jpg`       | Home → "Everything handled from home" (3-photo band, left)              | Man reading on his phone in bed                         | 3:2 landscape                     |
| `home-consultation.jpg`     | Home → "Everything handled from home" (3-photo band, middle)            | Woman on a video call with a provider                   | 3:2 landscape                     |
| `home-delivery.jpg`         | Home → "Everything handled from home" (3-photo band, right)             | Discreet package placed at a front door                 | 3:2 landscape                     |
| `glp1-pens.jpg`             | `/how-it-works` → "Understanding GLP-1 medications"                     | **Injection pens only** — crop out the tablet bottle    | 16:9 landscape                    |
| `about-outdoor.jpg`         | `/about` → "Our mission"                                                | Woman walking outdoors on a sunny path                  | 4:5 vertical                      |
| `pricing-couple.jpg`        | `/pricing` → pre-CTA aspirational band                                  | Couple running outdoors at sunset                       | 16:9 or 21:9 landscape            |

## Notes on the GLP-1 shot

The version you shared shows both a tablet bottle and two injection pens.
Before saving, **crop to keep only the injection pens** — Nuvela's copy
only discusses injectable compounded semaglutide, and including the
tablet bottle would imply we also offer oral semaglutide (we do not).
macOS Preview can do the crop: ⌘A to select, drag the corners, then
⌘K to crop.

## File format

`.jpg` is assumed by the `<Image>` paths. If you'd rather use `.webp` or
`.png`, update the extensions in the four page files:
`src/app/page.tsx`, `src/app/how-it-works/page.tsx`,
`src/app/about/page.tsx`, `src/app/pricing/page.tsx`.

Next.js' `<Image>` component will compress and serve the right format
automatically at request time — source format isn't critical.
