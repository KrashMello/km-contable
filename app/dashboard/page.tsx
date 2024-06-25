import Pipe from "@/components/chart/pipe";
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
export default async function Home() {
  return (
    <main className="w-full px-12 py-8 flex flex-col gap-4 ">
      <div className="w-full flex justify-between ">
        <InfoBox title="Income" color="green" amount={5000} currency="$" />
        <InfoBox title="Expenses" color="red" amount={5000} currency="$" />
        <InfoBox title="Other" color="yellow" amount={5000} currency="$" />
      </div>
      <div className="flex justify-between w-full">
        <div className="overflow-hidden rounded-lg w-[45%]">
          <div className="w-full h-10 bg-gray-400 text-white px-3 items-center flex">
            <h3 className="text-lg font-semibold">Expenses</h3>
          </div>
          <Pipe></Pipe>
        </div>
        <div className="w-[45%] h-64 overflow-hidden rounded-lg">
          <div className="w-full h-10 bg-gray-400 text-white px-3 items-center flex">
            <h3 className="text-lg font-semibold">Expenses</h3>
          </div>
          <Table>
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
      <div className="flex justify-between w-full">
        <div className="overflow-hidden rounded-lg w-[45%]">
          <div className="w-full h-10 bg-gray-400 text-white px-3 items-center flex">
            <h3 className="text-lg font-semibold">Incomes</h3>
          </div>
          <Pipe></Pipe>
        </div>
        <div className="w-[45%] h-64 overflow-hidden rounded-lg">
          <div className="w-full h-10 bg-gray-400 text-white px-3 items-center flex">
            <h3 className="text-lg font-semibold">Incomes</h3>
          </div>
          <Table>
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
