module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2
      }
    }
  ]
};
