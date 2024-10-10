"use client";
import { format } from "date-fns";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { accountStore, transactionStore } from "@/store";
import { categoryStore } from "@/store/category";

const FormSchema = z
  .object({
    dateEntry: z.union([z.date(), z.string()]),
    description: z.string(),
    amount: z.string().min(1, { message: "El monto es requerido" }),
    typeId: z
      .string()
      .min(1, { message: "El tipo de Transaccion es requerida" }),
    categoryId: z.string().min(1, { message: "La cuenta es requerida" }),
    categoryDebitId: z.string(),
  })
  .required({
    dateEntry: true,
    amount: true,
    typeId: true,
    categoryId: true,
  });

export default function ModalTransaction() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateEntry: new Date(),
      amount: "",
      description: "",
      typeId: "",
      categoryId: "",
      categoryDebitId: "",
    },
  });
  const getAccounts = accountStore((state) => state.getAccount);
  const getCategories = categoryStore((state) => state.getCategories);
  const getType = transactionStore((state) => state.getType);
  const createTransaction = transactionStore(
    (state) => state.createTransaction,
  );
  const accounts = accountStore((state) => state.accounts);
  const transactionTypes = transactionStore((state) => state.types);
  const categories = categoryStore((state) => state.categories);
  useEffect(() => {
    getAccounts();
    getType();
    getCategories();
  }, [getAccounts, getType, getCategories]);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [errors, setErrors]: [
    {
      description?: string;
      amount?: string;
      categoryId?: string;
      categoryDebitId?: string;
      typeId?: string;
      date_entry?: string;
    },
    any,
  ] = useState({});
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    data.dateEntry = format(data.dateEntry, "yyyy-MM-dd");
    if (selectedType === "2") {
      const aux = data.categoryId;
      data.categoryId = data.categoryDebitId;
      data.categoryDebitId = aux;
    }
    delete data.typeId;
    let [status, result] = await createTransaction(data);
    if (status !== 200) {
      setErrors(result.message);
      return;
    } else {
      setOpen(false);
      form.reset();
      setSelectedType("");
    }
  }
  return (
    <div className="fixed right-5 bottom-[32px] flex flex-col z-50 items-end justify-end gap-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="focus-visible:ring-0 focus-visible:outline-none border rounded-full size-14 border-muted">
            +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaccion</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6 max-w-md rounded-lg flex py-5 px-2 items-center flex-col"
              >
                <FormField
                  control={form.control}
                  name="dateEntry"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as Date}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.date_entry ? (
                        <FormMessage>{errors.date_entry}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Importe</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el importe" {...field} />
                      </FormControl>
                      {errors.amount ? (
                        <FormMessage>{errors.amount}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="typeId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tipo de Transaccion</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedType(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="seleccione el tipo de transaccion" />
                          </SelectTrigger>
                          <SelectContent>
                            {transactionTypes.map((type: any) => {
                              return (
                                <SelectItem key={type.id} value={`${type.id}`}>
                                  {type.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {errors.typeId ? (
                        <FormMessage>{errors.typeId}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cuenta</FormLabel>
                      <FormControl>
                        {accounts.length > 0 ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="seleccione un tipo de cuenta" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account: any) => {
                                return (
                                  <SelectItem
                                    key={window.crypto.randomUUID()}
                                    value={`${account.id}`}
                                  >
                                    {account.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        ) : (
                          <h4>Debe registrar una cuenta</h4>
                        )}
                      </FormControl>
                      {errors.accountId ? (
                        <FormMessage>{errors.accountId}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                {selectedType === "2" && (
                  <FormField
                    control={form.control}
                    name="categoryDebitId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Categoria</FormLabel>
                        <FormControl>
                          {accounts.length > 0 ? (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="seleccione un tipo de cuenta" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category: any) => {
                                  return (
                                    <SelectItem
                                      key={window.crypto.randomUUID()}
                                      value={`${category.id}`}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          ) : (
                            <h4>Debe registrar una categoria</h4>
                          )}
                        </FormControl>
                        {errors.accountId ? (
                          <FormMessage>{errors.categoryDebitId}</FormMessage>
                        ) : (
                          <FormMessage />
                        )}
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripcion" {...field} />
                      </FormControl>
                      {errors.description ? (
                        <FormMessage>{errors.description}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
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
