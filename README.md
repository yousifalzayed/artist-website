# Yousif Alzayed — Artist Website

A modular Eleventy portfolio, built from a folder for each artwork. Prepared on `portfolio-structure`; the existing Wix site and GoDaddy DNS have not been changed.

## Add an artwork using GitHub

1. Open `src/projects/` on your working branch.
2. Create a folder named with a short lowercase slug, such as `seasons-of-care`.
3. Copy `templates/project.md` into that folder as `index.md`.
4. Upload your web-sized JPG/PNG/WebP images into its `images/` subfolder.
5. Edit the title, year, cover filename, image descriptions, and project text. The paths and capitalization must match your uploaded files.
6. Add each image to `gallery` in the order you want it displayed. `caption` is optional. Lower `order` values appear first on the homepage.
7. Set `category: performance` for Performances, or `category: work` for Selected Works. Elastic Arts is classified as a performance. Each project keeps its existing URL.
8. Commit to `portfolio-structure` to update the live preview. Review and merge into `main` when ready.

The homepage and project page are generated automatically. You never edit either listing page to add an artwork or performance. Empty image folders are not stored by Git; upload at least one image.

Set `draft: true` to omit a project page and its homepage card. This is NOT privacy protection: the repository is public and image files are still copied. Never commit private material or credentials.

## Add a Vimeo or YouTube performance

In the project's front matter, set `category: performance` and add the ordinary video link:

```yaml
category: performance
video: https://vimeo.com/964602219
```

YouTube watch, youtu.be, Shorts, live, and embed links are also supported. The page displays a responsive player with controls, fullscreen support, and a link to the original video. Playback starts when the visitor presses Play. For unlisted Vimeo videos, include the complete link with its hash. The video's provider settings must permit embedding on your website.

## Edit existing projects in GitHub

Open `src/projects/<slug>/index.md` on `portfolio-structure`, click the pencil icon, edit the text below the front matter, and commit your changes. To change images, upload files into that project's `images/` folder, then update `cover` and `gallery` filenames in `index.md`. To change the video, replace `video` with a Vimeo or YouTube link.

Creating `src/projects/new-project/index.md` through GitHub's **Add file → Create new file** also creates its folder. Every committed change rebuilds the preview and updates the generated pages and listings; folders and image selections remain under your control. Adding an image file alone does not add it to the gallery: list it in `gallery`.

Performance projects can start with only text and a video link. If `cover` is omitted, their listing shows a text card until you add a cover image. You can omit `year` until the date is confirmed.

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
- `src/_data/site.json`: name, description, email, Instagram link.
- `src/assets/style.css`: responsive design.
- `src/about.njk`: biography and email; `src/contact.md` redirects old contact links to About.
- `src/performances.njk`: generated performance listing.
- `.github/workflows/pages.yml`: builds branches/PRs; deploys main and the authorized portfolio-structure preview branch.

## Enable GitHub Pages when ready

1. Review and merge the portfolio branch.
2. In the repository's Settings → Pages, select **GitHub Actions** as the source.
3. Run the workflow from Actions (or push another change to main).
4. Verify the site at `https://yousifalzayed.github.io/artist-website/`.

The initial workflow uses `/artist-website/` as its URL prefix. To use your custom domain later, set the repository Actions variable `PATH_PREFIX` to `/`, configure the domain in Settings → Pages, and rebuild. Keep registration with GoDaddy; change DNS only when the replacement is approved and working. Verify the domain with GitHub and enable HTTPS. Custom Actions deployments do not require a CNAME file.

## Authentication

The portfolio itself is static and public: no sign-in, database, passwords, or visitor tokens. GitHub controls repository editing. Actions checks out with its built-in token and disables persisted Git credentials. Build permissions are `contents: read`; only the deployment job on main or portfolio-structure receives `pages: write` and `id-token: write` for Pages/OIDC. There is no personal access token or GoDaddy credential in this project. Never put secrets in Markdown, browser JavaScript, or committed files.

## Migration notes / review before launch

- Eight projects and their available still images were imported from the current portfolio. Image files are resized web copies (up to 1400px), not archival originals.
- Elastic Arts includes an embedded Vimeo player. Add a video link to other projects as needed; the original import preserved still images only.
- Text comes from the public project pages, with minimal title/location normalization. Verify spelling and credits before launch. `docs/migration-sources.json` records source URLs and image origins.
- Image alt text is provisional and should be replaced with specific visual descriptions and any photographer credits.
- The biography uses only the general artist description; the old time-sensitive employment statement is omitted for review.
- About includes the public email yousifalzayed.art@gmail.com and Instagram.
- Existing Wix project URLs will change. Add redirect pages for old URLs before switching the domain if preserving incoming links is required.
- Artwork and text remain the property of their respective rights holders. No license is granted by this repository.
