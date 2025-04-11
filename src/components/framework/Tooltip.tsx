import {
  Tooltip as T,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProps } from "@/shared";

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <TooltipProvider>
      <T delayDuration={800}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p className="select-none">{content}</p>
        </TooltipContent>
      </T>
    </TooltipProvider>
  );
}
