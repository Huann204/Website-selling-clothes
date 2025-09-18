import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Tag,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sidebar tĩnh cho trang Admin bán quần áo (chủ đạo màu trắng)
// Tailwind-only, không phụ thuộc shadcn để tránh lỗi alias
export default function AdminSidebar({ activeLabel = "Tổng quan" }) {
  const mainNav = [
    { label: "Tổng quan", icon: LayoutDashboard, href: "#" },
    { label: "Đơn hàng", icon: ShoppingBag, href: "#" },
    { label: "Sản phẩm", icon: Package, href: "/admin/products" },
    { label: "Danh mục", icon: Layers, href: "#" },
    { label: "Khách hàng", icon: Users, href: "#" },
    { label: "Khuyến mãi", icon: Tag, href: "#" },
    { label: "Phân tích", icon: BarChart3, href: "#" },
  ];

  const systemNav = [{ label: "Cài đặt", icon: Settings, href: "#" }];

  return (
    <aside className="sticky top-0 h-screen lg:w-72 shrink-0 border-r border-slate-200 bg-white text-slate-800">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="relative">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-400 to-indigo-500 shadow-[0_0_30px_-12px_rgba(14,165,233,0.6)]" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>
        <div className="leading-tight">
          <div className="text-base font-semibold tracking-wide">
            Fashion Admin
          </div>
          <div className="text-[11px] uppercase text-slate-500 tracking-wider">
            Control Center
          </div>
        </div>
      </div>

      {/* Store status */}
      <div className="mx-4 mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-700">Cửa hàng</span>
          <span className="text-xs rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
            Online
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-2/3 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500" />
        </div>
      </div>

      {/* Nav groups */}
      <nav className="px-2 text-sm">
        <GroupTitle>Quản lý</GroupTitle>
        <ul className="space-y-1">
          {mainNav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              active={item.label === activeLabel}
            />
          ))}
        </ul>

        <GroupTitle className="mt-5">Hệ thống</GroupTitle>
        <ul className="space-y-1">
          {systemNav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              active={item.label === activeLabel}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-3 bg-white">
        <a
          href="#"
          className="group relative flex items-center gap-3 rounded-xl px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-slate-200">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-sm">Đăng xuất</span>
          <span className="ml-auto text-xs text-slate-500 opacity-0 transition group-hover:opacity-100">
            Ctrl + L
          </span>
        </a>
      </div>
    </aside>
  );
}

function GroupTitle({ children, className = "" }) {
  return (
    <div
      className={`px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 ${className}`}
    >
      {children}
    </div>
  );
}

function NavItem({ item, active }) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        to={item.href}
        aria-current={active ? "page" : undefined}
        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 ${
          active ? "bg-slate-100 ring-1 ring-slate-200" : ""
        }`}
      >
        {/* Active indicator bar */}
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1.5 rounded-full bg-sky-500" />
        )}

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 ${
            active ? "ring-1 ring-slate-200" : "group-hover:bg-slate-200"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-sm font-medium">{item.label}</span>

        {/* Badge demo cho Đơn hàng */}
        {item.label === "Đơn hàng" && (
          <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 group-hover:bg-slate-200">
            99+
          </span>
        )}
      </Link>
    </li>
  );
}

// --- Gợi ý sử dụng (tham khảo):
// import AdminSidebar from "./AdminSidebar";
// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex">
//       <AdminSidebar activeLabel="Tổng quan" />
//       <main className="min-h-screen flex-1 bg-slate-50 text-slate-900">
//         {children}
//       </main>
//     </div>
//   );
// }
