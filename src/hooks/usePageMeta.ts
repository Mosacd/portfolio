import { useEffect } from "react";

const SITE_URL = "https://portfolio-ruby-pi-33.vercel.app";

type PageMeta = {
  title: string;
  description: string;
  /** Path only, e.g. "/projects/gymgear". Resolved against SITE_URL. */
  path: string;
  image?: string;
};

const upsertMeta = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

/**
 * Keeps <title>, description and canonical in sync with the active route.
 *
 * Every route must call this; otherwise navigating away from a page that sets
 * metadata leaves the previous route's title and canonical in place.
 *
 * Note: crawlers that don't execute JS still see the static tags in index.html.
 * Making these visible without JS needs prerendering or SSR.
 */
export function usePageMeta({ title, description, path, image }: PageMeta) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image]);
}
