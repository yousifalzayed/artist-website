import { videoEmbed } from "./lib/video-embed.js";

export default function (config) {
  config.addFilter("videoEmbed", videoEmbed);
  config.addPassthroughCopy("src/assets");
  config.addPassthroughCopy("src/projects/**/images/*");
  config.addCollection("projects", api => api.getFilteredByGlob("src/projects/*/index.md")
    .filter(item => !item.data.draft).sort((a,b) => (a.data.order ?? 999) - (b.data.order ?? 999)));
  config.addCollection("selectedWorks", api => api.getFilteredByGlob("src/projects/*/index.md")
    .filter(item => !item.data.draft && item.data.category !== "performance").sort((a,b) => (a.data.order ?? 999) - (b.data.order ?? 999)));
  config.addCollection("performances", api => api.getFilteredByGlob("src/projects/*/index.md")
    .filter(item => !item.data.draft && item.data.category === "performance").sort((a,b) => (a.data.order ?? 999) - (b.data.order ?? 999)));
  return { dir: { input: "src", output: "_site" }, pathPrefix: process.env.PATH_PREFIX || "/" };
}
