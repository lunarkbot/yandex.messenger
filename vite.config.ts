/* eslint-disable */
import { defineConfig } from 'vite';
import precompileTemplatesPlugin from './plugins/precompileTemplatesPlugin';

export default defineConfig({
  plugins: [precompileTemplatesPlugin()],
});
