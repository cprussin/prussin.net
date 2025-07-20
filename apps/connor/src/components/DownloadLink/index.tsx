import type { LinkWithIconProps } from "../LinkWithIcon";
import DownloadLinkIcon from "./download-link.svg";
import { LinkWithIcon } from "../LinkWithIcon";

export const DownloadLink = (props: Omit<LinkWithIconProps, "Icon">) => (
  <LinkWithIcon Icon={DownloadLinkIcon} {...props} />
);
