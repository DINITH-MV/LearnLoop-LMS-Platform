import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
        <CardTitle className="text-xs sm:text-sm font-medium">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};
