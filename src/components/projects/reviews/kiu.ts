import lighthouseDesktop from "@/assets/projectImages/kiu-lighthouse-desktop.webp";
import lighthouseMobile from "@/assets/projectImages/kiu-lighthouse-mobile.webp";

export const kiuReview = {
  note: "This is a personal competition project, not the official KIU website and not affiliated with Kutaisi International University.",

  overview:
    "KIU Website is a fully bilingual (English / Georgian) single-page application covering programs, news, admissions, research, student life, campus, vacancies, and project initiatives. The site features a Gemini-powered AI chatbot, a shared sticky/inline section navigation system, self-hosted fonts, per-page image optimization, and a Docker + Vercel dual-deployment setup.",

  lighthouseScores: [
    { label: "Desktop", image: lighthouseDesktop },
    { label: "Mobile", image: lighthouseMobile },
  ],

  techStack: [
    { layer: "Framework", technology: "React 19.1.1" },
    { layer: "Language", technology: "TypeScript ~5.8.3 (strict mode)" },
    { layer: "Build Tool", technology: "Vite 7.1.7" },
    { layer: "Styling", technology: "Tailwind CSS v4 (via @tailwindcss/vite)" },
    { layer: "Class Utilities", technology: "CVA, clsx, tailwind-merge" },
    { layer: "Routing", technology: "React Router DOM v7.9.2 (/:lang prefix)" },
    { layer: "i18n", technology: "i18next 25 + react-i18next + browser-languagedetector" },
    { layer: "UI Primitives", technology: "shadcn/ui (New York) + Radix UI" },
    { layer: "Icons", technology: "Lucide React 0.544.0" },
    { layer: "Carousel", technology: "Embla Carousel React 8.6.0" },
    { layer: "Forms", technology: "React Hook Form 7.65.0 + Zod 4.1.12" },
    { layer: "Email", technology: "@emailjs/browser (vacancy form)" },
    { layer: "AI / Chatbot", technology: "@google/generative-ai: Gemini 2.5 Flash" },
    { layer: "Fonts", technology: "Self-hosted variable fonts, unicode-range subsetted" },
    { layer: "Backend (local)", technology: "Express 5.1.0 (mirrors Vercel serverless)" },
    { layer: "Serverless", technology: "Vercel (@vercel/node 5.4.1)" },
    { layer: "Containerization", technology: "Docker multi-stage + docker-compose" },
    { layer: "Linting", technology: "ESLint + typescript-eslint" },
  ],

  pages: [
    {
      name: "Home",
      path: "/:lang",
      features: [
        "CarouselHero: auto-advancing Embla carousel with 5 locale-specific hero slides, each with a mobile-width variant served via <picture>",
        "ProgramHome: program category teasers linking to /programs",
        "AboutHome: editorial about-the-university section",
        "CampusHome: campus image block. GalleryHome: static photo grid",
        "NewsHome: latest news cards with a nested NewsCarousel",
      ],
    },
    {
      name: "News + Single News",
      path: "/:lang/news, /:lang/news/:id",
      features: [
        "SectionSwitcher: category filter bar with a sliding underline indicator that measures and animates to the active tab's position/width",
        "NewsGrid: filtered grid of NewsCard (desktop) and NewsCardMobile (mobile) — the mobile card loads a smaller image variant since it's never rendered alongside the desktop one",
        "Single news: NewsDetailsHero, full article body, SimilarNews at the bottom",
        "Content hardcoded in newsItems.ts with separate EN and KA arrays (6 items each)",
      ],
    },
    {
      name: "Programs + Single Program",
      path: "/:lang/programs, /:lang/programs/:id",
      features: [
        "ProgramsTabs: Radix Tabs filtering by degree type, with the same sliding-indicator technique as the News page",
        "ProgramsGrid: grid of ProgramCard components linked to individual program pages",
        "Single program: 8 section components in SideSectionsLayout with sticky sidebar nav",
        "Program-specific theming (CS: blue, Mathematics: purple)",
        "Full data for computerScience and mathematics; other 9 programs show a fallback",
      ],
    },
    {
      name: "About Us",
      path: "/:lang/about-us",
      features: [
        "Sections: Our History (founder's statement), Honorary President's Welcome, International Advisory Council, Team, Academic Programs",
        "Quoted statements get a bordered blockquote treatment with an avatar-initials byline instead of plain text",
        "Every section header uses a distinct icon in a circular badge, with divider rules between sections instead of background-boxed titles",
      ],
    },
    {
      name: "Vacancies",
      path: "/:lang/vacancies",
      features: [
        "Application form using React Hook Form + Zod + EmailJS for client-side email dispatch",
        "Multi-select subject fields via toggleSubject() helper",
      ],
    },
    {
      name: "Admission / Campus / Students / Research",
      path: "/:lang/admission, /:lang/campus, /:lang/students, /:lang/research",
      features: [
        "Each page uses PageWrapper with a hero slot and a content slot, sharing the same icon-badge/divider section pattern as About",
        "Admission: Intro, Programs, About KIU, Campus, Apply, Timeline — fixed a bug where the sidebar nav's anchors didn't match the rendered section ids, so 'Programs' silently scrolled to the wrong place",
        "Research: Overview, Hadron Therapy Center, Proton Therapy Clinic, Publications",
        "Students: 8 sections — Legal Directory, Academic Mobility, Campus, Library, Student Grant Program, Erasmus exchanges, Academic Calendar, plus the intro",
      ],
    },
    {
      name: "Projects",
      path: "/:lang/projects, /:lang/projects/youthuni, /:lang/projects/frontiers",
      features: [
        "ProjectsGrid: cards linking to Youth University and Advancing Frontiers sub-pages",
        "Each sub-page has its own Hero + Detail component pair",
      ],
    },
  ],

  architecture: [
    {
      title: "Page / Section Component Pattern",
      description:
        "Every interior page follows the same model: PageWrapper wraps a HeroSection and a FeatureDetail. Content-heavy pages wrap their Detail in SideSectionsLayout. Pages are thin wrappers; all logic lives in feature components under src/components/<domain>/.",
    },
    {
      title: "CVA for Styling",
      description:
        "All component styles are extracted into dedicated *.styles.ts files using Class Variance Authority (CVA). JSX imports named exports from the sibling style file and calls them as class-name factories. This keeps JSX clean and makes responsive variants easy to audit.",
    },
    {
      title: "Language Routing",
      description:
        "All routes are prefixed with /:lang. The root / redirects to /en. Only 'en' and 'ka' are accepted; anything else redirects to /en. The Layout component syncs i18next's active language to the URL param on every navigation and updates document.documentElement.lang reactively.",
    },
    {
      title: "Code Splitting",
      description:
        "Every page component except Home is lazy-loaded via React.lazy() with a Suspense fallback spinner in App.tsx. Students and Research were previously bundled eagerly into the main chunk despite having their own Suspense boundaries already in place — moving them to lazy imports actually split them out and shrank the shared bundle every page pays for.",
    },
    {
      title: "One Section Nav, Two Layouts",
      description:
        "SideSectionsLayout is shared by About, Admission, Students, Vacancies, and SingleProgram. Desktop gets a sticky aside column; mobile/tablet renders the exact same component in a 'boxed' variant, placed inline under the hero instead of a separate floating trigger — same title, same buttons, same active-state styling, controlled by a single CVA variant rather than two implementations to keep in sync.",
    },
    {
      title: "Gemini AI Chatbot",
      description:
        "Chatbot.tsx is always mounted in the global Layout. The client builds a KIU context prompt from the current language and conversation history, then sends it to Gemini 2.5 Flash via a Vercel serverless function (POST /api/chat) with the system prompt and user input kept separate to mitigate prompt injection. Locally, an Express 5 server mirrors the serverless function, proxied via Vite.",
    },
    {
      title: "Per-Page Image Optimization",
      description:
        "Every hero image (10+ pages) is re-encoded and given a mobile-width variant with a Sharp-based script that only keeps a re-encode if it's actually smaller than the original. Each page's HeroSection renders a <picture> with a max-width media query, and the startup image preloader was rewritten to preload only the current route's hero instead of unconditionally fetching all page heroes on every load.",
    },
    {
      title: "Accessibility & Agentic Browsing",
      description:
        "Added a <main> landmark (the route outlet had none), fixed an icon-only mobile menu button with no accessible name, and published llms.txt following the emerging llms.txt spec so AI agents/crawlers can navigate the site's real structure instead of guessing from raw markup.",
    },
  ],

  i18n: {
    overview:
      "The app is fully bilingual in English and Georgian across 14 namespaces, all bundled statically at build time (no lazy loading). Detection order: localStorage, cookie, navigator. Fonts are self-hosted and subsetted to only the Latin and Georgian unicode ranges the site actually uses. Georgian still gets a global font-size: 94% correction to match its optical sizing against the Latin typeface. Hero carousel images exist as separate EN and KA locale variants selected at runtime.",
    namespaces: [
      { namespace: "admission", page: "Admission page content" },
      { namespace: "frontiers", page: "Advancing Frontiers conference page" },
      { namespace: "youthUni", page: "Youth University project page" },
      { namespace: "projects", page: "Projects listing page" },
      { namespace: "vacancy", page: "Vacancies page + form labels" },
      { namespace: "news", page: "News categories, search placeholders" },
      { namespace: "home", page: "Home page section text" },
      { namespace: "about", page: "About Us sections" },
      { namespace: "footer", page: "Footer labels, contact info" },
      { namespace: "header", page: "Nav labels, chatbot UI" },
      { namespace: "programs", page: "Program listing categories" },
      { namespace: "campus", page: "Campus page content" },
      { namespace: "research", page: "Research page content" },
      { namespace: "students", page: "Students page sections" },
    ],
  },

  deployment: [
    "Vercel (primary): vercel.json configures a catch-all SPA rewrite (/** to /index.html). The serverless function at api/chat.ts is handled automatically by Vercel's file-based routing.",
    "Docker (alternative): multi-stage Dockerfile: Node 18-alpine build stage runs npm ci + npm run build; Nginx:alpine serve stage copies dist/ into its HTML root.",
    "docker-compose orchestrates two services: frontend (Nginx on port 3000) and backend (Express on port 5000, internal 3001). Vite proxies /api to the backend in local dev.",
  ],

  uiPatterns: [
    "PageWrapper shell: hero slot (fade animation) + content slot (slide-up animation) used on every interior page",
    "HeroSection: reusable component accepting titleText, imageSrc, an optional mobile imageSrcSm, buttonLink, and buttonIcon, ensuring visual consistency across all pages",
    "SideSectionsLayout: one shared component rendered as a sticky aside on desktop or a boxed inline block on mobile, via a single CVA variant prop",
    "Sliding tab indicator: a single absolutely-positioned bar measures the active TabsTrigger via getBoundingClientRect() and animates transform/width to it, replacing a per-tab fade so switching feels continuous rather than blinking",
    "Embla Carousel used in 4 locations: home hero, campus images, home news previews, and related programs",
    "Self-hosted, per-page image preloading: only the current route's hero image is preloaded on load, resolved from the pathname, instead of every page's hero on every visit",
    "SEO: SeoHead imperatively updates document.title and meta description/keywords via a static seoMap with separate EN/KA values",
    "Lazy-loaded page transitions with @keyframes pageContentFade (hero) and pageContentSlide (content) defined in index.css",
  ],
};
