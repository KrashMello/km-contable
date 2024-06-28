import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const colors = {
  green: ["bg-green-400", "bg-green-600"],
  red: ["bg-red-400", "bg-red-600"],
  yellow: ["bg-yellow-400", "bg-yellow-600"],
  default: ["bg-gray-400", "bg-gray-600"],
};
type color = keyof typeof colors;

const InfoBox = ({
  color = "default",
  title = "title",
  amount = 0,
  currency = "$",
}: {
  color: color;
  title: string;
  amount: number;
  currency: string;
}) => {
  return (
    <Card
      x-chunk="dashboard-01-chunk-0"
      className="bg-primary text-primary-foreground"
    >
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{`${currency}${amount}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
      <CardFooter>
        <Progress
          value={amount}
          aria-label="25% increase"
          className="bg-primary-foreground/20"
        />
      </CardFooter>
    </Card>
  );
};
export default InfoBox;
