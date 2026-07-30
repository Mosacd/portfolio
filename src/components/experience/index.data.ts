import Uni from "@/assets/kiuLogo2.svg";
import devsData from "@/assets/devsdata.svg";
import simpler from "@/assets/simpler.svg";
import evcar from "@/assets/evcar.png";

export const Work = [
  {
    image: devsData,
    title: "Full-Stack Developer",
    workPlace: "DevsData Tech Talent LLC – IT Recruitment",
    date: "2025 Jul - 2026 Jul",
    description:
      "Delivered Figma-to-production features, cross-browser/mobile fixes, and section reworks balancing performance against visual quality across a large WordPress marketing site. Automated the Google Docs to WordPress article publishing pipeline with custom PHP plugins, using post-meta guards and hook lifecycle ordering for safe, idempotent content transforms.",
  },
  {
    image: Uni,
    title: "Frontend Developer (Part-time)",
    workPlace: "Kutaisi International University",
    date: "2025 Nov - 2026 Jun",
    description:
      "Drove the split of admin and public into separate Next.js route groups with independent layouts, then built the admin CMS on that structure: a Lexical rich-text editor with inline images and a flexible content-block system, article create/edit/approval flows, and Zod-validated forms. Delivered full English/Georgian localization across the admin and public site, with live preview language switching and locale-aware date formatting.",
  },
  {
    image: simpler,
    title: "Full-Stack Developer (Freelance)",
    workPlace: "Simpler AI",
    date: "2025 Aug - 2025 Oct",
    description:
      "AI Customer Support Platform (Simpler.ge): Built the retrieval and messaging layer of a multi-tenant support chatbot, including a pgvector RAG pipeline with PDF ingestion and tuned relevance thresholds, message deduplication, conversation threading, human takeover, and integrations across Facebook, Messenger, WhatsApp, and an embeddable web widget.",
  },
  {
    image: evcar,
    title: "Full-Stack Developer (Freelance)",
    workPlace: "EV Car Charger",
    date: "2024 Dec - 2025 Mar",
    description:
      "EV Charger E-commerce (evcarcharger.ge): Built and shipped a live storefront processing real orders, integrating BOG and TBC payment gateways with order persistence, customer-facing status tracking, and an admin fulfillment flow. Trilingual across Georgian, English, and Russian, covering both UI strings and Supabase-stored product content.",
  },
  {
    image: Uni,
    title: "Teaching Assistant – Web Development",
    workPlace: "Kutaisi International University",
    date: "2023 Sept - 2024 Jan",
    description:
      "Mentored students in HTML, CSS, JavaScript, and React fundamentals through assignments and hands-on exercises.",
  },
];
