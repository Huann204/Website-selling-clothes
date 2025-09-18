import React, { useEffect, useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

export default function AdminProductsManagement() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleRemove = async (id) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setProducts(products.filter((p) => p._id !== id));
    console.log(data);
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
  return (
    <div className="flex min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Static sidebar on desktop */}
      <div className="hidden lg:block">
        <AdminSidebar activeLabel="Sản phẩm" />
      </div>

      {/* Mobile sidebar drawer */}
      <div
        className={`lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 lg:hidden">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <AdminSidebar activeLabel="Sản phẩm" />
      </div>

      {/* Backdrop when drawer open */}
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Đóng overlay"
        />
      )}

      {/* Main */}
      <main className="flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                  aria-label="Mở menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Quản lý sản phẩm
                </h1>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-80">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    placeholder="Tìm theo tên, SKU, tag..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm outline-none ring-sky-100 focus:border-sky-300 focus:ring"
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                  <Filter className="h-4 w-4" /> Lọc
                </button>
                <Link to={`/admin/products/create`}>
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
                    <Plus className="h-4 w-4" /> Thêm sản phẩm
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats (tĩnh) */}
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard title="Tổng sản phẩm" value={products.length} />
            <StatCard
              title="Đang bán"
              value={products.filter((p) => p.isActive).length}
            />
            <StatCard title="Cảnh báo tồn kho" value="1" />
          </div>
        </div>

        {/* Mobile list (thay bảng ở <sm) */}
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 pb-6 sm:hidden">
          <ul className="space-y-3">
            {/* Card 1 */}
            <li className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex items-start gap-3">
                <div className="h-20 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <img
                    src="https://res.cloudinary.com/dghdbbkfc/image/upload/v1757948193/prd100.1.ea575dff749c96bbd379_xqmoc9.jpg"
                    alt="Unum Tank"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">Unum Tank</div>
                      <div className="text-xs text-slate-500">
                        No Brand · #db7a
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Đang bán
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-emerald-700">
                      199.000₫
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      499.000₫
                    </span>
                    <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                      -60%
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span>for her</span>
                    <span className="text-slate-300">•</span>
                    <span>ao-thun</span>
                    <span className="text-slate-300">•</span>
                    <span>2 màu, 7 size</span>
                    <span className="text-slate-300">•</span>
                    <span>Tồn: 24</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <IconButton title="Xem">
                      <Eye className="h-4 w-4" />
                    </IconButton>
                    <IconButton title="Sửa">
                      <Edit className="h-4 w-4" />
                    </IconButton>
                    <IconButton tone="danger" title="Xoá">
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                    <IconButton title="Thêm">
                      <MoreVertical className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </li>

            {/* Card 2 */}
            <li className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex items-start gap-3">
                <div className="h-20 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <img
                    src="https://dummyimage.com/300x400/eee/aaa.jpg&text=Product"
                    alt="Tee Basic"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">Tee Basic</div>
                      <div className="text-xs text-slate-500">
                        No Brand · #a1b2
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        Ẩn
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold">249.000₫</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span>for him</span>
                    <span className="text-slate-300">•</span>
                    <span>ao-thun</span>
                    <span className="text-slate-300">•</span>
                    <span>3 màu, 5 size</span>
                    <span className="text-slate-300">•</span>
                    <span>Tồn: 112</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <IconButton title="Xem">
                      <Eye className="h-4 w-4" />
                    </IconButton>
                    <IconButton title="Sửa">
                      <Edit className="h-4 w-4" />
                    </IconButton>
                    <IconButton tone="danger" title="Xoá">
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                    <IconButton title="Thêm">
                      <MoreVertical className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Table (ẩn ở mobile, hiện từ sm trở lên) */}
        <div className="hidden sm:block w-full px-4 sm:px-6 lg:px-8 2xl:px-10 pb-6">
          <div className="rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-[840px] w-full divide-y divide-slate-200 bg-white text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <Th> Sản phẩm </Th>
                    <Th> Danh mục </Th>
                    <Th> Giá </Th>
                    <Th> Biến thể </Th>
                    <Th> Tồn kho </Th>
                    <Th> Trạng thái </Th>
                    <Th> Cập nhật </Th>
                    <Th className="text-right"> Thao tác </Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products &&
                    products.map((product) => (
                      <tr key={product._id} className="hover:bg-slate-50/60">
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-14 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                              <img
                                src={product.hoverImage.src}
                                alt={product.hoverImage.alt}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{product.title}</div>
                              <div className="text-xs text-slate-500">
                                {product.brand} · #db7a
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                          <div className="flex flex-col">
                            <span className="capitalize">
                              {product.category}
                            </span>
                            <span className="text-xs text-slate-500">
                              {product.subcategory}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-emerald-700">
                              {formatPrice(product.salePrice)}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                              {100 -
                                Math.floor(
                                  (product.salePrice / product.price) * 100
                                ) +
                                "%"}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                          <div className="flex items-center gap-2">
                            <span>{product.variants.length} màu</span>
                            <span className="text-slate-400">·</span>
                            <span>4 size</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {getTotalStock(product)}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                              Thấp
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {product.isActive ? (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                              Đang bán
                            </span>
                          ) : (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                              Ẩn
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                          {lockVn(product.createdAt)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1">
                            <IconButton title="Xem">
                              <Eye className="h-4 w-4" />
                            </IconButton>
                            <Link to={`/admin/products/edit/${product._id}`}>
                              <IconButton title="Sửa">
                                <Edit className="h-4 w-4" />
                              </IconButton>
                            </Link>
                            <IconButton
                              tone="danger"
                              title="Xoá"
                              onClick={() => handleRemove(product._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </IconButton>
                            <IconButton title="Thêm">
                              <MoreVertical className="h-4 w-4" />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {/* Row mẫu 1 */}
                  <tr className="hover:bg-slate-50/60">
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <img
                            src="https://res.cloudinary.com/dghdbbkfc/image/upload/v1757948193/prd100.1.ea575dff749c96bbd379_xqmoc9.jpg"
                            alt="Unum Tank - chính"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Unum Tank</div>
                          <div className="text-xs text-slate-500">
                            No Brand · #db7a
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      <div className="flex flex-col">
                        <span className="capitalize">for her</span>
                        <span className="text-xs text-slate-500">ao-thun</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-emerald-700">
                          199.000₫
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          499.000₫
                        </span>
                        <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                          -60%
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span>2 màu</span>
                        <span className="text-slate-400">·</span>
                        <span>7 size</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">24</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                          Thấp
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Đang bán
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      15/09/2025 22:03:23
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <IconButton title="Xem">
                          <Eye className="h-4 w-4" />
                        </IconButton>
                        <IconButton title="Sửa">
                          <Edit className="h-4 w-4" />
                        </IconButton>
                        <IconButton tone="danger" title="Xoá">
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                        <IconButton title="Thêm">
                          <MoreVertical className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>

                  {/* Row mẫu 2 */}
                  <tr className="hover:bg-slate-50/60">
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <img
                            src="https://dummyimage.com/300x400/eee/aaa.jpg&text=Product"
                            alt="Sản phẩm khác"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Tee Basic</div>
                          <div className="text-xs text-slate-500">
                            No Brand · #a1b2
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      <div className="flex flex-col">
                        <span className="capitalize">for him</span>
                        <span className="text-xs text-slate-500">ao-thun</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="font-semibold">249.000₫</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span>3 màu</span>
                        <span className="text-slate-400">·</span>
                        <span>5 size</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="font-medium">112</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        Ẩn
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      10/09/2025 09:10:00
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <IconButton title="Xem">
                          <Eye className="h-4 w-4" />
                        </IconButton>
                        <IconButton title="Sửa">
                          <Edit className="h-4 w-4" />
                        </IconButton>
                        <IconButton tone="danger" title="Xoá">
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                        <IconButton title="Thêm">
                          <MoreVertical className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination (tĩnh) */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-slate-50 px-4 py-3 text-sm">
              <div className="text-slate-600">Hiển thị 1–2 trên 10</div>
              <div className="flex items-center gap-2">
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 ${className}`}
    >
      {children}
    </th>
  );
}

function IconButton({ children, tone, title, onClick }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
        tone === "danger"
          ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
