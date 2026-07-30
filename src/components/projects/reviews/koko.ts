export const kokoReview = {
  overview:
    "KoKo is a group hackathon project: an interactive sign language learning app designed to make ASL accessible and engaging. It features three distinct exercise types powered by live webcam gesture recognition via Google MediaPipe, a clean bilingual UI, and a score system that stays in sync across the app via a custom event bus.",

  techStack: [
    { layer: "Framework", technology: "React" },
    { layer: "Language", technology: "TypeScript" },
    { layer: "Build Tool", technology: "Vite" },
    { layer: "Styling", technology: "Tailwind CSS" },
    { layer: "Class Utilities", technology: "CVA (class-variance-authority)" },
    { layer: "Routing", technology: "React Router v7" },
    { layer: "UI Primitives", technology: "shadcn/ui (Button), Radix Slot" },
    { layer: "Gesture Recognition", technology: "Google MediaPipe Tasks Vision (@mediapipe/tasks-vision)" },
    { layer: "Hand Landmark Drawing", technology: "@mediapipe/drawing_utils" },
    { layer: "MediaPipe Runtime", technology: "WASM pulled from jsDelivr CDN at startup" },
    { layer: "Deployment", technology: "Vercel" },
  ],

  pages: [
    {
      name: "Catalog",
      path: "/catalog/:lang",
      features: [
        "Browse available sign language exercises filtered by language",
        "Each card links to the shared exercise route with its own exercise id",
      ],
    },
    {
      name: "Exercise (shared route)",
      path: "/catalog/:lang/exercise/:id",
      features: [
        "Single route dispatches to Sign It, Watch It, or Read It at runtime via a switch on exerciseType from the data",
        "Keeps URLs clean with no four separate route definitions",
        "Sign It: live webcam mode: MediaPipe GestureRecognizer reads hand gestures frame-by-frame; finger-spell a word letter by letter in front of the camera",
        "Watch It: watch an MP4 video of someone signing a word, then type it letter by letter into individual inputs",
        "Read It: shown a row of static ASL hand-sign images (one per letter), type the word or sentence they spell out; split into single word and full sentence sub-types",
      ],
    },
    {
      name: "About Us",
      path: "/about",
      features: [
        "Team page featuring the Group 21 graphic",
        "Frames the project as a hackathon team effort with startup ambitions",
      ],
    },
  ],

  architecture: [
    {
      title: "MediaPipe Gesture Recognition",
      description:
        "A GestureRecognizer model (a .task binary in /public) is run against each webcam frame via the MediaPipe Tasks Vision WASM runtime. It returns a gesture category name like 'A' or 'B'. Hand landmarks are drawn on a canvas overlay using @mediapipe/drawing_utils.",
    },
    {
      title: "rAF Game Loop with useRef",
      description:
        "The requestAnimationFrame game loop in Sign It closes over useRef values rather than state to avoid stale closures. This ensures the tight rAF callback always sees the current letter index without triggering re-renders on every frame.",
    },
    {
      title: "Single Dispatching Exercise Route",
      description:
        "A single route /catalog/:lang/exercise/:id dispatches to the correct exercise component at runtime via a switch on exerciseType from the exercise data. This keeps URLs clean without needing four separate route definitions.",
    },
    {
      title: "Custom Event Bus for Score Sync",
      description:
        "Score synchronization uses a native window.CustomEvent bus instead of React Context. Any mounted useScore(lang) instance stays in sync by listening to 'koko-score-update' on window, which avoids Context re-render overhead in a performance-sensitive app.",
    },
  ],

  uiPatterns: [
    "Live webcam feed with MediaPipe hand landmark overlay drawn on a canvas element",
    "Letter-by-letter input fields for Watch It and Read It exercises",
    "Static ASL hand-sign image rows for the Read It exercise (single word and full sentence variants)",
    "Score system synced across all mounted components via a custom window event bus",
    "Bilingual routing via /:lang URL param",
  ],
};
