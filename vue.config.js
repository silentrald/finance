const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: false,
      },
    },
  },
});
