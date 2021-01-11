module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'eol-last': 'off',
    'linebreak-style': ['error', 'unix'],
    'space-before-function-paren': ['error', 'never'],
    'operator-linebreak': [2, 'before'],
    'max-len': [
      'error', {
        'code': 120,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true
      }
    ]
  }
}
