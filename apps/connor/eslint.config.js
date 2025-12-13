import path from "node:path";
import { fileURLToPath } from "node:url";

import { nextjs, tailwind } from "@cprussin/eslint-config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = [...nextjs, ...tailwind(`${dirname}/tailwind.config.js`)];

export default config;
