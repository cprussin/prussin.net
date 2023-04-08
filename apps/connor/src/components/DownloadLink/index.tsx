import { FC } from "react";

import DownloadLinkIcon from "./download-link.svg";
import { LinkWithIcon, LinkWithIconProps } from "../LinkWithIcon";

export const DownloadLink: FC<Omit<LinkWithIconProps, "Icon">> = (props) => (
  <LinkWithIcon Icon={DownloadLinkIcon} {...props} />
);
