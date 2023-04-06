import type { Metadata } from "next";

import manifest from "../public/manifest.json";

export const rootMetadata: Metadata = {
  title: {
    default: manifest.name,
    template: `${manifest.name} | %s`,
  },
  applicationName: manifest.name,
  description: manifest.description,
  manifest: "/manifest.json",
};
