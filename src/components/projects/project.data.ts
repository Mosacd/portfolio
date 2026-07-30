import gymgear from "@/assets/projectImages/GymGearNew.jpg";
import koko from "@/assets/projectImages/KoKo.jpg";
// import neighbourly from "@/assets/projectImages/Neighbourly.jpg";
import Kiu from "@/assets/projectImages/KIU.jpg";
import EvCarCharger from "@/assets/projectImages/EvCarCharger.jpg";
import gymgearW from "@/assets/projectImages/GymGearNew.webp";
import kokoW from "@/assets/projectImages/KoKo.webp";
// import neighbourlyW from "@/assets/projectImages/Neighbourly.webp";
import KiuW from "@/assets/projectImages/KIU.webp";
import EvCarChargerW from "@/assets/projectImages/EvCarCharger.webp";
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

export const projectData: ProjectDataType[] = [
  {
    slug: "gymgear",
    title: "GymGear",
    image: gymgear,
    imageWebp: gymgearW,
    description:
      "A full-featured e-commerce platform for gym equipment. Includes user authentication, profiles with order history and wishlists, and product reviews. Data is managed via Supabase.",
    details:
      "GymGear is a full-stack e-commerce platform built to simulate a real-world online store for gym equipment. Users can register and log in, browse products, add items to a wishlist, place orders, and leave product reviews. Order history is persisted per user via Supabase. The project was built to practice integrating React Query for server state, React Hook Form + Zod for validated forms, and Radix UI for accessible components, all composed with Tailwind and animated with Framer Motion.",
    review: gymgearReview,
    techstack: "React, TypeScript, Supabase, React Query, Zod, Tailwind, shadcn/ui, Framer Motion",
    webLink: "https://gym-app-7y5y.vercel.app/",
    githubLink: "https://github.com/Mosa-5/gym-app",
  },
  {
    slug: "kiu",
    title: "KIU",
    image: Kiu,
    imageWebp: KiuW,
    description:
      "A responsive, multilingual university website for Kutaisi International University. Built with dynamic content, interactive pages, and a polished multilingual user experience.",
    details:
      "The KIU website was a university group project to build a public-facing site representing Kutaisi International University. It features full multilingual support, dynamic content across multiple pages, and a polished, responsive design. The project focused on clean component architecture, smooth navigation, and making the site feel professional and accessible across all screen sizes.",
    review: kiuReview,
    techstack: "React, TypeScript, Tailwind, i18next, React Router, shadcn/ui, Gemini API",
    webLink: "https://kiu-website.vercel.app/en",
    githubLink: "https://github.com/Mosa-5/Kiu_website",
  },
  {
    slug: "koko",
    title: "KoKo",
    image: koko,
    imageWebp: kokoW,
    description:
      "An educational app for learning and practising sign language. Features 3 types of exercises and webcam interactivity for real-time sign recognition, wrapped in a clean, user-friendly interface.",
    details:
      "KoKo is an interactive sign language learning app designed to make the learning process engaging and hands-on. It includes three distinct exercise types to reinforce knowledge at different levels, and uses webcam input for real-time sign recognition so users can practise and get feedback without any additional hardware. The focus was on building an accessible, intuitive interface that keeps learners motivated.",
    review: kokoReview,
    techstack: "React, TypeScript, Tailwind, MediaPipe, React Router",
    webLink: "https://koko-lilac.vercel.app/home",
    githubLink: "https://github.com/Mosa-5/koko",
  },
  {
    slug: "evcarcharger",
    title: "EV Car Charger",
    image: EvCarCharger,
    imageWebp: EvCarChargerW,
    description:
      "A collaborative EV charging platform with a customer-facing site including payment integration and a separate admin panel. Design was client-constrained; focus was on clean, responsive, and reliable delivery.",
    details:
      "Built collaboratively with a friend for a real client, this platform consists of two separate apps: a customer-facing website where users can browse charger options and complete purchases via payment integration, and an admin panel for managing inventory and orders. The client had strict design requirements, so the work was focused on pixel-accurate implementation, reliable data flow with Supabase, and a smooth, responsive experience across devices.",
    techstack: "React, TypeScript, Ant Design, Supabase, Node.js",
    webLink: "https://www.evcarcharger.ge/ka",
    githubLink: "",
  },
];

type ProjectDataType = {
  slug: string;
  title: string;
  image: string;
  imageWebp: string;
  description: string;
  details: string;
  review?: ProjectReview;
  techstack: string;
  webLink: string;
  githubLink: string;
};
