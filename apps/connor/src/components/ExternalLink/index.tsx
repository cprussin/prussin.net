import type { LinkWithIconProps } from "../LinkWithIcon";
import ExternalLinkIcon from "./external-link.svg";
import { LinkWithIcon } from "../LinkWithIcon";

export const ExternalLink = (props: Omit<LinkWithIconProps, "Icon">) => (
  <LinkWithIcon Icon={ExternalLinkIcon} target="_blank" {...props} />
);
