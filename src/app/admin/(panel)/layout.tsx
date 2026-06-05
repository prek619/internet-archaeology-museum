import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Internet Archaeology Museum",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const pendingCount = await db.suggestion.count({
    where: { status: "PENDING" },
  });

  return (
    <div className="min-h-screen bg-neo-bg flex">
      <AdminSidebar pendingCount={pendingCount} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
