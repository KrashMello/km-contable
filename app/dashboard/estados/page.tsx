import { format } from "date-fns";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadarCharts } from "@/components/chart/radarChart";
import { BarCharts } from "@/components/chart/barChart";
import { ExpensesTable } from "@/components/tables/expenses";
import { IncomesTable } from "@/components/tables/incomes";
export default async function Estate() {
  let incomes = await fetch(`${process.env.API_URL}/transaction/getIncomes`, {
    method: "GET",
    headers: {
      "x-access-id": String(getCookie("auth", { cookies })),
    },
  });
  incomes = await incomes.json();
  return (
    <main className="w-full px-4 md:px-12 pt-8 pb-20 flex flex-col gap-4 ">
      <Tabs defaultValue="incomes">
        <TabsList>
          <TabsTrigger value="incomes">Ingresos</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <div className="flex flex-wrap gap-5 md:justify-between w-full">
            <div className="w-full h-10  px-3 items-center flex">
              <h3 className="text-lg font-semibold">Gastos</h3>
            </div>
            <div className="w-full md:w-[55%]">
              <RadarCharts />
            </div>
            <div className="w-full md:w-2/5 ">
              <ExpensesTable />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="incomes">
          <div className="flex flex-wrap gap-5 md:justify-between w-full">
            <div className="w-full h-10  px-3 items-center flex">
              <h3 className="text-lg font-semibold">Ingresos</h3>
            </div>
            <div className="w-full md:w-2/5">
              <BarCharts />
            </div>
            <div className="w-full md:w-[55%]">
              <IncomesTable />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
