import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Link from "next/link";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

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
        fontSans.variable,
      )}
    >
      <div className="flex justify-between items-center px-8 h-10 bg-gray-400 max-w-400 max-h-20 drop-shadow-lg">
        <h2 className="text-white font-bol">KM CONTABLE</h2>
      </div>
      <div className="flex min-h-[calc(100vh-40px)] w-full">
        <div className="bg-gray-800 w-64 pt-8 px-8 flex flex-col items-start gap-2 ">
          {menu.map((m, i) => {
            return (
              <Link key={i} href={m.to} className="text-white font-bold">
                {m.title}
              </Link>
            );
          })}
        </div>
        {children}
      </div>
    </body>
  );
}
