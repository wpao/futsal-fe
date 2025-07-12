import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

// interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
//   align?: "start" | "center" | "end";
// }

// const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
//   ({ className, align = "start", ...props }, ref) => (
//     <div
//       ref={ref}
//       className={cn(
//         "flex items-center gap-2 p-6 pt-0",
//         align === "center" && "justify-center",
//         align === "end" && "justify-end",
//         className,
//       )}
//       {...props}
//     />
//   ),
// );
// CardAction.displayName = "CardAction";

interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "between";
  className?: string;
}

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, align = "between", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 p-6 pt-0",
        align === "center" && "justify-center",
        align === "end" && "justify-end",
        align === "between" && "justify-between",
        align === "start" && "justify-start",
        className,
      )}
      {...props}
    />
  ),
);
CardAction.displayName = "CardAction";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardAction,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
