"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function ModalsGroups() {
  return (
    <div className="fixed left-[-25px] bottom-[32px] flex flex-col z-50 items-end justify-end w-screen  gap-8 h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-slate-200 bg-slate-700 focus-visible:ring-0 focus-visible:outline-none border rounded-full size-14 border-muted">
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-700 text-slate-200 rounded-lg">
          <DialogHeader>Ingresos</DialogHeader>
          <div>
            <Label>asdf</Label>
            <Input className="focus-visible:outline-none focus-visible:ring-0 text-slate-700" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
