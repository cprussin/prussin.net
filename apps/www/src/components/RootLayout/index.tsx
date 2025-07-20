import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";

export const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <>
    <html lang="en">
      <body>{children}</body>
    </html>
    <Analytics />
  </>
);
