"use client";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryStore } from "@/store/category";
export default function AccountsTable() {
  const getAccounts = categoryStore((state) => state.getAccounts);
  const accounts = categoryStore((state) => state.accounts);
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nombre</TableHead>
          <TableHead>Tipo de cuenta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account: any) => {
          return (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell>{`${account.account.name}`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
