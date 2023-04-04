import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    specPattern:'src/components/**.spec.ts',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
