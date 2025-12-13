import path from "node:path";
import { fileURLToPath } from "node:url";

import { base, tailwind, mergeConfigs } from "@cprussin/prettier-config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = mergeConfigs([base, tailwind(`${dirname}/tailwind.config.js`)]);
export default config;
