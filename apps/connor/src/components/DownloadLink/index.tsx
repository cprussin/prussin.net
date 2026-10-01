import type { LinkWithIconProps } from "../LinkWithIcon";
import { LinkWithIcon } from "../LinkWithIcon";
import DownloadLinkIcon from "./download-link.svg";

export const DownloadLink = (props: Omit<LinkWithIconProps, "Icon">) => (
  <LinkWithIcon Icon={DownloadLinkIcon} {...props} />
);
