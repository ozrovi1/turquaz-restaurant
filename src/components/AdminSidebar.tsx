"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface AdminSidebarProps {
  user: {
    username: string;
    role: string;
    branchSlug: string | null;
  };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  const links = [
    { href: "/admin/dashboard", label: "Reservations" },
    ...(user.role === "admin"
      ? [{ href: "/admin/users", label: "Staff" }]
      : []),
  ];

  return (
    <aside className="w-56 bg-[#0d2a0d] border-r border-[#166534]/15 flex flex-col min-h-screen">
      <div className="p-4 border-b border-[#166534]/15">
        <h2 className="text-[#22c55e] font-medium text-lg">Turquaz</h2>
        <p className="text-[#faf8f5]/50 text-xs mt-0.5">
          {user.role === "admin" ? "Admin" : user.branchSlug}
        </p>
      </div>

      <nav className="flex-1 p-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded text-sm transition-colors ${
              pathname === link.href
                ? "bg-[#166534]/20 text-[#22c55e]"
                : "text-[#faf8f5]/70 hover:text-[#faf8f5] hover:bg-[#faf8f5]/5"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#166534]/15">
        <p className="text-[#faf8f5]/50 text-xs mb-2">{user.username}</p>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
