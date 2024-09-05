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

export const description = "A radar chart with dots";

const chartData = [
  { account: "comida", amount: 50 },
  { account: "otros", amount: 73 },
  { account: "medicos", amount: 10 },
  { account: "ropa", amount: 37 },
  { account: "cursos", amount: 20 },
  { account: "juegos", amount: 72 },
];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadarCharts() {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-72 "
      >
        <RadarChart data={chartData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="account" />
          <PolarGrid />
          <Radar
            dataKey="amount"
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
