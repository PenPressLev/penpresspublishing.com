# Pen & Press Publishing: public website

The public site for penpresspublishing.com. One page (`index.html`) and its `assets/` folder. Hosted on GitHub Pages.

## How it publishes
The workflow in `.github/workflows/deploy.yml` publishes the site whenever a change is committed to `main`, or on demand from the repository's **Actions** tab (Publish site, Run workflow).

Repository settings: **Settings, Pages, Source: GitHub Actions**, custom domain `penpresspublishing.com`, **Enforce HTTPS** ticked.

## Lightning Scripture on the rail
`assets/strikes.json` holds a 31-day cycle of four strikes a day (midnight, sunrise, noon, sunset), King James Version. The page picks the day from the Eastern date and the watch from the computed sunrise and sunset for Washington, Michigan. An entry may carry an optional `piece` (the written layer shown beneath the verse); `registers` names the register shown beside a watch when a piece is present.

## The Vanguard
The page points to the Substack and does not list post titles: Substack refuses automated requests from GitHub's servers, so a title feed cannot be kept current here.

## Letters from the House (email list)
In `index.html`, set `LETTERS_ENDPOINT` to the list provider's subscribe address. Until it is set, the form points readers to the house email.

## Order buttons
"Order Direct" links to the Contact section until the store address is supplied. "On Amazon" buttons carry the product links supplied by the Founder; *A Light Has Come* opens an Amazon search for the title until its product link is supplied.

## Maintenance law
Every change to the site ships through this repository.

## Ownership
Site design, code and imagery © 2026 Pen & Press Holdings LLC. Pen & Press Publishing is a DBA of Pen & Press Holdings LLC.
