import type { LinkWithIconProps } from "../LinkWithIcon";
import { LinkWithIcon } from "../LinkWithIcon";
import ExternalLinkIcon from "./external-link.svg";

export const ExternalLink = (props: Omit<LinkWithIconProps, "Icon">) => (
  <LinkWithIcon Icon={ExternalLinkIcon} target="_blank" {...props} />
);
