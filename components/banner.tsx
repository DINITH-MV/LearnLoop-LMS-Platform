import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label } from '@/components/ui/label';

const bannerVariants = cva(
  "border text-center px-4 pt-5 pb-3 text-[14pt] flex items-center w-[96%] rounded-[14px]",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-[#eb2727]",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return  (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
