"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { accountStore } from "@/store";
import { categoryStore } from "@/store/category";

const FormSchema = z
  .object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    accountId: z.string(),
    currencyId: z.string(),
    transactionTypeId: z
      .string()
      .min(1, { message: "El tipo de moneda es requerido" }),
  })
  .required({
    name: true,
  });

export default function ModalAccount() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      accountId: "",
      transactionTypeId: "",
      currencyId: "",
    },
  });
  const getCurrencyTypes = categoryStore((state) => state.getCurrencyTypes);
  const getAccountsTypes = categoryStore((state) => state.getAccountsTypes);
  const getCategoriesTypes = categoryStore((state) => state.getCategoriesTypes);
  const createCategory = categoryStore((state) => state.createCategory);
  const currencys = categoryStore((state) => state.currencyTypes);
  const accountType = categoryStore((state) => state.accountsTypes);
  const categoriesTypes = categoryStore((state) => state.categoriesTypes);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    getCurrencyTypes();
    getAccountsTypes();
    getCategoriesTypes();
  }, [getCurrencyTypes, getAccountsTypes, getCategoriesTypes]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors]: [
    {
      name?: string;
      accountId?: string;
      transactionTypeId?: string;
      currencyId?: string;
    },
    any,
  ] = useState({});
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let [status, result] = await createCategory(data);
    if (status !== 200) {
      setErrors(result.message);
      return;
    } else {
      setOpen(false);
      form.reset();
    }
  }
  return (
    <div className="flex flex-col items-end justify-end px-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Agregar Categoria</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Categoria</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6 max-w-md rounded-lg flex py-5 px-2 items-center flex-col"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el nombre de la cuenta"
                          {...field}
                        />
                      </FormControl>
                      {errors.name ? (
                        <FormMessage>{errors.name}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transactionTypeId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tipo de Categoria</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            if (value === "2") {
                              form.setValue("currencyId", "");
                              form.setValue("accountId", "");
                            }
                            setSelectedCategory(value);
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="seleccione un tipo de cuenta" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesTypes.map((categoryType: any) => {
                              return (
                                <SelectItem
                                  key={window.crypto.randomUUID()}
                                  value={`${categoryType.id}`}
                                >
                                  {categoryType.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {errors.transactionTypeId ? (
                        <FormMessage>{errors.transactionTypeId}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                {selectedCategory === "1" && (
                  <>
                    <FormField
                      control={form.control}
                      name="accountId"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Tipo de Cuenta</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="seleccione un tipo de cuenta" />
                              </SelectTrigger>
                              <SelectContent>
                                {accountType.map((type: any) => {
                                  return (
                                    <SelectItem
                                      key={window.crypto.randomUUID()}
                                      value={`${type.id}`}
                                    >
                                      {type.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {errors.accountId ? (
                            <FormMessage>{errors.accountId}</FormMessage>
                          ) : (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currencyId"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Tipo de Moneda</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="seleccione el tipo de transaccion" />
                              </SelectTrigger>
                              <SelectContent>
                                {currencys.map((currency: any) => {
                                  return (
                                    <SelectItem
                                      key={currency.id}
                                      value={`${currency.id}`}
                                    >
                                      {currency.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {errors.currencyId ? (
                            <FormMessage>{errors.currencyId}</FormMessage>
                          ) : (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <Button type="submit" className="w-full">
                  Agregar
                </Button>
              </form>
            </Form>{" "}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
