# Ambigram Generator

A multi-page symmetry/ambigram tool site — mirror, rotational, tattoo, logo, and 9 more generators sharing one design system.

## Structure
- `index.html` — homepage
- `*-generator.html` / other tool pages — 13 individual generator pages
- `assets/style.css` — shared styles
- `assets/script.js` — shared demo + nav logic

## Local preview
Just open `index.html` in a browser. No build step, no dependencies.

## Deploy with GitHub Pages
1. Push this repo to GitHub (main branch)
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)`
3. Site goes live at `https://<username>.github.io/ambigram/`
4. For a custom domain: Settings → Pages → add your domain under "Custom domain" — this creates a `CNAME` file automatically. Point your domain's DNS `A` records to GitHub Pages' IPs (185.199.108.153, .109.153, .110.153, .111.153) or a `CNAME` record to `<username>.github.io` for a subdomain.
