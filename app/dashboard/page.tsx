import Pipe from "@/components/chart/pipe";
import ModalsGroups from "@/components/ui/ModalsGroups";
import LineChart from "@/components/ui/chartLine";
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
  let incomes = 0;

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
  console.log(typeTransations);
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
        <InfoBox title="Other" color="yellow" amount={5000} currency="$" />
      </div>
      <div className="flex flex-wrap gap-5 md:justify-between w-full">
        <div className="overflow-hidden w-full bg-slate-700 text-slate-200  rounded-lg">
          <div className="w-full h-10 bg-gray-400  px-3 items-center flex">
            <h3 className="text-lg font-semibold">Expenses</h3>
          </div>
          <LineChart></LineChart>
        </div>
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <div className="w-full h-10 bg-gray-400 text-white px-3 items-center flex">
            <h3 className="text-lg font-semibold">Expenses</h3>
          </div>
          <Table className="text-slate-200 bg-slate-700">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 md:justify-between w-full">
        <div className="w-full overflow-hidden rounded-lg">
          <div className="w-full h-10 bg-gray-400 text-white px-3 items-center flex">
            <h3 className="text-lg font-semibold">Incomes</h3>
          </div>
          <Pipe></Pipe>
        </div>
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <div className="w-full h-10 bg-gray-400 text-white px-3 items-center flex">
            <h3 className="text-lg font-semibold">Incomes</h3>
          </div>
          <Table className="text-slate-200 bg-slate-700">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
