import Sidebar from "@/components/dashboard/Sidebar";
import MobileNav from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-light flex h-screen overflow-hidden bg-[#F6F7F9] text-[#0F172A]">
      {/* Fixed sidebar (desktop) */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile drawer + hamburger trigger */}
      <MobileNav />

      {/* Scrolling content column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

