import ModalAccount from "@/components/modals/account";
import AccountsTable from "@/components/tables/accounts";
import CategoriesTable from "@/components/tables/categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Cuentas() {
  return (
    <main className="w-full px-4 md:px-12 pt-8 pb-20 flex flex-col gap-4">
      <ModalAccount />
      <Tabs defaultValue="Accounts">
        <TabsList>
          <TabsTrigger value="Accounts">Cuentas</TabsTrigger>
          <TabsTrigger value="Categories">Categorias</TabsTrigger>
        </TabsList>
        <TabsContent value="Accounts">
          <AccountsTable />
        </TabsContent>
        <TabsContent value="Categories">
          <CategoriesTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
