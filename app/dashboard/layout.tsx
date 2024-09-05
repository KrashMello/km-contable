import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Link from "next/link";
import ModalsGroups from "@/components/ui/ModalsGroups";

const fontHeading = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  variable: "--font-heading",
});

const fontBody = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "KM Contable App | dashboard",
  description: "accounting application",
};

const menu = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Status",
    to: "/dashboard",
  },
  {
    title: "Accounts",
    to: "/dashboard",
  },
];

const bodyClass = "bg-slate-200 min-h-screen font-sans antialiased";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={cn(bodyClass, fontHeading.variable, fontBody.variable)}>
      <div className="flex justify-between items-center px-8 h-16 max-w-400 max-h-20 md:border">
        <h2 className="text-muted-foreground font-bold">KM CONTABLE</h2>
      </div>
      <div className="flex flex-row w-full">
        <nav className="hidden md:flex bg-muted/40 flex-col gap-2 p-4 w-80 text-sm font-medium border-r border-muted">
          {menu.map((m, i) => {
            return (
              <Link key={i} href={m.to} className="text-muted-foreground">
                {m.title}
              </Link>
            );
          })}
        </nav>
        {children}
      </div>
    </body>
  );
}
