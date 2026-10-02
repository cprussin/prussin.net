import type { Metadata } from "next";

import manifest from "../public/manifest.json";

export const rootMetadata: Metadata = {
  applicationName: manifest.name,
  description: manifest.description,
  manifest: "/manifest.json",
  title: {
    default: manifest.name,
    template: `${manifest.name} | %s`,
  },
};
