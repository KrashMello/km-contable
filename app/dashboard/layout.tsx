import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "KM Contable App | dashboard",
  description: "accounting application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="flex justify-center items-center h-10 bg-violet-400 max-w-400 max-h-20 shadow-md">
          <h2 className="text-white font-bold ">Bienvenidos</h2>
        </div>
        <div className="flex h-full min-h-full w-full">
          <div className="bg-gray-800 w-[20%] pt-8 pl-12">
            <h3 className="text-white font-bold">Home</h3>
            <h3 className="text-white font-bold">Questions</h3>
            <h3 className="text-white font-bold">Tags</h3>
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
