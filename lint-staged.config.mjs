export default {
  '*.{ts,js,cjs,mjs}': ['oxlint --fix --deny-warnings', 'prettier --write'],
  '*.{json,yml,yaml}': 'prettier --write'
};
