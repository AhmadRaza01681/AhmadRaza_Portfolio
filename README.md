# Ahmad Raza – Portfolio

Plain HTML, CSS and JavaScript. No install and no build step.

## View it
Double-click `index.html`.

## Files
- `index.html` – page shell
- `styles.css` – design
- `app.js` – site, animated background and admin portal
- `data.js` – all content (edit directly or export from the admin panel)
- `photo.jpg` – your portrait
- `.nojekyll` – lets GitHub Pages serve the files as they are

## Admin portal
Open `index.html#admin` (or click "Admin login" in the footer).
Edits save in your browser only. To publish them: Admin → Backup and publish → Export data.js, replace `data.js` in this folder with the download, then commit and push.
The login is a front-end gate only, not real security.

## Before you push
Replace every `YOUR-USERNAME` in `data.js` with your GitHub username.

## Publish on GitHub Pages
```bash
git init && git add . && git commit -m "Add portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```
Then Settings → Pages → Deploy from branch → `main` / root.
