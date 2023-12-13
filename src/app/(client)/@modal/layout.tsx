"use client";

import { usePathname } from "next/navigation";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();
  const showDialog = pathname.includes("/images/");

  return <>{showDialog && <>{children}</>}</>;
}
