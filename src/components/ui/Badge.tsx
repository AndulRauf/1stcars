import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive" | "success" | "premium";
  className?: string;
  children?: React.ReactNode;
}

function Badge({ className, variant = "primary", children, ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-200";

  const variants = {
    primary: "bg-[#2E7D32] text-white",
    secondary: "bg-slate-100 text-slate-600 border border-slate-200",
    outline: "border border-slate-300 text-slate-700 bg-transparent",
    destructive: "bg-red-500 text-white shadow-sm shadow-red-500/10",
    success: "bg-emerald-500 text-white shadow-sm shadow-emerald-500/10",
    premium: "bg-amber-500 text-white shadow-sm shadow-amber-500/10",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
