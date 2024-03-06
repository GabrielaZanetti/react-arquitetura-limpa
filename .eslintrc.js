module.exports = {
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": [
    "standard-with-typescript",
    "plugin:react/recommended"
  ],
  "plugins": ["react"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/strinct-boolean-expressins": "off",
    "react/jsx-user-react": "error",
    "react/jsx-user-vars": "error"
  }
}