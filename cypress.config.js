const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    // add global cypress config
    baseUrl: "https://www.alphavantage.co",
    watchForFileChanges: false,
    numTestsKeptInMemory: 1,
    retries: 0,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  // any common env variables
  env: {
    // apikey: 'H3PPC9O6RNL5D5MG'
    apikey: 'demo'
  }
});
