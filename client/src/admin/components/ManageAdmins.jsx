import React, { useState, useEffect, useMemo, useContext } from "react";
import AdminLayout from "./Layout/AdminLayout";
import { AuthContext } from "../context/AuthContext";
import { Plus, Pencil, Trash2, RefreshCw, Shield } from "lucide-react";

export default function ManageAdmins() {
  const { admin } = useContext(AuthContext);
  const token = admin?.token;

  const API_BASE = "http://localhost:5000/api";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [saving, setSaving] = useState(false);

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }),
    [token]
  );

  async function fetchAdmins() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/admins`, { headers });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data?.message || "Không tải được danh sách quản trị viên"
        );
      setItems(Array.isArray(data) ? data : data?.items || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q)
    );
  }, [items, search]);

  function openCreate() {
    setForm({ name: "", email: "", password: "", role: "admin" });
    setIsCreateOpen(true);
  }

  function openEdit(user) {
    setCurrentEdit(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "admin",
    });
    setIsEditOpen(true);
  }

  async function handleCreate(e) {
    e?.preventDefault?.();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/admin/admins`, {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Không tạo được quản trị viên");
      setIsCreateOpen(false);
      await fetchAdmins();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(e) {
    e?.preventDefault?.();
    if (!currentEdit?._id) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/admins/${currentEdit._id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          email: form.email,
          password: form.password || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Cập nhật thất bại");
      setIsEditOpen(false);
      setCurrentEdit(null);
      await fetchAdmins();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(user) {
    if (!window.confirm(`Xoá quản trị viên "${user.email}"?`)) return;
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/admins/${user._id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Xoá thất bại");
      await fetchAdmins();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleToggleActive(user) {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/admins/${user._id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ active: !user.active }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Cập nhật trạng thái thất bại");
      await fetchAdmins();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <AdminLayout
      title="Quản lý quản trị viên"
      backTo="/admin"
      showBackButton={false}
      abortHidden={true}
      showSaveButton={false}
      activeLabel="Quản lý quản trị viên"
      customActions={
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" /> Thêm quản trị viên
        </button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            Quản lý tài khoản quản trị hệ thống
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên, email, vai trò..."
                className="w-full sm:w-72 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-300 focus:outline-none"
              />
            </div>
            <button
              onClick={fetchAdmins}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" /> Tải lại
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Mobile list */}
        <div className="sm:hidden space-y-3">
          {loading ? (
            <div className="px-2 py-6 text-center text-slate-500">
              Đang tải...
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-2 py-6 text-center text-slate-500">
              Không có dữ liệu
            </div>
          ) : (
            filtered.map((u) => (
              <div
                key={u._id || u.email}
                className="rounded-xl border border-slate-200 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-base">
                      {u.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {u.name || "(Không tên)"}
                      </div>
                      <div className="text-xs text-slate-600">{u.email}</div>
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium bg-sky-100 text-sky-700">
                        <Shield className="h-3 w-3" /> {u.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        u.active === false
                          ? "bg-slate-100 text-slate-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {u.active === false ? "Tạm khoá" : "Hoạt động"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(u)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs hover:bg-slate-50"
                      >
                        {u.active === false ? "Mở khoá" : "Khoá"}
                      </button>
                      <button
                        onClick={() => openEdit(u)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Xoá
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Tên
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Vai trò
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-500"
                  >
                    Đang tải...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-500"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u._id || u.email}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                          {u.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                        {u.name || "(Không tên)"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          u.role === "superadmin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-sky-100 text-sky-700"
                        }`}
                      >
                        <Shield className="h-3.5 w-3.5" /> {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          u.active === false
                            ? "bg-slate-100 text-slate-600"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {u.active === false ? "Tạm khoá" : "Hoạt động"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(u)}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs hover:bg-slate-50"
                        >
                          {u.active === false ? "Mở khoá" : "Khoá"}
                        </button>

                        <button
                          onClick={() => openEdit(u)}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs hover:bg-slate-50"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          className="inline-flex items-center gap-1 rounded-xl bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateOpen && (
        <Modal
          onClose={() => setIsCreateOpen(false)}
          title="Thêm quản trị viên"
        >
          <AdminForm
            form={form}
            setForm={setForm}
            saving={saving}
            onClose={() => setIsCreateOpen(false)}
            onSubmit={handleCreate}
          />
        </Modal>
      )}

      {isEditOpen && (
        <Modal
          onClose={() => setIsEditOpen(false)}
          title="Cập nhật quản trị viên"
        >
          <AdminForm
            form={form}
            setForm={setForm}
            saving={saving}
            onSubmit={handleUpdate}
            onClose={() => setIsEditOpen(false)}
            isEdit
          />
        </Modal>
      )}
    </AdminLayout>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-3 text-lg font-semibold">{title}</div>
        {children}
      </div>
    </div>
  );
}

function AdminForm({
  form,
  setForm,
  onSubmit,
  saving,
  isEdit = false,
  onClose,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Họ tên
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-300 focus:outline-none"
            placeholder="Nguyễn Văn A"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-300 focus:outline-none"
            placeholder="admin@example.com"
            required
          />
        </div>
      </div>
      {!isEdit && (
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Mật khẩu
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-300 focus:outline-none"
            placeholder="Tối thiểu 6 ký tự"
            required
          />
        </div>
      )}
      {isEdit && (
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Đặt lại mật khẩu (tuỳ chọn)
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-300 focus:outline-none"
            placeholder="Để trống nếu không đổi"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Vai trò
        </label>
        <select
          value={form.role}
          onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-300 focus:outline-none"
        >
          <option value="admin">admin</option>
          <option value="superadmin">superadmin</option>
        </select>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
        >
          Huỷ
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo mới"}
        </button>
      </div>
    </form>
  );
}
