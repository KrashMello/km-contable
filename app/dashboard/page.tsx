import { BarCharts } from "@/components/chart/barChart";
import { RadarCharts } from "@/components/chart/radarChart";
import InfoBox from "@/components/ui/info-box";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
export default async function Home() {
  let Incomes: any = await fetch(
    `${process.env.API_URL}/transaction/getAllMountsIncomes`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  Incomes = await Incomes.json();
  let Expenses: any = await fetch(
    `${process.env.API_URL}/transaction/getAllMountsExpenses`,
    {
      method: "GET",
      headers: {
        "x-access-id": String(getCookie("auth", { cookies })),
      },
    },
  );
  Expenses = await Expenses.json();

  return (
    <main className="w-full px-4 md:px-12 pt-8 pb-16 flex flex-col gap-4 ">
      <div className="flex flex-wrap gap-5 w-full">
        {/* <InfoBox */}
        {/*   title="Ingresos" */}
        {/*   color="red" */}
        {/*   amount={data[1] ? data[1].total_amount : 0} */}
        {/*   currency="$" */}
        {/* /> */}
        {/* <InfoBox */}
        {/*   title="Gastos" */}
        {/*   color="green" */}
        {/*   amount={data[0] ? data[0].total_amount : 0} */}
        {/*   currency="$" */}
        {/* /> */}
      </div>
      <div>
        <div className="w-full h-10  px-3 items-center flex">
          <h3 className="text-lg font-semibold">Gastos</h3>
        </div>
        <BarCharts />
        <div className="w-full h-10  px-3 items-center flex">
          <h3 className="text-lg font-semibold">Gastos</h3>
        </div>
        <RadarCharts />
      </div>
    </main>
  );
}
