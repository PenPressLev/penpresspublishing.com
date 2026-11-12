# Pen & Press Publishing: public website

The public site for penpresspublishing.com. One page (`index.html`) and its `assets/` folder. Hosted on GitHub Pages.

## How it publishes
The workflow in `.github/workflows/deploy.yml` publishes the site:
- whenever a change is committed to `main`,
- once a day (about 6:30 AM Eastern), so "Latest from the Vanguard" follows the Substack,
- on demand, from the repository's **Actions** tab (Publish site, Run workflow).

One-time setup in the repository: **Settings, Pages, Build and deployment, Source: GitHub Actions**. Then under **Custom domain** enter `penpresspublishing.com` and, once the certificate is issued, tick **Enforce HTTPS**.

Note: GitHub pauses scheduled runs in a repository with no activity for 60 days. Any commit, or one click on "Enable workflow" in the Actions tab, restarts them.

## Latest from the Vanguard
`scripts/fetch-latest.mjs` rewrites the block between `LATEST:BEGIN` and `LATEST:END` from the Substack feed at publish time. If the feed cannot be read, the page keeps the titles it already has.

## Letters from the House (email list)
In `index.html`, set `LETTERS_ENDPOINT` to the list provider's subscribe address. Until it is set, the form points readers to the house email.

## Order buttons
"Order Direct" links to the Contact section until the store address is supplied.

## Maintenance law
Every change to the site ships through this repository.

## Ownership
Site design, code and imagery © 2026 Pen & Press Holdings LLC. Pen & Press Publishing is a DBA of Pen & Press Holdings LLC.
