import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Link from "next/link";

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
    title: "Expenses",
    to: "/dashboard",
  },
  {
    title: "Incomes",
    to: "/dashboard",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={cn(
        "min-h-screen bg-white font-sans antialiased",
        fontHeading.variable,
        fontBody.variable,
      )}
    >
      <div className="flex justify-between items-center px-8 h-10 bg-gray-400 max-w-400 max-h-20 drop-shadow-lg">
        <h2 className="text-white font-bol">KM CONTABLE</h2>
      </div>
      <div className="flex-1 py-2 w-full">
        <nav className="grid items-start px-4 text-sm font-medium">
          {menu.map((m, i) => {
            return (
              <Link key={i} href={m.to} className="text-white font-bold">
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
