import { base } from "@prussin.net/tool-configs/src/jest/index.js";

export default base({
  extraGlobalConfig: {
    passWithNoTests: true,
  },
  extraUnitTestConfig: {
    testPathIgnorePatterns: ["apps/*", "packages/*"],
  },
});
