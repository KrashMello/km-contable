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
export default function CategoriesTable() {
  const getCategories = categoryStore((state) => state.getCategories);
  const categories = categoryStore((state) => state.categories);
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nombre</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((categories: any) => {
          return (
            <TableRow key={categories.id}>
              <TableCell className="font-medium">{categories.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
