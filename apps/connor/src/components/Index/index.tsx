import { FC } from "react";

import { DownloadLink } from "../DownloadLink";
import { ExternalLink } from "../ExternalLink";

export const Index: FC<Record<string, never>> = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-6xl leading-normal">Connor Prussin</h1>
    <div className="flex flex-row">
      <DownloadLink href={"/resume.pdf"}>Resume</DownloadLink>
      <span className="mx-3">|</span>
      <DownloadLink href={"/pubkey.asc"}>PGP public key</DownloadLink>
      <span className="mx-3">|</span>
      <ExternalLink href="https://github.com/cprussin">github</ExternalLink>
    </div>
  </div>
);
