import type { AnchorHTMLAttributes, ComponentType, SVGProps } from "react";

export type LinkWithIconProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const LinkWithIcon = ({
  children,
  Icon,
  ...props
}: LinkWithIconProps) => (
  <a className="text-zinc-400 hover:text-zinc-100" {...props}>
    <span>{children}</span>
    <Icon className="inline-block h-3 ml-1 fill-current" />
  </a>
);
