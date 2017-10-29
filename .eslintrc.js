module.exports = {
  extends: ["@wandiparis/eslint-config-wandi", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "no-magic-numbers": "off"
  }
};
