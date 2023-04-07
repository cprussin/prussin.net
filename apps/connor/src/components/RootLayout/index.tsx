import { Analytics } from "@vercel/analytics/react";
import { FC, ReactNode } from "react";

export type Props = Readonly<{ children: ReactNode }>;

export const RootLayout: FC<Props> = ({ children }) => (
  <>
    <html lang="en">
      <body className="h-screen bg-gradient-to-tr from-emerald-800 to-cyan-900 text-slate-200">
        {children}
      </body>
    </html>
    <Analytics />
  </>
);
