"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, Inbox, ExternalLink, LogOut } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface AdminSidebarProps {
  pendingCount?: number;
}

export default function AdminSidebar({ pendingCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: "/admin/artifacts",
      label: "Artifacts",
      icon: <Archive className="h-5 w-5 stroke-[2.5px]" />,
    },
    {
      href: "/admin/suggestions",
      label: "Suggestions",
      icon: <Inbox className="h-5 w-5 stroke-[2.5px]" />,
      badge: pendingCount,
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r-4 border-black bg-neo-bg flex flex-col">
      {/* Logo */}
      <div className="border-b-4 border-black p-5">
        <div className="bg-black px-3 py-2 inline-block">
          <span className="font-black text-white text-xs uppercase tracking-widest">
            Museum
          </span>
        </div>
        <p className="font-black text-xs uppercase tracking-widest text-black/50 mt-2">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 px-3 py-3 border-4 transition-all duration-100",
                "font-black text-sm uppercase tracking-wider",
                active
                  ? "bg-black text-white border-black shadow-neo-sm"
                  : "border-transparent text-black hover:border-black hover:bg-neo-secondary",
              ].join(" ")}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-neo-accent border-2 border-black text-black font-black text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="border-t-4 border-black p-4 space-y-2">
        <Link
          href="/gallery"
          target="_blank"
          className="flex items-center gap-3 px-3 py-3 border-4 border-transparent font-black text-sm uppercase tracking-wider text-black hover:border-black hover:bg-neo-bg transition-all duration-100"
        >
          <ExternalLink className="h-5 w-5 stroke-[2.5px]" />
          View Museum
        </Link>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-3 border-4 border-transparent font-black text-sm uppercase tracking-wider text-black hover:border-black hover:bg-neo-accent transition-all duration-100"
          >
            <LogOut className="h-5 w-5 stroke-[2.5px]" />
            Log Out
          </button>
        </form>
      </div>
    </aside>
  );
}
