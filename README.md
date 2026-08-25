# Ming.exe

A maximalist cybercore / glitchcore / cutecore character archive.

## Run locally

Use an HTTP server so the browser can load `data/ming.json`.

### Python

```bash
cd ming-exe
python -m http.server 8000
```

Then open `http://localhost:8000`.

### PHP

```bash
cd ming-exe
php -S localhost:8000
```

## Edit the content

Most current content lives in `data/ming.json`.

You can change:
- profile information
- likes and dislikes
- combat ratings
- lore entries
- quote pool
- gallery image paths
- theme colors

A future admin panel can save those changes through PHP + MySQL.

## Project structure

- `index.html` — main interface
- `css/main.css` — visual system and animations
- `js/main.js` — rendering, navigation, glitches, particles
- `data/ming.json` — editable content source
- `php/api.php` — JSON API starter
- `php/database.php` — PDO starter
- `database/ming.sql` — MySQL schema starter
