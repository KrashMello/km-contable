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
import { Calendar } from "./calendar";
import { getCookie } from "cookies-next";
import { useState } from "react";

const FormSchema = z
  .object({
    dateEntry: z.date(),
    description: z.string(),
    amount: z.string().min(1, { message: "El monto es requerido" }),
    typeId: z
      .string()
      .min(1, { message: "El tipo de Transaccion es requerida" }),
    accountId: z.string().min(1, { message: "La cuenta es requerida" }),
  })
  .required({
    dateEntry: true,
    amount: true,
    typeId: true,
    accountId: true,
  });

export default function ModalsGroups(props: {
  accounts: any;
  typeTransations: any;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateEntry: new Date(),
      amount: "",
      description: "",
      typeId: "",
      accountId: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    data.dateEntry = format(data.dateEntry, "yyyy-MM-dd");
    let result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/incomesAndExpenses/`,
      {
        method: "POST",
        headers: {
          "x-access-id": String(getCookie("auth")),
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const status = await result.status;
    result = await result.json();
    if (status !== 200) {
      setErrors(result.message);
      return;
    } else {
      setOpen(false);
    }
  }
  return (
    <div className="fixed left-[-25px] bottom-[32px] flex flex-col z-50 items-end justify-end w-screen  gap-8 h-screen">
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
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cuenta</FormLabel>
                      <FormControl>
                        {props.accounts.length > 0 ? (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="seleccione un tipo de cuenta" />
                            </SelectTrigger>
                            <SelectContent>
                              {props.accounts.map((account: any) => {
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
                      <FormMessage />
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="seleccione el tipo de transaccion" />
                          </SelectTrigger>
                          <SelectContent>
                            {props.typeTransations.map((type: any) => {
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
