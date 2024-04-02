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

  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "max-len": "off",
    quotes: ["error", "single"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "no-unused-vars": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"]
  }
};
