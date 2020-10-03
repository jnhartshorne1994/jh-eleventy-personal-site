const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  /* Add syntax highlighting for code */
  eleventyConfig.addPlugin(syntaxHighlight);

  /* Add menu support */
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  /* Pass through - stop eleventy touching */
  eleventyConfig.addPassthroughCopy('src/images')

  /* Create a Posts collection */
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("./src/posts/*.md").reverse();
  });

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'njk'
  }
}
