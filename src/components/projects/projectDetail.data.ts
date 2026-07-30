import { gymgearReview } from "./reviews/gymgear";
import { kiuReview } from "./reviews/kiu";
import { kokoReview } from "./reviews/koko";

export type ProjectReview = {
  overview: string;
  techStack: { layer: string; technology: string }[];
  pages: { name: string; path: string; features: string[] }[];
  architecture: { title: string; description: string }[];
  note?: string;
  dbTables?: { table: string; purpose: string }[];
  i18n?: { overview: string; namespaces?: { namespace: string; page: string }[] };
  deployment?: string[];
  uiPatterns?: string[];
};

type ProjectDetail = {
  /** Long-form intro. Used as the overview for projects that have no full review. */
  details: string;
  review?: ProjectReview;
};

/**
 * Content rendered only by /projects/:slug, keyed by slug.
 *
 * Deliberately separate from project.data.ts. The landing page imports projectData
 * to build the cards, so anything living there ships in the initial page load --
 * and the review bodies (tech-stack tables, page lists, architecture notes) are
 * several KB of text no landing-page visitor ever sees. Keeping them here means
 * they load with the lazy ProjectPage chunk instead.
 *
 * Add a project: add it to projectData first, then optionally here. A slug with no
 * entry falls back to its card description.
 */
export const projectDetails: Record<string, ProjectDetail> = {
  gymgear: {
    details:
      "GymGear is a full-stack e-commerce platform built to simulate a real-world online store for gym equipment. Users can register and log in, browse products, add items to a wishlist, place orders, and leave product reviews. Order history is persisted per user via Supabase. The project was built to practice integrating React Query for server state, React Hook Form + Zod for validated forms, and Radix UI for accessible components, all composed with Tailwind and animated with Framer Motion.",
    review: gymgearReview,
  },
  kiu: {
    details:
      "The KIU website was a university group project to build a public-facing site representing Kutaisi International University. It features full multilingual support, dynamic content across multiple pages, and a polished, responsive design. The project focused on clean component architecture, smooth navigation, and making the site feel professional and accessible across all screen sizes.",
    review: kiuReview,
  },
  koko: {
    details:
      "KoKo is an interactive sign language learning app designed to make the learning process engaging and hands-on. It includes three distinct exercise types to reinforce knowledge at different levels, and uses webcam input for real-time sign recognition so users can practise and get feedback without any additional hardware. The focus was on building an accessible, intuitive interface that keeps learners motivated.",
    review: kokoReview,
  },
  evcarcharger: {
    details:
      "Built collaboratively with a friend for a real client, this platform consists of two separate apps: a customer-facing website where users can browse charger options and complete purchases via payment integration, and an admin panel for managing inventory and orders. The client had strict design requirements, so the work was focused on pixel-accurate implementation, reliable data flow with Supabase, and a smooth, responsive experience across devices.",
  },
};
