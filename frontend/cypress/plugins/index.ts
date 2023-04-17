/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  require('@cypress/instrument-cra');
  require('@cypress/code-coverage/task')(on, config);
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
  if (config.testingType === 'component') {
    require('@cypress/react/plugins/react-scripts')(on, config);
  }
  return config;
};

export {};
