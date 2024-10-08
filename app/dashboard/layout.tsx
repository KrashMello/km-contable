import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Link from "next/link";
import ModalsGroups from "@/components/ui/ModalsGroups";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import ModalAccount from "@/components/modals/account";
import ModalTransaction from "@/components/modals/transaction";

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
    title: "Inicio",
    to: "/dashboard",
    icon: (
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
      </svg>
    ),
  },
  {
    title: "Estados",
    to: "/dashboard/estados",
    icon: (
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.412-.587T3 19V4q0-.425.288-.712T4 3t.713.288T5 4v15h15q.425 0 .713.288T21 20t-.288.713T20 21zm2-3q-.425 0-.712-.288T6 17v-7q0-.425.288-.712T7 9h2q.425 0 .713.288T10 10v7q0 .425-.288.713T9 18zm5 0q-.425 0-.712-.288T11 17V5q0-.425.288-.712T12 4h2q.425 0 .713.288T15 5v12q0 .425-.288.713T14 18zm5 0q-.425 0-.712-.288T16 17v-3q0-.425.288-.712T17 13h2q.425 0 .713.288T20 14v3q0 .425-.288.713T19 18z"
        />
      </svg>
    ),
  },
  {
    title: "Cuentas",
    to: "/dashboard/cuentas",
    icon: (
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5h-8q-1.775 0-2.887 1.113T9 9v6q0 1.775 1.113 2.888T13 19h8q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm3-3.5q.65 0 1.075-.425T17.5 12t-.425-1.075T16 10.5t-1.075.425T14.5 12t.425 1.075T16 13.5"
        />
      </svg>
    ),
  },
];

const bodyClass = "bg-slate-200 min-h-screen font-sans antialiased";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let accounts = await fetch(`${process.env.API_URL}/category/account`, {
    method: "GET",
    headers: {
      "x-access-id": String(getCookie("auth", { cookies })),
    },
  });
  accounts = await accounts.json();
  let typeTransations = await fetch(
    `${process.env.API_URL}/transaction/types`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  typeTransations = await typeTransations.json();

  return (
    <body className={cn(bodyClass, fontHeading.variable, fontBody.variable)}>
      <div className="flex justify-between items-center px-8 h-16 max-w-400 max-h-20 md:border">
        <h2 className="text-muted-foreground font-bold">Ahorro Inteligente</h2>
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
        <ModalTransaction />
        <nav className="flex md:hidden bg-primary text-white flex-row gap-5 px-4 h-16 items-center w-full text-sm font-bold fixed bottom-0">
          {menu.map((m, i) => {
            return (
              <Link
                key={i}
                href={m.to}
                className="flex flex-col justify-center items-center text-xs h-full w-20"
              >
                {m.icon}
                {m.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </body>
  );
}
