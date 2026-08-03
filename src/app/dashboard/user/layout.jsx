import { User, ShoppingBag, Library, Bookmark } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const links = [
  { href: "/dashboard/user", label: "Profile", icon: User },
  { href: "/dashboard/user/purchases", label: "Purchase History", icon: ShoppingBag },
  { href: "/dashboard/user/library", label: "Purchased Ebooks", icon: Library },
  { href: "/dashboard/user/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export default function UserDashboardLayout({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <DashboardSidebar links={links} title="Reader Dashboard" />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}