/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    codeCoverage: {
      url: 'http://localhost:3003/__coverage__',
      expectBackendCoverageOnly: true,
    },
  },
  component: {
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    screenshotOnRunFailure: false,
    video: false,
    specPattern: [
      'src/components/**/*.spec.tsx',
      'src/pages/**/*.spec.tsx',
      '../src/components/**/*.spec.tsx',
      '../src/pages/**/*.spec.tsx',
      './**/*.spec.tsx',
      '../**/*.spec.tsx',
    ],
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
