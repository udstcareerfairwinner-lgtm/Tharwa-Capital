import { cn } from "@/lib/utils";

export function IslamicPattern({ className }: { className?: string }) {
  return (
    <svg className={cn("absolute inset-0 w-full h-full opacity-5 text-primary/50", className)} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.7)">
          <path d="M50 10 L60 30 L80 30 L65 42 L70 62 L50 50 L30 62 L35 42 L20 30 L40 30 Z" fill="currentColor" opacity="0.3"/>
          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M0 50 H100 M50 0 V100" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
    </svg>
  );
}
