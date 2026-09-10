import { MetadataRoute } from "next";
import { tools } from "@/data/tools";

const BASE_URL = "https://testmygear.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
    ...tools.map((t) => ({
      url: `${BASE_URL}/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
