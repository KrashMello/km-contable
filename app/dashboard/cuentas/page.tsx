import ModalAccount from "@/components/modals/account";
import AccountsTable from "@/components/tables/accounts";

export default function Cuentas() {
  return (
    <div className="flex flex-col w-full gap-5">
      <ModalAccount />
      <AccountsTable />
    </div>
  );
}
