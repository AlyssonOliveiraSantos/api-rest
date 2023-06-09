module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': 'off',
    'import/first': 'off',
    'import/newline-after-import': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'no-empty-function': 'off',
    camelcase: 'off',
  },
};
