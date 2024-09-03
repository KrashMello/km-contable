"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
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

const FormSchema = z.object({
  dateEntry: z.string().date(),
  description: z.string(),
  amount: z.number(),
  typeId: z.number().int(),
  accountId: z.number().int(),
});
export default function ModalsGroups(props: {
  accounts: any;
  typeTransations: any;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateEntry: "",
      amount: 0,
      description: "",
      typeId: 0,
      accountId: 0,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="fixed left-[-25px] bottom-[32px] flex flex-col z-50 items-end justify-end w-screen  gap-8 h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-slate-200 bg-slate-700 focus-visible:ring-0 focus-visible:outline-none border rounded-full size-14 border-muted">
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-700 text-slate-200 rounded-lg">
          <DialogHeader>Transaccion</DialogHeader>
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
                    <FormItem className="w-full">
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="focus-visible:outline-none focus-visible:ring-0 text-slate-700"
                          placeholder="Enter your username."
                          {...field}
                        />
                      </FormControl>
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
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="seleccione un tipo de cuenta" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 text-white">
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
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="seleccione el tipo de transaccion" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 text-white">
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
                        <Textarea
                          className="focus-visible:outline-none focus-visible:ring-0 text-slate-700"
                          placeholder="Descripcion"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
