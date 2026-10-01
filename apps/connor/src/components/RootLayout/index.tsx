import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";

export const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <>
    <html className="h-full" lang="en">
      <body className="h-full bg-gradient-to-tr from-emerald-800 to-cyan-900 text-slate-200">
        {children}
      </body>
    </html>
    <Analytics />
  </>
);
