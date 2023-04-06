import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import jsonParser from "jsonc-eslint-parser";

const compat = new FlatCompat({
  resolvePluginsRelativeTo: path.dirname(fileURLToPath(import.meta.url)),
});

const extendForFiles = (glob, configs) =>
  compat.extends(...configs).map((config) => ({ files: [glob], ...config }));

export const base = [
  js.configs.recommended,
  ...compat.extends(
    "plugin:import/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "turbo"
  ),
  ...extendForFiles("**/*.ts?(x)", [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:import/typescript",
  ]),
  ...extendForFiles("**/*.test.[tj]s?(x)", [
    "plugin:jest/recommended",
    "plugin:jest/style",
  ]),
  ...extendForFiles("**/*.json", ["plugin:jsonc/recommended-with-json"]),
  {
    settings: {
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"],
      },
    },
    rules: {
      "no-alert": "error",
      "no-console": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            orderImportKind: "asc",
          },
        },
      ],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
    },
  },
  {
    files: ["**/*.ts?(x)"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  {
    files: ["**/*.[jt]s?(x)"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ignores: [
      ".turbo/**/*",
      "coverage/**/*",
      "node_modules/**/*",
      "*.tsbuildinfo",
    ],
  },
];

export const react = [
  ...base,
  ...compat.extends(
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react/recommended"
  ),
  ...extendForFiles("**/*.test.[tj]s?(x)", [
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
  ]),
];

// We have to remove the `import` plugin from the configuration exported by
// nextjs because it conflicts with the plugin we have installed in base.js and
// causes issues.
const nextConfig = compat.extends("next/core-web-vitals").map((cfg) => ({
  ...cfg,
  plugins: Object.fromEntries(
    Object.entries(cfg.plugins ?? {}).filter((plugin) => plugin[0] !== "import")
  ),
}));

export const nextjs = [
  ...react,
  ...nextConfig,
  {
    files: ["**/*.json"],
    languageOptions: { parser: jsonParser },
  },
  {
    ignores: ["next-env.d.ts", ".next/**/*"],
  },
];
