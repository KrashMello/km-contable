import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { LineCharts } from "@/components/chart/lineChart";
import { PieCharts } from "@/components/chart/pieChart";
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
export default async function Estate() {
  let expenses = await fetch(
    `${process.env.API_URL}/transaction/getAllExpenses`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  expenses = await expenses.json();
  let incomes = await fetch(
    `${process.env.API_URL}/transaction/getAllIncomes`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Fecha</TableHead>
                    <TableHead>Importe</TableHead>
                    <TableHead className="text-right">Descripcion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense: any) => {
                    return (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">
                          {format(expense.date_entry, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>{`${expense.account.currency.abbreviation} ${expense.amount}`}</TableCell>
                        <TableCell className="text-right">
                          {expense.description}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Fecha</TableHead>
                    <TableHead>Importe</TableHead>
                    <TableHead className="text-right">Descripcion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomes.map((income: any) => {
                    return (
                      <>
                        <TableRow key={income.id}>
                          <TableCell className="font-medium">
                            {format(income.date_entry, "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell>{`${income.account.currency.abbreviation} ${income.amount}`}</TableCell>
                          <TableCell className="text-right">
                            {income.description}
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
