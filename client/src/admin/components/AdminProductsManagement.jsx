import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Package,
  Tag,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { AdminLayout } from "./Layout/LayoutAdmin";
import { Link } from "react-router-dom";
import ConfirmModal from "./shared/ConfirmModal";
import { AuthContext } from "../context/AuthContext";

export default function AdminProductsManagement() {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { admin } = useContext(AuthContext);
  const token = admin?.token;
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }),
    [token]
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducts(result.products);
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout
        title="Quản lý sản phẩm"
        activeLabel="Sản phẩm"
        backTo="/admin"
        showSaveButton={false}
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600">Đang tải danh sách sản phẩm...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout
        title="Quản lý sản phẩm"
        activeLabel="Sản phẩm"
        backTo="/admin"
        showSaveButton={false}
      >
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Có lỗi xảy ra
          </h3>
          <p className="text-slate-600">{error.message}</p>
        </div>
      </AdminLayout>
    );
  }

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${productToDelete._id}`,
        {
          method: "DELETE",
          headers,
        }
      );

      if (!res.ok) throw new Error("Xóa sản phẩm thất bại");

      setProducts(products.filter((p) => p._id !== productToDelete._id));
    } catch (err) {
      alert(err.message);
    } finally {
      setConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  const formatPrice = (v) =>
    new Intl.NumberFormat("vi-VN").format(Number(v)) + "₫";

  function getTotalStock(product) {
    return product.variants.reduce((sumVariant, variant) => {
      const stockByVariant = variant.sizes.reduce(
        (sumSize, size) => sumSize + size.stock,
        0
      );
      return sumVariant + stockByVariant;
    }, 0);
  }

  const lockVn = (time) => {
    const date = new Date(time);
    return (
      date.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) +
      " " +
      date.toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    );
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "" || product.isActive === (statusFilter === "active");

    return matchesSearch && matchesCategory && matchesStatus;
  });
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setConfirmOpen(true);
  };

  return (
    <AdminLayout
      title="Quản lý sản phẩm"
      activeLabel="Sản phẩm"
      backTo="/admin"
      showSaveButton={false}
      customActions={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Lọc</span>
          </button>
          <Link
            to="/admin/products/create"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Thêm sản phẩm</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, thương hiệu, tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tất cả danh mục</option>
                  <option value="for-her">For Her</option>
                  <option value="for-him">For Him</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-slate-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="active">Đang bán</option>
                  <option value="inactive">Ẩn</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tổng sản phẩm</p>
                <p className="text-xl font-semibold text-slate-900">
                  {products.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Tag className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Đang bán</p>
                <p className="text-xl font-semibold text-slate-900">
                  {products.filter((p) => p.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Package className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Hết hàng</p>
                <p className="text-xl font-semibold text-slate-900">
                  {products.filter((p) => getTotalStock(p) === 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tồn kho</p>
                <p className="text-xl font-semibold text-slate-900">
                  {products.reduce((sum, p) => sum + getTotalStock(p), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products List - Desktop Table */}
        <div className="hidden lg:block rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                    Danh mục
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                    Giá
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                    Tồn kho
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-600">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <img
                            src={
                              product.thumbnail?.src || "/api/placeholder/48/48"
                            }
                            alt={product.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 truncate">
                            {product.title}
                          </div>
                          <div className="text-sm text-slate-500">
                            {product.brand || "No Brand"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {!product.salePrice && (
                          <div className="font-medium text-slate-900">
                            {formatPrice(product.price)}
                          </div>
                        )}
                        {product.salePrice && (
                          <div>
                            <div className="font-medium text-slate-900">
                              {formatPrice(product.salePrice)}
                            </div>
                            <div className=" text-slate-500 line-through">
                              {formatPrice(product.price)}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-slate-900">
                          {getTotalStock(product)}
                        </div>
                        <div className="text-slate-500">
                          {product.variants.length} biến thể
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          product.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.isActive ? "Đang bán" : "Ẩn"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {lockVn(product.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100 hover:border-slate-400">
                          <Eye className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100 hover:border-slate-400"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="rounded-lg border border-slate-300 p-2 text-red-600 hover:bg-red-100 hover:border-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <ConfirmModal
                          open={confirmOpen}
                          onClose={() => setConfirmOpen(false)}
                          onConfirm={handleConfirmDelete}
                          message={`Bạn có chắc muốn xoá sản phẩm "${productToDelete?.title}" không?`}
                        />
                        <button className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100 hover:border-slate-400">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products List - Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-16 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <img
                    src={product.thumbnail?.src || "/api/placeholder/64/64"}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {product.brand || "No Brand"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                      {product.category}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.isActive ? "Đang bán" : "Ẩn"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Giá:</span>
                  <span className="text-sm font-medium text-slate-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Tồn kho:</span>
                  <span className="text-sm font-medium text-slate-900">
                    {getTotalStock(product)} ({product.variants.length} biến
                    thể)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Ngày tạo:</span>
                  <span className="text-sm text-slate-600">
                    {lockVn(product.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100">
                    <Eye className="h-4 w-4" />
                  </button>
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="rounded-lg border border-slate-300 p-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <ConfirmModal
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onConfirm={handleConfirmDelete}
                    message={`Bạn có chắc muốn xoá sản phẩm "${productToDelete?.title}" không?`}
                  />
                  <button className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-100">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Không có sản phẩm
            </h3>
            <p className="text-slate-600">
              {searchTerm || categoryFilter || statusFilter
                ? "Không tìm thấy sản phẩm phù hợp với bộ lọc."
                : "Chưa có sản phẩm nào được tạo."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-6">
            <div className="text-slate-600">
              Hiển thị 1–{filteredProducts.length} trên{" "}
              {filteredProducts.length}
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
