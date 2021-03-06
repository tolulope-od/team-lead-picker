module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error']
  }
};
