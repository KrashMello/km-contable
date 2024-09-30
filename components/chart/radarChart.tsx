"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { transactionStore } from "@/store";
import { useEffect } from "react";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const description = "A radar chart with dots";

const getAllAccountAmount = transactionStore(
  (state) => state.getAllAmountExpenses,
);
const chartData = transactionStore((state) => state.allExpensesTypes);
useEffect(() => {
  getAllAccountAmount();
}, [getAllAccountAmount]);
export function RadarCharts() {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-72 "
      >
        <RadarChart data={chartData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="name" />
          <PolarGrid />
          <Radar
            dataKey="total_amount"
            fill="var(--color-amount)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  );
}
