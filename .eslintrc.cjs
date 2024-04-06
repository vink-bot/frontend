module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "max-len": "off",
    quotes: ["error", "single"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "off" // Отключение правила
  }
};
