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

const FormSchema = z
  .object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    accountType: z
      .string()
      .min(1, { message: "El tipo de cuenta es requerido" }),
    currencyType: z
      .string()
      .min(1, { message: "El tipo de moneda es requerido" }),
  })
  .required({
    name: true,
    accountType: true,
    currencyType: true,
  });

export default function ModalAccount() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      accountType: "",
      currencyType: "",
    },
  });
  const getCurrency = accountStore((state) => state.getCurrency);
  const getAccountType = accountStore((state) => state.getAccountType);
  const createAccount = accountStore((state) => state.createAccount);
  const currencys = accountStore((state) => state.currency);
  const accountType = accountStore((state) => state.accountType);
  useEffect(() => {
    getCurrency();
    getAccountType();
  }, [getCurrency, getAccountType]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors]: [
    {
      name?: string;
      accountType?: string;
      currencyType?: string;
    },
    any,
  ] = useState({});
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let [status, result] = await createAccount(data);
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
          <Button>Agregar Cuenta</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cuenta</DialogTitle>
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
                  name="accountType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tipo de Cuenta</FormLabel>
                      <FormControl>
                        {accountType.length > 0 ? (
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
                        ) : (
                          <h4>Debe registrar una cuenta</h4>
                        )}
                      </FormControl>
                      {errors.accountType ? (
                        <FormMessage>{errors.accountType}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currencyType"
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
                      {errors.currencyType ? (
                        <FormMessage>{errors.currencyType}</FormMessage>
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
