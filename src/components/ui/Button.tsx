import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full text-sm font-bold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.97]";

    const variants = {
      primary:
        "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-[1px]",
      secondary:
        "bg-white text-slate-900 border border-slate-200/80 shadow-xs hover:bg-slate-50 hover:shadow-md hover:-translate-y-[1px]",
      outline:
        "border-2 border-primary text-primary bg-transparent hover:bg-primary/5 hover:-translate-y-[1px]",
      ghost:
        "text-slate-700 hover:bg-slate-100 hover:text-primary",
      link:
        "text-primary underline-offset-4 hover:underline bg-transparent p-0",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20 hover:shadow-xl hover:-translate-y-[1px]",
    };

    const sizes = {
      sm: "h-9 px-5 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-sm",
      icon: "h-11 w-11",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
