import { nextjs } from "@prussin.net/tool-configs/src/jest/index.js";

export default nextjs({
  extraGlobalConfig: {
    passWithNoTests: true,
  },
});
