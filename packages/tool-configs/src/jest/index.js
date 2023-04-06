import { createRequire } from "node:module";
import { dirname } from "node:path";

import nextJest from "next/jest.js";

const createNextJestConfig = nextJest({ dir: "./" });

const resolve = createRequire(import.meta.url).resolve;

const coverage = {
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  coverageReporters: ["json", "lcov", "text", "cobertura"],
  collectCoverageFrom: ["**/*.ts"],
};

const unitTest = (extraConfig = {}) => ({
  displayName: {
    name: "unit-test",
    color: "blue",
  },
  ...extraConfig,
});

const format = async (extraConfig = {}) => ({
  displayName: {
    name: "format",
    color: "white",
  },
  preset: dirname(resolve("jest-runner-prettier/jest-preset.js")),
  testMatch: ["<rootDir>/**/*"],
  ...extraConfig,
});

// TODO re-enable this once fixes for the following two issues land upstream:
// - `jest-runner-eslint` doesn't support eslint flat config format:
//   https://github.com/jest-community/jest-runner-eslint/issues/166
// - `create-jest-runner` doesn't work when next.js configs are enabled:
//   https://github.com/jest-community/create-jest-runner/issues/201
// const lint = async (extraConfig = {}) => ({
//     displayName: {
//         name: "lint",
//         color: "magenta",
//     },
//     runner: resolve("jest-runner-eslint"),
//     testMatch: ["**/*"],
//     ...extraConfig
// });

const sharedBase = async ({
  extraUnitTestConfig,
  extraFormatConfig,
  // TODO re-enable, see above
  // extraLintConfig,
  extraGlobalConfig,
  wrapUnitTest,
} = {}) => {
  const unitTestConfigUnwrapped = unitTest(extraUnitTestConfig);
  const unitTestConfig = wrapUnitTest
    ? await wrapUnitTest(unitTestConfigUnwrapped)
    : unitTestConfigUnwrapped;

  return {
    ...coverage,
    ...extraGlobalConfig,
    projects: [
      unitTestConfig,
      await format(extraFormatConfig),
      // TODO re-enable, see above
      // await lint(extraLintConfig)
    ],
  };
};

export const base = async (config = {}) =>
  sharedBase({
    ...config,
    wrapUnitTest: (config) => ({
      ...config,
      preset: "ts-jest",
    }),
  });

export const nextjs = async (config = {}) =>
  sharedBase({
    ...config,
    wrapUnitTest: async (config) => createNextJestConfig(config)(),
    extraUnitTestConfig: {
      testEnvironment: resolve("jest-environment-jsdom"),
      setupFilesAfterEnv: [resolve("@testing-library/jest-dom")],
      ...config.extraUnitTestConfig,
    },
  });
