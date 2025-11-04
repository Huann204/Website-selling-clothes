import React, { useContext } from "react";
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
  UserStar,
  MessageSquare,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@admin/context/AuthContext";
export default function AdminSidebar({ activeLabel = "Tổng quan" }) {
  const mainNav = [
    { label: "Tổng quan", icon: LayoutDashboard, to: "/admin" },
    { label: "Đơn hàng", icon: ShoppingBag, to: "/admin/orders" },
    { label: "Sản phẩm", icon: Package, to: "/admin/products" },
    { label: "Danh mục", icon: Layers, to: "/admin/categories" },
    { label: "Khách hàng", icon: Users, to: "/admin/customers" },
    { label: "Tin nhắn", icon: MessageSquare, to: "/admin/messages" },
    {
      label: "Quản lý quản trị viên",
      icon: UserStar,
      to: "/admin/manage-admins",
    },
    { label: "Khuyến mãi", icon: Tag, to: "/admin/promotions" },
    { label: "Phân tích", icon: BarChart3, to: "/admin/analytics" },
  ];

  const systemNav = [
    { label: "Cài đặt", icon: Settings, to: "/admin/settings" },
  ];
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };
  return (
    <aside className="sticky top-0 h-screen lg:w-72 shrink-0 border-r border-slate-200 bg-white text-slate-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0">
        <div className="relative">
          <img
            className="h-10 w-10 rounded-lg"
            src="https://cdn-icons-png.freepik.com/512/9703/9703596.png"
            alt=""
          />
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
      <div className="mx-4 mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 flex-shrink-0">
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

      {/* Nav groups - Scrollable */}
      <nav className="px-2 text-sm flex-1 overflow-y-auto overflow-x-hidden pb-2">
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

      {/* Footer*/}
      <div className="border-t border-slate-200 p-3 bg-white flex-shrink-0">
        <div
          onClick={handleLogout}
          className="group relative flex items-center gap-3 rounded-xl px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-slate-200">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-sm">Đăng xuất</span>
          <span className="ml-auto text-xs text-slate-500 opacity-0 transition group-hover:opacity-100">
            Ctrl + L
          </span>
        </div>
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
        to={item.to}
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
