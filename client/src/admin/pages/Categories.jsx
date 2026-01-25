import React, { useState } from "react";
import { AdminLayout } from "@admin/components/Layout/LayoutAdmin";
import {
  Plus,
  Search,
  Edit,
  Tag,
  FolderTree,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@admin/utils/axios";
import LoadingAdmin from "@admin/components/shared/LoadingAdmin";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "for-her",
    status: true,
  });
  const queryClient = useQueryClient();

  // Fetch subcategories
  const { data: subcategories = [], isLoading } = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const res = await api.get("/api/subcategories");
      return res.data;
    },
  });

  // Create subcategory
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/subcategories", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      setIsModalOpen(false);
      setFormData({ name: "", category: "for-her", status: true });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Tạo danh mục thất bại");
    },
  });

  // Update subcategory
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/api/subcategories/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      setIsModalOpen(false);
      setEditingSubcategory(null);
      setFormData({ name: "", category: "for-her", status: true });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Cập nhật danh mục thất bại");
    },
  });

  const handleOpenModal = (subcategory = null) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
      setFormData({
        name: subcategory.name,
        category: subcategory.category,
        status: subcategory.status,
      });
    } else {
      setEditingSubcategory(null);
      setFormData({ name: "", category: "for-her", status: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubcategory(null);
    setFormData({ name: "", category: "for-her", status: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên danh mục");
      return;
    }

    if (editingSubcategory) {
      updateMutation.mutate({
        id: editingSubcategory._id,
        data: {
          name: formData.name,
          category: formData.category,
          status: formData.status,
        },
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredSubcategories = subcategories.filter((sub) => {
    const matchesSearch = sub.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || sub.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <AdminLayout
        title="Quản lý danh mục"
        activeLabel="Danh mục"
        showBackButton={false}
        showSaveButton={false}
      >
        <LoadingAdmin />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Quản lý danh mục"
      activeLabel="Danh mục"
      showBackButton={false}
      showSaveButton={false}
      customActions={
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Thêm danh mục</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả danh mục chính</option>
                <option value="for-her">For Her</option>
                <option value="for-him">For Him</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderTree className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tổng danh mục</p>
                <p className="text-xl font-semibold text-slate-900">
                  {subcategories.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Đang hoạt động</p>
                <p className="text-xl font-semibold text-slate-900">
                  {subcategories.filter((sub) => sub.status === true).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories Table */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tên danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Danh mục chính
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredSubcategories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <Tag className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">
                        {searchTerm
                          ? "Không tìm thấy danh mục"
                          : "Chưa có danh mục nào"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredSubcategories.map((subcategory) => (
                    <tr key={subcategory._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-900">
                            {subcategory.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {subcategory.category === "for-her"
                            ? "For Her"
                            : subcategory.category === "for-him"
                              ? "For Him"
                              : "Unisex"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">
                          {subcategory.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {subcategory.status ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="h-3 w-3" />
                            Không hoạt động
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {new Date(subcategory.createdAt).toLocaleDateString(
                          "vi-VN",
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleOpenModal(subcategory)}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingSubcategory
                  ? "Chỉnh sửa danh mục"
                  : "Thêm danh mục mới"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tên danh mục <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tên danh mục"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Danh mục chính <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="for-her">For Her</option>
                  <option value="for-him">For Him</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={true}>Hoạt động</option>
                  <option value={false}>Không hoạt động</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Đang xử lý..."
                    : editingSubcategory
                      ? "Cập nhật"
                      : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Categories;
