module.exports = {
  parser: "@typescript-eslint/parser",
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "never"]
  }
}
