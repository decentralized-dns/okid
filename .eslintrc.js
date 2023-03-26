module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/self-closing-comp": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-no-bind": "off",
    "react/prop-types": "off",
    "react/jsx-fragments": "off",
    'no-plusplus': 'off',
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.stories.*",
          "**/.storybook/**/*.*"
        ],
        "peerDependencies": true
      }
    ]
  },
  ignorePatterns: [
    'build/**/*.js',
    'scripts/*.js',
    'config/*.js',
    'node_modules/*',
    'coverage/*',
    '.eslintrc.js',
    'config-overrides.js',
    'hardhat.config.js',
  ],
};
