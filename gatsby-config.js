const path = require("path");

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-lodash`,
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: "./src/global/store/createStore",
        cleanupOnClient: true,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: path.join(__dirname, "src"),
        pages: path.join(__dirname, "src/pages"),
        global: path.join(__dirname, "src/global"),
        components: path.join(__dirname, "src/components"),
        styles: path.join(__dirname, "src/styles"),
        static: path.join(__dirname, "static"),
      },
    },
  ],
};
