"use client";
import { useEffect } from "react";
import { accountStore } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function AccountsTable() {
  const getAccount = accountStore((state) => state.getAccount);
  const accounts = accountStore((state) => state.accounts);
  useEffect(() => {
    getAccount();
  }, [getAccount]);

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
              <TableCell>{`${account.accountType.name}`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
