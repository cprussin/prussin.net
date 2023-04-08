import { FC } from "react";

import ExternalLinkIcon from "./external-link.svg";
import { LinkWithIcon, LinkWithIconProps } from "../LinkWithIcon";

export const ExternalLink: FC<Omit<LinkWithIconProps, "Icon">> = (props) => (
  <LinkWithIcon Icon={ExternalLinkIcon} target="_blank" {...props} />
);
