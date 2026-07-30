export const gymgearReview = {
  overview:
    "GymGear is a full-stack e-commerce web application for gym equipment and apparel. It supports product browsing, filtering, cart management, order placement, user authentication, wishlists, product reviews, and a full profile management system. The UI is fully responsive across mobile, tablet, laptop (tested at 125% browser zoom, since most laptops ship with 125% display scaling active in system settings), and 1920×1080 desktop screens.",

  techStack: [
    { layer: "Framework", technology: "React 18" },
    { layer: "Language", technology: "TypeScript 5.6" },
    { layer: "Build Tool", technology: "Vite 6" },
    { layer: "Styling", technology: "Tailwind CSS 3" },
    { layer: "Backend / DB", technology: "Supabase (PostgreSQL)" },
    { layer: "Auth", technology: "Supabase Auth" },
    { layer: "State (server)", technology: "TanStack React Query v5" },
    { layer: "State (client)", technology: "React Context API" },
    { layer: "Routing", technology: "React Router DOM v7" },
    { layer: "Forms", technology: "React Hook Form + Zod" },
    { layer: "Animations", technology: "Framer Motion" },
    { layer: "i18n", technology: "i18next + react-i18next" },
    { layer: "UI Components", technology: "shadcn/ui (Radix UI primitives)" },
    { layer: "Icons", technology: "Lucide React" },
    { layer: "Toast notifications", technology: "Sonner" },
    { layer: "Carousel", technology: "Embla Carousel" },
    { layer: "Virtualization", technology: "TanStack Virtual" },
    { layer: "Theme", technology: "next-themes" },
    { layer: "Class utilities", technology: "CVA, clsx, tailwind-merge" },
    { layer: "Linting", technology: "ESLint + typescript-eslint" },
    { layer: "Formatting", technology: "Prettier" },
    { layer: "Git Hooks", technology: "Husky" },
    { layer: "Image Optimization", technology: "vite-plugin-image-optimizer + sharp + svgo" },
    { layer: "CI", technology: "GitHub Actions (keep-supabase-alive workflow)" },
  ],

  pages: [
    {
      name: "Home",
      path: "/dashboard/main",
      features: [
        "HeroBanner: full-width hero with headline, CTA, and entrance animation",
        "BrandStory: editorial section with brand narrative",
        "CategoriesSection: grid of product categories linking to the filtered shop",
        "CarouselMain: featured products carousel (Embla)",
        "ReviewsSocialProof: top-rated reviews pulled from the DB sorted by like count",
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
      ],
    },
    {
      name: "Cart",
      path: "/dashboard/cartPage",
      features: [
        "Item list with quantity controls and remove",
        "Order summary panel with subtotal, delivery, and total",
        "Place Order: creates an order in Supabase and clears the cart (requires auth)",
      ],
    },
    {
      name: "Profile",
      path: "/dashboard/profilePage",
      features: [
        "Account: edit name, username, phone, address via React Hook Form + Zod",
        "Orders: list of all user orders linking to order detail pages",
        "Wishlist: grid of wishlisted products with remove action",
        "Reviews: list of reviews written by the user, each expandable in a dialog",
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
        "All server state is managed through TanStack React Query, split into useQuery hooks and useMutation hooks per domain. Mutations invalidate related query keys on success. All query hooks support a generic queryOptions parameter allowing select transform functions at the call site.",
    },
    {
      title: "Supabase Layer",
      description:
        "Raw Supabase calls live in src/supabase/ grouped by domain. Each file exports async fetch/mutation functions, TypeScript types, and map*Data transform functions used as React Query select transforms.",
    },
    {
      title: "Context API",
      description:
        "AuthContext stores the current user and profile data, updated via Supabase onAuthStateChange. CartContext stores cart items in React state, persisted to localStorage, with add/remove/clear/quantity operations.",
    },
    {
      title: "Internationalization",
      description:
        "Two locales: English and Georgian. Configured with i18next-browser-languagedetector reading from localStorage then navigator. Language preference is persisted and document.documentElement.lang is updated reactively.",
    },
  ],

  dbTables: [
    { table: "product", purpose: "Product catalogue (name, price, category, description, image_url[], sales_number)" },
    { table: "profiles", purpose: "User profile data (full_name_en, full_name_ka, username, phone_number, address, avatar_url)" },
    { table: "reviews", purpose: "Product reviews (user_id, product_id, rating, comment, like_count)" },
    { table: "review_likes", purpose: "Join table tracking which users liked which reviews" },
    { table: "orders", purpose: "User orders (user_id, items JSON, total_price, status, created_at)" },
    { table: "wishlist", purpose: "Wishlisted products per user (user_id, product_id)" },
  ],

  uiPatterns: [
    "Dark mode via next-themes, defaulting to light",
    "Framer Motion stagger animations on section entry",
    "Embla Carousel for product carousels with thumbnail navigation",
    "Sonner toasts for user feedback (order placed, avatar updated, review deleted, etc.)",
    "ScrollToTop utility resets scroll on every route change",
    "Lazy loading: all page components are React.lazy() with Suspense",
    "Image optimization via vite-plugin-image-optimizer at build time",
    "GitHub Actions CI pings Supabase weekly to prevent free-tier project from pausing",
  ],
};
