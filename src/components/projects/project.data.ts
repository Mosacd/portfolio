import gymgear from "@/assets/projectImages/GymGearNew.jpg";
import koko from "@/assets/projectImages/KoKo.jpg";
import Kiu from "@/assets/projectImages/KIU.jpg";
import EvCarCharger from "@/assets/projectImages/EvCarCharger.jpg";
import gymgearW from "@/assets/projectImages/GymGearNew.webp";
import kokoW from "@/assets/projectImages/KoKo.webp";
import KiuW from "@/assets/projectImages/KIU.webp";
import EvCarChargerW from "@/assets/projectImages/EvCarCharger.webp";

/**
 * Card-level project data, imported by the landing page.
 *
 * Keep this lean: everything here ships in the initial bundle. Long-form copy and
 * the full reviews live in projectDetail.data.ts, which only the lazy ProjectPage
 * chunk imports.
 *
 * Note: scripts/prerender.mjs parses this file for slug/title/description, in that
 * order, and fails the build if the shape changes.
 */
export const projectData: ProjectDataType[] = [
  {
    slug: "gymgear",
    title: "GymGear",
    image: gymgear,
    imageWebp: gymgearW,
    description:
      "A full-featured e-commerce platform for gym equipment. Includes user authentication, profiles with order history and wishlists, and product reviews. Data is managed via Supabase.",
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
  techstack: string;
  webLink: string;
  githubLink: string;
};
