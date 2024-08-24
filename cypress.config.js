const { defineConfig } = require("cypress");
const path = require('path');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Alphavantage-Test-Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
  e2e: {
    // add global cypress config
    watchForFileChanges: false,
    numTestsKeptInMemory: 1,
    retries: 1,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

      // load environment variables based on the execution environment
      return setupConfig(config);
    },
  },
  // any env variables common for all environments can be configured here
  env: {
    envOwner: 'Thimira' // dummy env value
  }
});

function setupConfig(config) {
  // accept a envFile value or use dev by default
  let envFileName = config.env.envFile ? config.env.envFile : 'dev';
  const pathToEnvFile = path.resolve('cypress', 'environments', `${envFileName}.env.json`);
  const envFile = require(pathToEnvFile);

  // overwrite any configuration values parsed from cmd line
  config.baseUrl = config.baseUrl ? config.baseUrl : envFile.baseUrl;

  // merge env variables from envFile to config object (due to this env variables in envFile will take precedence)
  config.env = { ...config.env, ...envFile.env }
  printConfig(config);
  return config;
}

function printConfig(config) {
  console.debug('----------------config----------------');
  console.debug('baseUrl:', config.baseUrl);
  console.debug('config.env', config.env);
  console.debug('--------------------------------------');
}
