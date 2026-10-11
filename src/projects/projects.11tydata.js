export default {
  layout: "project.njk",
  eleventyComputed: {
    permalink: data => data.draft ? false : `/projects/${data.page.filePathStem.split("/").at(-2)}/`
  }
};
