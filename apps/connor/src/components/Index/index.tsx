import Link from "next/link";
import { FC } from "react";

export const Index: FC<Record<string, never>> = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-6xl leading-normal">Connor Prussin</h1>
    <div className="flex flex-row">
      <Link
        className={linkStyle}
        href={{ pathname: "/resume.pdf" }}
        target="_blank"
      >
        Resume
      </Link>
      <span className="mx-3">|</span>
      <Link className={linkStyle} href={{ pathname: "/pubkey.asc" }}>
        GPG public key
      </Link>
    </div>
  </div>
);

const linkStyle = "text-zinc-400 hover:text-zinc-100";
