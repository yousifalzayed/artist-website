# Yousif Alzayed — Artist Website

A modular Eleventy portfolio, built from a folder for each artwork. Prepared on `portfolio-structure`; the existing Wix site and GoDaddy DNS have not been changed.

## Add an artwork using GitHub

1. Open `src/projects/` on your working branch.
2. Create a folder named with a short lowercase slug, such as `seasons-of-care`.
3. Copy `templates/project.md` into that folder as `index.md`.
4. Upload your web-sized JPG/PNG/WebP images into its `images/` subfolder.
5. Edit the title, year, cover filename, image descriptions, and project text. The paths and capitalization must match your uploaded files.
6. Add each image to `gallery` in the order you want it displayed. `caption` is optional. Lower `order` values appear first on the homepage.
7. Commit, review the build, and merge into `main` to publish once Pages is enabled.

The homepage and project page are generated automatically. You never edit the homepage to add an artwork. Empty image folders are not stored by Git; upload at least one image.

Set `draft: true` to omit a project page and its homepage card. This is NOT privacy protection: the repository is public and image files are still copied. Never commit private material or credentials.

## Preview locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. `npm run build` generates `_site/`, which is ignored by Git.

## Files

- `src/projects/<slug>/index.md`: artwork text and metadata. Existing migrated files use JSON-formatted YAML front matter; the template uses ordinary YAML. Both work.
- `src/projects/<slug>/images/`: local artwork images, independent of Wix hosting.
- `src/_includes/`: shared page and project layouts.
- `src/_data/site.json`: name, description, Instagram link.
- `src/assets/style.css`: responsive design.
- `src/contact.md`: biography and contact link.
- `.github/workflows/pages.yml`: builds branches/PRs; deploys only main.

## Enable GitHub Pages when ready

1. Review and merge the portfolio branch.
2. In the repository's Settings → Pages, select **GitHub Actions** as the source.
3. Run the workflow from Actions (or push another change to main).
4. Verify the site at `https://yousifalzayed.github.io/artist-website/`.

The initial workflow uses `/artist-website/` as its URL prefix. To use your custom domain later, set the repository Actions variable `PATH_PREFIX` to `/`, configure the domain in Settings → Pages, and rebuild. Keep registration with GoDaddy; change DNS only when the replacement is approved and working. Verify the domain with GitHub and enable HTTPS. Custom Actions deployments do not require a CNAME file.

## Authentication

The portfolio itself is static and public: no sign-in, database, passwords, or visitor tokens. GitHub controls repository editing. Actions checks out with its built-in token and disables persisted Git credentials. Build permissions are `contents: read`; only the main-branch deployment job receives `pages: write` and `id-token: write` for Pages/OIDC. There is no personal access token or GoDaddy credential in this project. Never put secrets in Markdown, browser JavaScript, or committed files.

## Migration notes / review before launch

- Eight projects and their available still images were imported from the current portfolio. Image files are resized web copies (up to 1400px), not archival originals.
- The Elastic Arts performance is linked to Vimeo. Any other embedded video, animation, or audio needs a separate media review; the import preserves still images only.
- Text comes from the public project pages, with minimal title/location normalization. Verify spelling and credits before launch. `docs/migration-sources.json` records source URLs and image origins.
- Image alt text is provisional and should be replaced with specific visual descriptions and any photographer credits.
- The biography uses only the general artist description; the old time-sensitive employment statement is omitted for review.
- Contact currently links to Instagram. Add a public email or a form provider when ready; no nonfunctional form is shown.
- Existing Wix project URLs will change. Add redirect pages for old URLs before switching the domain if preserving incoming links is required.
- Artwork and text remain the property of their respective rights holders. No license is granted by this repository.
