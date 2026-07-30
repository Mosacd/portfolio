export const kiuReview = {
  note: "This is a personal competition project, not the official KIU website and not affiliated with Kutaisi International University.",

  overview:
    "KIU Website is a fully bilingual (English / Georgian) single-page application covering programs, news, admissions, research, student life, campus, vacancies, and project initiatives. The site features a Gemini-powered AI chatbot, sticky section navigation on content-heavy pages, lazy-loaded page transitions with slide animations, and a Docker + Vercel dual-deployment setup.",

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
        "CarouselHero: auto-advancing Embla carousel with 5 locale-specific hero slides (separate EN/KA image sets)",
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
        "SectionSwitcher: tab/category filter bar (All, Academic, University, Science, etc.)",
        "NewsGrid: filtered grid of NewsCard (desktop) and NewsCardMobile (mobile)",
        "Single news: NewsDetailsHero, full article body, SimilarNews at the bottom",
        "Content hardcoded in newsItems.ts with separate EN and KA arrays (6 items each)",
      ],
    },
    {
      name: "Programs + Single Program",
      path: "/:lang/programs, /:lang/programs/:id",
      features: [
        "ProgramsTabs: Radix Tabs filtering by degree type (Bachelor, Master, Single-Cycle, Doctoral)",
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
        "SideSectionsLayout with sections: Vision & Mission, Values, Management, Academic Personnel, International Partners",
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
        "Each page uses PageWrapper with a hero slot and a content slot",
        "Multi-section Detail components wrapped in SideSectionsLayout where applicable",
        "Campus includes an embedded video and dormitory/facility information",
        "Students has 8 named sub-sections (student life, clubs, services, etc.)",
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
        "Every interior page follows the same model: PageWrapper wraps a HeroSection and a FeatureDetail. Content-heavy pages wrap their Detail in SideSectionsLayout, which adds a sticky sidebar nav on desktop and a floating Sheet trigger on mobile. Pages are thin wrappers; all logic lives in feature components under src/components/<domain>/.",
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
        "All page components except Home, Students, and Research are lazy-loaded via React.lazy() with a Suspense fallback spinner in App.tsx. This keeps the initial bundle small and defers less-visited pages.",
    },
    {
      title: "SideSectionsLayout",
      description:
        "A reusable sticky section navigation wrapper used by About, Admission, Students, Vacancies, and SingleProgram. Sections are declared as { id, label } arrays matching DOM element ids in the Detail component. Active section is tracked via a scroll listener; scrollToSection() scrolls smoothly with a 100px offset.",
    },
    {
      title: "Gemini AI Chatbot",
      description:
        "Chatbot.tsx is always mounted in the global Layout. The client builds a KIU context prompt from the current language and conversation history, then sends it to Gemini 2.5 Flash via a Vercel serverless function (POST /api/chat). Locally, an Express 5 server mirrors the serverless function, proxied via Vite.",
    },
  ],

  i18n: {
    overview:
      "The app is fully bilingual in English and Georgian across 14 namespaces, all bundled statically at build time (no lazy loading). Detection order: localStorage, cookie, navigator. Georgian locale gets a global font-size: 94% correction to match optical sizing against the Inter Latin font. Hero carousel images exist as separate EN and KA locale variants selected at runtime.",
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
      { namespace: "header", page: "Nav labels, auth dialog strings, chatbot UI" },
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
    "HeroSection: reusable component accepting titleText, imageSrc, buttonLink, and buttonIcon, ensuring visual consistency across all pages",
    "SideSectionsLayout: sticky section nav (desktop aside) + floating Sheet trigger (mobile) with scroll-tracked active section",
    "Embla Carousel used in 4 locations: home hero, campus images, home news previews, and related programs",
    "Image preloader utility preloads 5 locale hero slides + 11 page heroes in parallel on startup",
    "SEO: SeoHead imperatively updates document.title and meta description/keywords via a static seoMap with separate EN/KA values",
    "Lazy-loaded page transitions with @keyframes pageContentFade (hero) and pageContentSlide (content) defined in index.css",
  ],
};
