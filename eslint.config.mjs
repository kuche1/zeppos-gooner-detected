import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts"],
  extends: [tseslint.configs.base],
  languageOptions: { parserOptions: { projectService: true } },
  rules: { "@typescript-eslint/no-unnecessary-condition": "error" },
});
