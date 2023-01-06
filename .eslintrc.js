export default {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'comma-dangle': 0,
    'eol-last': 0,
    semi: 0
  },
};
