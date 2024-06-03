import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-md w-full bg-slate-200 border-slate-600 border-2 rounded-lg flex py-5 px-2 gap-3 items-center flex-col">
        <h2 className="text-3xl font-bold">Login</h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Ingrezar</Button>
      </div>
    </main>
  );
}
