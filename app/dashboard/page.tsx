import { format } from "date-fns";
import { LineCharts } from "@/components/chart/lineChart";
import ModalsGroups from "@/components/ui/ModalsGroups";
import InfoBox from "@/components/ui/info-box";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
export default async function Home() {
  let data: any = await fetch(
    `${process.env.API_URL}/incomesAndExpenses/getAllMounts`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  let accounts = await fetch(`${process.env.API_URL}/account/`, {
    method: "GET",
    headers: {
      "x-access-id": String(getCookie("auth", { cookies })),
    },
  });
  accounts = await accounts.json();
  let typeTransations = await fetch(
    `${process.env.API_URL}/incomesAndExpenses/types`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  typeTransations = await typeTransations.json();
  let expenses = await fetch(
    `${process.env.API_URL}/incomesAndExpenses/getAllExpenses`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  expenses = await expenses.json();
  let incomes = await fetch(
    `${process.env.API_URL}/incomesAndExpenses/getAllIncomes`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  incomes = await incomes.json();
  data = await data.json();
  return (
    <main className="w-full px-4 md:px-12 py-8 flex flex-col gap-4 ">
      <ModalsGroups accounts={accounts} typeTransations={typeTransations} />
      <div className="flex flex-wrap gap-5 w-full">
        <InfoBox
          title="Income"
          color="green"
          amount={data[0].totalAmount}
          currency="$"
        />
        <InfoBox
          title="Expenses"
          color="red"
          amount={data[1].totalAmount}
          currency="$"
        />
      </div>
      <div className="flex flex-wrap gap-5 md:justify-between w-full">
        <div className="overflow-hidden w-full  rounded-lg">
          <LineCharts title="Expenses" />
        </div>
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <div className="w-full h-10  px-3 items-center flex">
            <h3 className="text-lg font-semibold">Expenses</h3>
          </div>
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
                  <>
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">
                        {format(expense.date_entry, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell className="text-right">
                        {expense.description}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 md:justify-between w-full">
        <div className="w-full overflow-hidden rounded-lg">
          <div className="w-full h-10  px-3 items-center flex">
            <h3 className="text-lg font-semibold">Incomes</h3>
          </div>
          {/* <Pipe></Pipe> */}
        </div>
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <div className="w-full h-10  px-3 items-center flex">
            <h3 className="text-lg font-semibold">Incomes</h3>
          </div>
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
                      <TableCell>{income.amount}</TableCell>
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
    </main>
  );
}
