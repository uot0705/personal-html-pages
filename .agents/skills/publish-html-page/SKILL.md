---
name: publish-html-page
description: Convert a root HTML file into slug/index.html, update pages.json, then commit and push.
---

# Publish HTML Page

Convert a root-level HTML file in this repository into a published GitHub Pages entry.

Follow this workflow exactly.

## Workflow

1. Find `.html` files directly under the repository root.
2. Exclude `index.html` from the candidate list.
3. Stop and explain the situation if there are no candidate HTML files.
4. If there is only one candidate HTML file, use it.
5. If there are multiple candidate HTML files, ask which file to convert before continuing.
6. Build the slug from the filename without the `.html` extension.
   - Keep existing letters, numbers, underscores, and case.
   - Replace spaces with `-`.
   - Examples:
     - `taiwan_2n3d_plan.html` -> `taiwan_2n3d_plan`
     - `AAA.html` -> `AAA`
7. Stop without changing anything if a directory with the same slug already exists.
8. Create `slug/index.html` from the source HTML.
9. Check whether the HTML already contains a link back to the top page.
10. If there is no top-page link, insert this immediately after `<body>`:

```html
<a href="../">← 一覧に戻る</a>
```

11. Delete the original root-level HTML file after the new `slug/index.html` is created.
12. Read metadata from the HTML.
   - Use the `<title>` text for `title` when present. Otherwise use the slug.
   - Use the `meta name="description"` content for `description` when present. Otherwise use an empty string.
13. Add this object to `pages.json`:

```json
{
  "title": "<title or slug>",
  "description": "<meta description or empty string>",
  "path": "./slug/",
  "createdAt": "YYYY-MM-DD"
}
```

14. Do not add a duplicate entry when `pages.json` already contains the same `path`.
15. Run `git status` after the file changes.
16. If the result looks correct, commit and push.
17. After push, display the expected GitHub Pages URL.

## Required Checks

If `taiwan_2n3d_plan.html` exists in the root, convert it with this workflow before finishing.

Before commit and push, confirm all of the following:

- `taiwan_2n3d_plan/index.html` exists.
- The root `taiwan_2n3d_plan.html` has been removed.
- `pages.json` contains `./taiwan_2n3d_plan/`.

When those checks pass, use these commands:

```bash
git add .
git commit -m "add page: taiwan_2n3d_plan"
git push
```

After push, display:

```txt
https://<GitHubユーザー名>.github.io/personal-html-pages/taiwan_2n3d_plan/
```
