"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      console.log("Wrong credentials");
      return;
    }

    let responseData = await response.json();

    window.cookieStore.set({
      expires: Date.now() + 1000 * 60 * 60,
      name: "auth",
      value: responseData,
      path: "/",
    });
    window.location.replace(`http://${window.location.host}/dashboard`);
  }

  return (
    <Card className="w-full max-w-md p-6 bg-background shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-center">
          <LogInIcon className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-muted-foreground text-center">
          Enter your email and password to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 max-w-md rounded-lg flex py-5 px-2 items-center flex-col"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="outline-none ring-0"
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
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="outline-none ring-0"
                      type="password"
                      placeholder="Enter your password."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function LogInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
