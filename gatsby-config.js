module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: "./src/global/store/createStore",
        cleanupOnClient: true,
      },
    },
  ],
};
