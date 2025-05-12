import { PropsWithChildren } from "react";

export const GlassCard = ({ children, className = "" }: PropsWithChildren<{ className?: string }>) => (
  <div className={`relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5 ${className}`}>
    <div className="before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/40 before:rounded-t-2xl" />
    {children}
  </div>
);

export default GlassCard; 