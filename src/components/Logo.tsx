import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  color?: string;
  animated?: boolean;
  className?: string;
}

const Logo = ({ color = "#000000", animated = false, className }: LogoProps) => {
  return (
    <div 
      className={cn(
        `text-2xl font-bold tracking-tighter ${animated ? "glitch-effect" : ""}`,
        className
      )}
      style={{ color }}
    >
      TBE
    </div>
  );
};

export default Logo;
