import type { MetadataRoute } from "next";
import { PREF_PAGES } from "@/lib/guides";
import { resorts } from "@/lib/resorts";
import { absoluteUrl, DATA_UPDATED_AT } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${DATA_UPDATED_AT}T00:00:00+09:00`);
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/resorts"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...[
      "/opening",
      "/early-bird",
      "/kids-free",
      ...PREF_PAGES.map((p) => `/area/${p.slug}`),
    ].map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.85,
    })),
    ...resorts.map((r) => ({
      url: absoluteUrl(`/resorts/${r.id}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
