# Cumberland Valley Science Olympiad — Website

A refined, multi-page static website for Cumberland Valley Science Olympiad, replacing the old Google Site. Pure HTML/CSS/JS — no build step, no dependencies. Host it anywhere (GitHub Pages, Netlify, school server, etc.).

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home + "What is Science Olympiad" overview |
| `cvhs.html` | Cumberland Valley High School team + location/map |
| `middle-schools.html` | Combined Eagle View & Mountain View middle school teams |
| `competitions.html` | Competition participation & results (recent seasons) |
| `eagle-invitational.html` | The Eagle Invitational (results link, teams by year, location, concessions) |
| `board.html` | Booster board positions & coaches |
| `alumni.html` | Alumni network + mailing list signup |
| `boosters.html` | Boosters & Sponsors: booster mission, sponsorship levels, ways to give, sponsor list, contact |

## Structure
- `css/style.css` — all styling (CV maroon + gold theme)
- `js/main.js` — mobile nav toggle + active-link highlighting
- `assets/` — put logos, sponsor logos, and photos here
- `documents/` — put PDFs (minutes, bylaws, forms) here

## How to view locally
Just open `index.html` in a browser, or run a tiny server:
```
cd cv-science-olympiad
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What to fill in
Search the files for the word **TBA**, the class **`placeholder`**, and **"To do"** badges. Those mark spots to replace with real info:
- **Board & coaches** (`board.html`) — names, bios, headshots
- **Results** (`competitions.html`, `eagle-invitational.html`) — placements, medals, results links
- **Eagle Invitational** — results URL, participating teams per year, address, Google Map embed, concession menu
- **Sponsors** (`sponsors.html`) — real sponsor logos/names and donation link
- **Boosters** (`boosters.html`) — meeting dates, upload PDFs to `documents/`
- **Alumni** (`alumni.html`) — paste your Google Form embed, add alumni spotlights

## Editing tips
- The header nav and footer are repeated in each `.html` file. If you add/rename a page, update the `<ul class="nav-links">` block and footer lists in every page (10 files).
- Colors live in the `:root` block at the top of `css/style.css`.
- To add a headshot/logo, replace the `.avatar`/`.ico` `<div>` with `<img src="assets/yourfile.jpg" ... />`.

## Deploy to GitHub Pages (optional)
1. Create a repo and push these files.
2. Settings → Pages → deploy from `main` branch, root folder.
3. Your site goes live at `https://<user>.github.io/<repo>/`.
