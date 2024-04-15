import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default {
  extends: [
    'eslint:recommended',
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended.extensions,
    pluginReactConfig,
    'prettier/@typescript-eslint',
    'prettier/prettier',
  ],
  plugins: ['react', '@typescript-eslint'],
};
