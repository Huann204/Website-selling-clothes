import React, { useState } from "react";
import { ArrowLeft, Save, Menu, X } from "lucide-react";
import AdminSidebar from "@admin/components/Layout/AdminSidebar";
import { Link } from "react-router-dom";

export default function AdminLayout({
  children,
  title,
  onSave,
  loading = false,
  saveText = "Lưu",
  showBackButton = true,
  backTo = "/admin",
  abortHidden,
  activeLabel = "Sản phẩm",
  showSaveButton = true,
  customActions = null,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      {/* Static sidebar on desktop */}
      <div className="hidden lg:block">
        <AdminSidebar activeLabel={activeLabel} />
      </div>

      {/* Sidebar mobile overlay */}
      <div
        className={`lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 overflow-y-auto`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 lg:hidden flex-shrink-0">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <AdminSidebar activeLabel={activeLabel} />
      </div>

      {/* Main */}
      <main className="flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              {showBackButton && (
                <Link
                  to={backTo}
                  className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Trở lại
                </Link>
              )}
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {abortHidden === true ? (
                ""
              ) : (
                <Link to={backTo}>
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                    Huỷ
                  </button>
                </Link>
              )}

              {/* Custom actions hoặc save button */}
              {customActions ? (
                customActions
              ) : showSaveButton ? (
                <button
                  onClick={onSave}
                  disabled={loading}
                  className="inline-flex items-center justify-center lg:gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {loading ? "Đang xử lý..." : saveText}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-5 sm:py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
