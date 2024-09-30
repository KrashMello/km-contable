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
export function ExpensesTable() {
  const getExpenses = transactionStore((state) => state.getExpenses);
  const expenses = transactionStore((state) => state.expenses);
  useEffect(() => {
    getExpenses();
  }, [getExpenses]);
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
        {expenses.map((expense: any) => {
          return (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">
                {format(expense.date_entry, "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{`${expense.amount}`}</TableCell>
              <TableCell className="text-right">
                {expense.description}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
