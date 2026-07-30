/**
 * Post-build prerender for project routes.
 *
 * The app is a client-rendered SPA, so every route is served the same index.html.
 * Crawlers that execute JS (Googlebot) pick up the per-route tags set by
 * usePageMeta, but social preview bots (LinkedIn, Facebook, X, Slack, Discord,
 * WhatsApp) never run JS, so they would all show the home page's title.
 *
 * This writes a real dist/projects/<slug>/index.html per project with the title,
 * description, canonical and og/twitter text baked into the static HTML. Vercel
 * checks the filesystem before applying rewrites, so those files are served
 * directly; React then hydrates as normal.
 *
 * og:image and twitter:image are deliberately NOT touched, so every shared link keeps
 * the site-wide preview image from index.html.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(root, "dist");
const DATA = resolve(root, "src/components/projects/project.data.ts");
const TEMPLATE = resolve(DIST, "index.html");

const fail = (msg) => {
  console.error(`\n[prerender] ${msg}\n`);
  process.exit(1);
};

const escapeAttr = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ---------------------------------------------------------------- read projects

const source = readFileSync(DATA, "utf8");

// Fields appear in this order inside each entry: slug, title, ..., description.
const entryRe =
  /slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?description:\s*"((?:[^"\\]|\\.)*)"/g;

const projects = [...source.matchAll(entryRe)].map(([, slug, title, description]) => ({
  slug,
  title,
  description,
}));

// The regex is the fragile part of this script, so verify it against an
// independent count of the slug fields rather than trusting it.
const slugCount = (source.match(/^ {4}slug:\s*"/gm) ?? []).length;
if (projects.length !== slugCount) {
  fail(
    `parsed ${projects.length} projects but found ${slugCount} slug fields: ` +
      `project.data.ts shape changed, update the parser in scripts/prerender.mjs`
  );
}
if (!projects.length) fail("no projects parsed from project.data.ts");
if (new Set(projects.map((p) => p.slug)).size !== projects.length)
  fail("duplicate slugs in project.data.ts");
for (const p of projects) {
  if (!p.slug || !p.title || !p.description)
    fail(`incomplete project entry: ${JSON.stringify(p)}`);
}

// ------------------------------------------------- verify vercel.json rewrites

// An extensionless path like /projects/gymgear only reaches the prerendered file if
// something maps it there. Relying on the host's directory-index resolution is not
// portable (vite preview, for one, serves the SPA fallback instead), so vercel.json
// carries an explicit rewrite per project. Assert they exist, or a new project would
// silently fall through to the catch-all and serve the home page's metadata.
const vercelConfigPath = resolve(root, "vercel.json");
let vercelConfig;
try {
  vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));
} catch (err) {
  fail(`could not read vercel.json: ${err.message}`);
}
const rewrites = vercelConfig.rewrites ?? [];
const missingRewrites = projects.filter(
  (p) =>
    !rewrites.some(
      (r) =>
        r.source === `/projects/${p.slug}` &&
        r.destination === `/projects/${p.slug}/index.html`
    )
);
if (missingRewrites.length) {
  fail(
    `vercel.json is missing rewrites for: ${missingRewrites.map((p) => p.slug).join(", ")}\n` +
      `Add, before the catch-all rule:\n` +
      missingRewrites
        .map(
          (p) =>
            `    { "source": "/projects/${p.slug}", "destination": "/projects/${p.slug}/index.html" },`
        )
        .join("\n")
  );
}

// ---------------------------------------------------------------- read template

let template;
try {
  template = readFileSync(TEMPLATE, "utf8");
} catch {
  fail(`${TEMPLATE} not found: run this after \`vite build\``);
}

// Derive the site origin from the template's canonical so the URL isn't hardcoded
// in yet another place.
const canonicalMatch = template.match(/<link rel="canonical" href="([^"]+)"/);
if (!canonicalMatch) fail("no <link rel=\"canonical\"> in dist/index.html");
const ORIGIN = new URL(canonicalMatch[1]).origin;

// ---------------------------------------------------------------- emit pages

/** Replace one attribute value, asserting the target actually existed. */
const replaceOnce = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) fail(`could not find ${label} in dist/index.html`);
  return html.replace(pattern, replacement);
};

for (const project of projects) {
  // Must match the title built by usePageMeta in ProjectPage, or the tab title
  // visibly changes when React hydrates over the prerendered page.
  const title = `${project.title} | Levan Mosiashvili`;
  const url = `${ORIGIN}/projects/${project.slug}`;
  const t = escapeAttr(title);
  const d = escapeAttr(project.description);

  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, "<title>");
  html = replaceOnce(
    html,
    /(<meta name="description" content=")[^"]*"/,
    `$1${d}"`,
    'meta[name="description"]'
  );
  html = replaceOnce(
    html,
    /(<link rel="canonical" href=")[^"]*"/,
    `$1${url}"`,
    "canonical"
  );
  html = replaceOnce(
    html,
    /(<meta property="og:title" content=")[^"]*"/,
    `$1${t}"`,
    "og:title"
  );
  html = replaceOnce(
    html,
    /(<meta property="og:description" content=")[^"]*"/,
    `$1${d}"`,
    "og:description"
  );
  html = replaceOnce(
    html,
    /(<meta property="og:url" content=")[^"]*"/,
    `$1${url}"`,
    "og:url"
  );
  html = replaceOnce(
    html,
    /(<meta name="twitter:title" content=")[^"]*"/,
    `$1${t}"`,
    "twitter:title"
  );
  html = replaceOnce(
    html,
    /(<meta name="twitter:description" content=")[^"]*"/,
    `$1${d}"`,
    "twitter:description"
  );

  const outDir = resolve(DIST, "projects", project.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), html, "utf8");
  console.log(`[prerender] projects/${project.slug}/index.html  ${title}`);
}

console.log(`[prerender] ${projects.length} project pages written`);
