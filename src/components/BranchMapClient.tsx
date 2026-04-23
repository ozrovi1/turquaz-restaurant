"use client";

import dynamic from "next/dynamic";

const BranchMap = dynamic(() => import("@/components/BranchMap").then((m) => ({ default: m.BranchMap })), {
  ssr: false,
  loading: () => <div className="w-full h-[320px] sm:h-[400px] rounded-2xl bg-[#0d1f0d] animate-pulse" />,
});

interface BranchMapClientProps {
  center: [number, number];
  branchName: string;
  logoUrl: string;
  address?: string;
}

export function BranchMapClient(props: BranchMapClientProps) {
  return <BranchMap {...props} />;
}
