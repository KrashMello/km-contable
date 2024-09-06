"use client";
import { format } from "date-fns";
import { useEffect } from "react";
import { transactionStore } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function IncomesTable() {
  const getIncomes = transactionStore((state) => state.getIncomes);
  const incomes = transactionStore((state) => state.incomes);
  useEffect(() => {
    getIncomes();
  }, [getIncomes]);
  return (
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
  );
}
