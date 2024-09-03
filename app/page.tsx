import { Login } from "@/components/form/login";

export default async function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-24">
      <Login />
    </main>
  );
}
