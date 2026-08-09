import lighthouseDesktop from "@/assets/projectImages/gymgear-lighthouse-desktop.webp";
import lighthouseMobile from "@/assets/projectImages/gymgear-lighthouse-mobile.webp";

export const gymgearReview = {
  lighthouseScores: [
    { label: "Desktop", image: lighthouseDesktop },
    { label: "Mobile", image: lighthouseMobile },
  ],

  overview:
    "GymGear is a full-stack e-commerce web application for gym equipment and apparel. It supports product browsing, filtering, cart management, order placement, user authentication, wishlists, product reviews, and a full profile management system. The UI is fully responsive across mobile, tablet, laptop (tested at 125% browser zoom, since most laptops ship with 125% display scaling active in system settings), and 1920×1080 desktop screens. Beyond the core commerce flow, the project has been through dedicated passes for performance (self-hosted/preloaded fonts, vendor chunk splitting, responsive image srcsets), accessibility (jsx-a11y linting, a Lighthouse-driven fix pass, WCAG-AA brand contrast), SEO (Open Graph/Twitter cards, per-route metadata, canonical URLs), security (RLS verification, PII lockdown, key rotation), and automated testing (Vitest + React Testing Library, wired into CI).",

  techStack: [
    { layer: "Framework", technology: "React 18" },
    { layer: "Language", technology: "TypeScript 5.6 (strict, project references)" },
    { layer: "Build Tool", technology: "Vite 6" },
    { layer: "Styling", technology: "Tailwind CSS 3" },
    { layer: "Backend / DB", technology: "Supabase (PostgreSQL, RLS on every table)" },
    { layer: "Auth", technology: "Supabase Auth" },
    { layer: "State (server)", technology: "TanStack React Query v5" },
    { layer: "State (client)", technology: "React Context API" },
    { layer: "Routing", technology: "React Router DOM v7" },
    { layer: "Forms", technology: "React Hook Form + Zod" },
    { layer: "Animations", technology: "Framer Motion" },
    { layer: "i18n", technology: "i18next + react-i18next (English/Georgian, 21 namespaces)" },
    { layer: "UI Components", technology: "shadcn/ui (Radix UI primitives)" },
    { layer: "Icons", technology: "Lucide React" },
    { layer: "Toast notifications", technology: "Sonner (lazy-loaded behind a notify wrapper)" },
    { layer: "Carousel", technology: "Embla Carousel" },
    { layer: "Virtualization", technology: "TanStack Virtual" },
    { layer: "Theme", technology: "next-themes" },
    { layer: "Class utilities", technology: "CVA, clsx, tailwind-merge" },
    { layer: "Testing", technology: "Vitest 3 + React Testing Library + jsdom, run in CI" },
    { layer: "Linting", technology: "ESLint + typescript-eslint + eslint-plugin-jsx-a11y" },
    { layer: "Formatting", technology: "Prettier" },
    { layer: "Git Hooks", technology: "Husky + lint-staged (staged-files-only pre-commit)" },
    { layer: "Fonts", technology: "Self-hosted @fontsource-variable (Noto Sans + Noto Sans Georgian), unicode-range subsetted" },
    { layer: "Image Optimization", technology: "vite-plugin-image-optimizer + sharp + svgo + custom resize/upload scripts" },
    { layer: "CI", technology: "GitHub Actions (ts-check → lint → test → build on every PR/push, plus a weekly keep-supabase-alive ping)" },
    { layer: "Dependency Automation", technology: "Dependabot (weekly, grouped npm minor/patch + GitHub Actions versions)" },
  ],

  pages: [
    {
      name: "Home",
      path: "/dashboard/main",
      features: [
        "HeroBanner: full-width hero with headline, CTA, entrance animation, and a preloaded/responsive hero image (mobile-width AVIF variant below the sm breakpoint)",
        "BrandStory: editorial section with brand narrative",
        "CategoriesSection: grid of product categories linking to the filtered shop",
        "CarouselMain: featured products carousel (Embla)",
        "FreshPicksCarousel: best-selling/worst-selling product carousel that renders a same-height loading shell instead of null while data is in flight, avoiding a layout-shifting white gap",
        "ReviewsSocialProof: top-rated reviews pulled from the DB sorted by like count",
        "Advert: promotional banner section",
        "Newsletter: email subscription section",
      ],
    },
    {
      name: "Shop",
      path: "/dashboard/products",
      features: [
        "Live text search filtering products via Supabase ilike",
        "Price range slider + multi-select category checkboxes",
        "Sort by price (asc/desc) or name (asc/desc)",
        "All filters compose into a single getFilteredProducts Supabase query with staleTime: 30s",
      ],
    },
    {
      name: "Product Detail",
      path: "/dashboard/productDetail/:id",
      features: [
        "Image gallery with thumbnail selector",
        "Star rating calculated from real review data",
        "Add-to-cart with quantity selector, wishlist toggle",
        "Related products carousel (filtered by same category)",
        "Reviews list sorted by like count, write review dialog (authenticated), like/unlike toggle with optimistic cache invalidation",
        "Document title set from the fetched product name once it loads, falling back to the site default while pending",
      ],
    },
    {
      name: "Cart",
      path: "/dashboard/cartPage",
      features: [
        "Item list with quantity controls, remove, and a clear-cart action",
        "Order summary panel with subtotal, delivery, and total",
        "Place Order: creates an order in Supabase and clears the cart (requires auth, prompts sign-in via toast otherwise)",
      ],
    },
    {
      name: "About",
      path: "/dashboard/about",
      features: [
        "WhoWeAre, OurStandards, Metrics, and GuaranteeCTA sections",
        "Each section independently animated with Framer Motion stagger containers",
      ],
    },
    {
      name: "Profile",
      path: "/dashboard/profilePage",
      features: [
        "Account: edit name, username, phone, address via React Hook Form + Zod",
        "Orders: list of all user orders linking to individual order detail pages",
        "Wishlist: grid of wishlisted products with remove action",
        "Reviews: list of reviews written by the user, each expandable in a dialog with full text, rating, and a link back to the product",
      ],
    },
    {
      name: "Order Detail",
      path: "/dashboard/orders/:OrderId",
      features: [
        "Individual order view showing every ordered item with image, quantity, and price",
        "Order summary panel mirroring the cart's layout",
      ],
    },
    {
      name: "Auth",
      path: "/auth/signIn, /auth/register",
      features: [
        "Sign in with email + password",
        "Guest account sign in (pre-configured Supabase credentials)",
        "Register with full name (EN/KA), email, password",
        "React Hook Form + Zod validation, route guards for protected pages",
      ],
    },
    {
      name: "404",
      path: "* (catch-all)",
      features: [
        "Styled not-found page, lazy-loaded like every other route, respects light/dark theme",
        "Carries noindex so it's never listed by search engines regardless of which URL produced it",
      ],
    },
  ],

  architecture: [
    {
      title: "Page / Section Component Pattern",
      description:
        "Each page is composed of section-level components, each living in its own folder under src/pageComponents/for<PageName>/. Each section folder contains a component.tsx, component.styles.ts (CVA), and component.data.tsx.",
    },
    {
      title: "CVA for Styling",
      description:
        "All component styles are extracted into dedicated *.styles.ts files using Class Variance Authority (CVA). This keeps JSX clean and makes responsive variants easy to audit.",
    },
    {
      title: "React Query Layer",
      description:
        "All server state is managed through TanStack React Query, split into useQuery hooks and useMutation hooks per domain. Mutations invalidate related query keys on success. All query hooks support a generic queryOptions parameter allowing select transform functions at the call site. Query and mutation keys are normalized to camelCase.",
    },
    {
      title: "Supabase Layer",
      description:
        "Raw Supabase calls live in src/supabase/ grouped by domain. Each file exports async fetch/mutation functions, TypeScript types, and map*Data transform functions used as React Query select transforms. Review likes are updated via increment_like_count/decrement_like_count RPC functions rather than raw counter writes.",
    },
    {
      title: "Context API",
      description:
        "AuthContext stores the current user and profile data, updated via Supabase onAuthStateChange. CartContext stores cart items in React state, persisted to localStorage, with add/remove/clear/quantity operations; cart item ids are consistently typed as number end-to-end.",
    },
    {
      title: "Route Guards",
      description:
        "AuthGuardLogIn redirects authenticated users away from /auth/* routes to the profile page; AuthGuardLogOut redirects unauthenticated users away from protected routes such as the profile page.",
    },
    {
      title: "Error Handling",
      description:
        "A class-component ErrorBoundary wraps the app and renders a themed fallback UI on runtime errors. A dedicated 404 page (src/pages/notFoundPage.tsx) handles unmatched routes; both respect light/dark theme.",
    },
    {
      title: "Internationalization",
      description:
        "Two locales: English and Georgian, across 21 namespaces. Configured with i18next-browser-languagedetector reading from localStorage then navigator. Language preference is persisted and document.documentElement.lang is updated reactively. Dedicated a11y and seo namespaces keep accessible names and page metadata translated too.",
    },
    {
      title: "Automated Testing",
      description:
        "Vitest + React Testing Library + jsdom, wired into CI. 3 suites, 22 tests: the cart context (add/remove/quantity/localStorage persistence), the product-image srcset contract shared with the upload script, and a regression test pinning a loading-vs-empty carousel bug. Auth, checkout, forms, wishlist, and E2E are not yet covered — the first suite, not full coverage.",
    },
    {
      title: "Accessibility",
      description:
        "eslint-plugin-jsx-a11y catches missing labels at lint time; i18n'd aria-labels were added to every icon-only control (cart/menu triggers, quantity ±, wishlist hearts, rating stars, pagination). A Lighthouse pass then caught what the linter structurally can't see — shadcn wrapper components, icon-only links, SVG-only social links — and fixed a below-threshold brand-red contrast with a dedicated --color-brand-on-dark token. Deployed score: 96/100 on both mobile and desktop.",
    },
    {
      title: "SEO & Social Metadata",
      description:
        "Static Open Graph/Twitter meta tags and a 1200×630 og-image.jpg live in index.html for social crawlers, which never execute JavaScript. A useDocumentMeta hook sets per-route <title>, description, canonical URL, and noindex (on profile, orders, auth, and 404) at runtime for humans and Googlebot.",
    },
    {
      title: "Performance & Bundle Chunking",
      description:
        "manualChunks splits react-vendor, supabase, and framer-motion into their own cacheable chunks. The home route is statically imported — it's the effective landing page — removing a serial lazy-load round trip; fonts are self-hosted and preloaded via a build-time Vite plugin alongside the hero image; Sonner is deferred behind a notify wrapper so it's excluded from the initial bundle. Deployed Lighthouse Performance: 99/100 desktop (FCP 0.5s, LCP 0.8s, CLS 0), 90/100 mobile (FCP 2.3s, LCP 3.2s, CLS 0.002) under slow-4G throttling — both with 100/100 Best Practices and SEO.",
    },
    {
      title: "Image Optimization Pipeline",
      description:
        "vite-plugin-image-optimizer recompresses every build asset; scripts/optimize-images.mjs resizes local source assets to their real display width (idempotent, safe to re-run); scripts/optimize-product-images.mjs re-uploads Supabase product images at 768px WebP with -sm 384px variants served via responsive srcset below the sm breakpoint.",
    },
    {
      title: "Security & Row-Level Security",
      description:
        "Supabase RLS is enabled and verified on every table, scoped to auth.uid(). The profiles SELECT policy was tightened from using(true) to owner-only, with a public_profiles view (id, username, avatar_url) covering public review-author display. The Supabase key exposed earlier in git history was rotated to a new publishable key and the legacy key disabled.",
    },
    {
      title: "CI/CD",
      description:
        "GitHub Actions runs ts-check, lint, test, and build on every pull request and push to main, with concurrency cancelling superseded runs. Dependabot opens weekly grouped dependency PRs (npm minor/patch, GitHub Actions), and a separate scheduled workflow pings Supabase weekly to keep the free-tier project from pausing.",
    },
  ],

  dbTables: [
    { table: "product", purpose: "Product catalogue (name, price, category, description, image_url[], sales_number)" },
    { table: "profiles", purpose: "User profile data (full_name_en, full_name_ka, username, phone_number, address, avatar_url); PII-restricted SELECT scoped to the owner" },
    { table: "reviews", purpose: "Product reviews (user_id, product_id, rating, comment, like_count); like_count updated via increment_like_count/decrement_like_count RPCs" },
    { table: "review_likes", purpose: "Join table tracking which users liked which reviews" },
    { table: "orders", purpose: "User orders (user_id, items JSON, total_price, status, created_at)" },
    { table: "wishlist", purpose: "Wishlisted products per user (user_id, product_id)" },
  ],

  i18n: {
    overview:
      "Two locales — English and Georgian — across 21 statically-imported namespaces. i18next-browser-languagedetector reads from localStorage then navigator; the active language is persisted and document.documentElement.lang updates reactively. Dedicated a11y and seo namespaces were added during the accessibility and SEO passes so accessible names and per-route metadata stay translated rather than hardcoded in English.",
    namespaces: [
      { namespace: "nav", page: "Header navigation labels" },
      { namespace: "hero", page: "Home hero headline and CTA" },
      { namespace: "shopHero", page: "Shop page hero copy" },
      { namespace: "categories", page: "Category names/labels" },
      { namespace: "brandStory", page: "Brand story section copy" },
      { namespace: "features", page: "Feature/USP highlights" },
      { namespace: "newsletter", page: "Newsletter signup section" },
      { namespace: "advert", page: "Promotional banner copy" },
      { namespace: "reviews", page: "Home reviews/social-proof section" },
      { namespace: "products", page: "Product grid, filter, sort labels" },
      { namespace: "cart", page: "Cart page and order summary" },
      { namespace: "auth", page: "Sign in / register forms" },
      { namespace: "profile", page: "Profile tabs and account form" },
      { namespace: "orders", page: "Order list and order detail" },
      { namespace: "wishlist", page: "Wishlist page" },
      { namespace: "personalReviews", page: "User's own reviews tab" },
      { namespace: "about", page: "About page sections" },
      { namespace: "footer", page: "Footer links and labels" },
      { namespace: "common", page: "Shared strings: buttons, toasts, aria-labels" },
      { namespace: "a11y", page: "Accessible names for icon-only controls" },
      { namespace: "seo", page: "Per-route document titles and descriptions" },
    ],
  },

  deployment: [
    "Vercel: vercel.json rewrites all routes to index.html for client-side routing (SPA); a build-time transformIndexHtml Vite plugin injects breakpoint-aware preload links for the hero image and Latin font.",
    "GitHub Actions CI (.github/workflows/ci.yml): every PR and push to main runs yarn install --frozen-lockfile → ts-check → lint → test (Vitest) → build, with concurrency cancelling superseded runs on the same ref.",
    "Dependabot (.github/dependabot.yml): weekly PRs for npm dependencies (minor/patch grouped into one PR, majors kept separate) and for the GitHub Actions versions used in the workflows.",
    "keep-supabase-alive workflow pings the products table every Monday at 9AM UTC to prevent the free-tier Supabase project from pausing due to inactivity.",
  ],

  uiPatterns: [
    "Dark mode via next-themes, defaulting to light",
    "Framer Motion stagger animations on section entry",
    "Embla Carousel for product carousels with thumbnail navigation",
    "Responsive <picture>/srcset: mobile-width WebP/AVIF variants served below the sm breakpoint for the hero, brand story, and product/carousel cards, generated by scripts/optimize-images.mjs and scripts/optimize-product-images.mjs",
    "Explicit width/height on every product and category image for CLS, paired with an explicit w-auto override — those attributes double as presentational sizing hints that otherwise stretch images out of their rounded-full frame",
    "Sonner toasts for user feedback (order placed, avatar updated, review deleted, etc.), lazy-loaded via a notify wrapper so the toast library isn't in the initial bundle",
    "ScrollToTop utility resets scroll on every route change",
    "Lazy loading: all page components except Home are React.lazy() with Suspense (Home is static-imported since it's the effective landing page)",
    "Image optimization via vite-plugin-image-optimizer at build time, plus custom sharp scripts for resizing local sources and Supabase-stored product images",
    "Per-route <title>/meta description/canonical/noindex via a lightweight useDocumentMeta hook (no react-helmet-async dependency — no SSR to justify it)",
    "GitHub Actions CI (ts-check/lint/test/build) on every PR/push, Dependabot for dependency updates, and a weekly workflow that pings Supabase to prevent the free-tier project from pausing",
  ],
};
