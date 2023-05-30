module.exports = {
  'ignorePatterns': ['/*', '!/src'],
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': 'tsconfig.json',
    'sourceType': 'module',
  },
  'plugins': ['@typescript-eslint'],
  'rules': {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};
