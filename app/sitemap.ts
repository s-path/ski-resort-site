import type { MetadataRoute } from "next";
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
    ...resorts.map((r) => ({
      url: absoluteUrl(`/resorts/${r.id}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
