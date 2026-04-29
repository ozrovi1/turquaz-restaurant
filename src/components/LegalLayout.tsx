import { ReactNode } from "react";
import { legalInfo } from "@/data/legal";

interface LegalLayoutProps {
  title: string;
  intro?: string;
  children: ReactNode;
}

export function LegalLayout({ title, intro, children }: LegalLayoutProps) {
  return (
    <div className="bg-[#081408] text-[#faf8f5] antialiased">
      <section className="px-6 lg:px-10 pt-32 pb-12 max-w-3xl mx-auto">
        <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase mb-3">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-medium mb-4">{title}</h1>
        <p className="text-[#faf8f5]/60 text-sm">Last updated: {legalInfo.lastUpdated}</p>
        {intro && (
          <p className="mt-6 text-[#faf8f5]/85 text-[15px] leading-relaxed">{intro}</p>
        )}
      </section>

      <section className="px-6 lg:px-10 pb-20 max-w-3xl mx-auto legal-prose space-y-8">
        {children}
      </section>
    </div>
  );
}
