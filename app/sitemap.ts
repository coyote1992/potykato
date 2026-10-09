import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "eskuvo/", "szallas/", "horgaszat/", "arak/", "galeria/", "kapcsolat/"].map((p) => ({
    url: `${site.url}/${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
