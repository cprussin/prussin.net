import { Analytics } from "@vercel/analytics/react";
import { FC, ReactNode } from "react";

export type Props = Readonly<{ children: ReactNode }>;

export const RootLayout: FC<Props> = ({ children }) => (
  <>
    <html lang="en">
      <body>{children}</body>
    </html>
    <Analytics />
  </>
);
