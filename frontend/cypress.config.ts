import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    specPattern: 'src/components/**',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
