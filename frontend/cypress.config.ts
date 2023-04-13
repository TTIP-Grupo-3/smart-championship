import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    screenshotOnRunFailure: false,
    video: false,
    specPattern: ['src/components/**/*.spec.tsx', 'src/pages/***.spec.tsx'],
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
