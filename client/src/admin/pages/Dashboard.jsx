import React, { useEffect, useState } from "react";
import AdminLayout from "../components/Layout/AdminLayout";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import API_URL from "../../config";
import { Link } from "react-router-dom";
import LoadingAdmin from "../components/shared/LoadingAdmin";

const Dashboard = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchTopProducts = async () => {
      const res = await fetch(`${API_URL}/api/stats/sold-products?limit=5`);
      const data = await res.json();
      setTopProducts(data);
    };
    fetchTopProducts();
    const fetchRecentOrders = async () => {
      const res = await fetch(`${API_URL}/api/admin/orders?limit=5`);
      const data = await res.json();
      setRecentOrders(data);
    };
    fetchRecentOrders();
    const fetchOrderStats = async () => {
      const res = await fetch(`${API_URL}/api/stats/order-stats`);
      const data = await res.json();
      setOrderStats([
        { name: "Hoàn thành", value: data.delivered, color: "#10b981" },
        { name: "Chờ xử lý", value: data.pending, color: "#f59e0b" },
        { name: "Đã hủy", value: data.cancelled, color: "#ef4444" },
        { name: "Đã xác nhận", value: data.confirmed, color: "#3b82f6" },
        { name: "Đang giao", value: data.shipped, color: "#3b82f6" },
      ]);
    };
    fetchOrderStats();
    const fetchTopCategories = async () => {
      const res = await fetch(`${API_URL}/api/stats/top-categories?limit=5`);
      const data = await res.json();
      const formatSubcategory = {
        "ao-so-mi": "Áo sơ mi",
        "ao-thun": "Áo thun",
        "quan-jean": "Quần jean",
        "ao-khoac": "Áo khoác",
        vay: "Váy",
        "quan-tay": "Quần tây",
      };
      setCategoryData(
        data.map((item) => ({
          category: formatSubcategory[item.subcategory],
          revenue: item.revenue,
        }))
      );
    };
    fetchTopCategories();
    const fetchRevenueData = async () => {
      const res = await fetch(`${API_URL}/api/stats/monthly-stats`);
      const data = await res.json();
      setRevenueData(
        data.map((item) => ({
          month: `T${item.month}`,
          revenue: item.totalRevenue,
          orders: item.totalOrders,
        }))
      );
    };
    fetchRevenueData();
    const fetchAllStats = async () => {
      const res = await fetch(`${API_URL}/api/stats/overview-stats`);
      const data = await res.json();
      console.log(data);
      setStats({
        totalRevenue: data.totalRevenue,
        revenueGrowth: data.revenueGrowth,
        totalOrders: data.totalOrders,
        ordersGrowth: data.ordersGrowth,
        totalProducts: data.totalProducts,
        productsGrowth: data.productsGrowth,
        // totalCustomers: data.totalCustomers,
        // customersGrowth: data.customersGrowth,
      });
    };
    fetchAllStats();
  }, []);
  if (!stats.totalRevenue) {
    return (
      <AdminLayout
        title="Tổng quan"
        activeLabel="Tổng quan"
        showBackButton={false}
      >
        <LoadingAdmin />
      </AdminLayout>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Đã giao",
        icon: CheckCircle,
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Chờ xử lý",
        icon: Clock,
      },
      confirmed: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Đã xác nhận",
        icon: CheckCircle,
      },
      shipped: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Đang giao",
        icon: AlertCircle,
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Đã hủy",
        icon: XCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ title, value, icon: Icon, growth, color }) => {
    const isPositive = growth >= 0;
    const GrowthIcon = isPositive ? ArrowUpRight : ArrowDownRight;

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1 truncate">
              {title}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 truncate">
              {value}
            </h3>
            <div className="flex items-center gap-1 flex-wrap">
              <GrowthIcon
                className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              />
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(growth)}%
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500">
                so với tháng trước
              </span>
            </div>
          </div>
          <div
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0 ${color}`}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  // theme tooltip cho các chart
  const chartTooltipStyle = {
    background: "linear-gradient(180deg, #0b1220, #0f1724)",
    color: "#e6eef8",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10,
    boxShadow: "0 8px 24px rgba(2,6,23,0.6)",
    padding: "8px 12px",
    fontSize: 12,
  };

  return (
    <AdminLayout
      title="Tổng quan"
      activeLabel="Tổng quan"
      showBackButton={false}
      showSaveButton={false}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            Chào mừng trở lại!
          </h1>
          <p className="text-sm sm:text-base text-blue-100">
            Đây là tổng quan về hoạt động kinh doanh của bạn
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <StatCard
            title="Tổng doanh thu"
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
            growth={stats.revenueGrowth}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Đơn hàng"
            value={stats.totalOrders}
            icon={ShoppingCart}
            growth={stats.ordersGrowth}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Sản phẩm"
            value={stats.totalProducts}
            icon={Package}
            growth={stats.productsGrowth}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          {/* <StatCard
            title="Khách hàng"
            value={stats.totalCustomers.toLocaleString()}
            icon={Users}
            growth={stats.customersGrowth}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          /> */}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  Doanh thu & Đơn hàng
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Theo dõi xu hướng 10 tháng gần nhất
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 w-fit">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  2025
                </span>
              </div>
            </div>
            <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="min-w-[300px]">
                <ResponsiveContainer
                  width="100%"
                  height={250}
                  className="sm:h-[300px]"
                >
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorOrders"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      style={{ fontSize: "10px" }}
                    />
                    <YAxis stroke="#64748b" style={{ fontSize: "10px" }} />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                      labelStyle={{ color: "#93c5fd", fontWeight: 700 }}
                      itemStyle={{ color: "#e6eef8" }}
                      formatter={(value, name) => {
                        if (name === "revenue")
                          return [formatCurrency(value), "Doanh thu"];
                        return [value.toLocaleString(), "Đơn hàng"];
                      }}
                    />
                    <Legend
                      formatter={(value) => {
                        if (value === "revenue") return "Doanh thu";
                        return "Đơn hàng";
                      }}
                      wrapperStyle={{ fontSize: "12px" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Trạng thái đơn hàng
              </h2>
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={orderStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  labelStyle={{ color: "#93c5fd", fontWeight: 700 }}
                  itemStyle={{ color: "#e6eef8" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {orderStats.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs sm:text-sm text-slate-700">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Revenue Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Doanh thu theo danh mục
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Top danh mục bán chạy nhất
              </p>
            </div>
          </div>
          <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="min-w-[300px]">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="category"
                    stroke="#64748b"
                    style={{ fontSize: "10px" }}
                  />
                  <YAxis stroke="#64748b" style={{ fontSize: "10px" }} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={{ color: "#93c5fd", fontWeight: 700 }}
                    itemStyle={{ color: "#e6eef8" }}
                    formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  >
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Đơn hàng gần đây
              </h2>
              <Link
                to="/admin/orders"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 flex-shrink-0"
              >
                Xem tất cả
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider pb-3 whitespace-nowrap">
                        Mã đơn
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider pb-3 whitespace-nowrap px-2">
                        Khách hàng
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider pb-3 whitespace-nowrap px-2">
                        Số tiền
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider pb-3 whitespace-nowrap px-2">
                        Trạng thái
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider pb-3 whitespace-nowrap">
                        Ngày
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-medium text-slate-900">
                            {order._id}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-2 whitespace-nowrap">
                          <span className="text-xs sm:text-sm text-slate-700">
                            {order.customer?.name}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-2 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-semibold text-slate-900">
                            {formatCurrency(order.grandTotal)}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-2">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-[10px] sm:text-sm text-slate-500">
                            {new Date(order.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Sản phẩm bán chạy
              </h2>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 truncate mb-1">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-500 flex-wrap">
                      <span>Đã bán: {product.totalSold}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(product.revenue)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Thao tác nhanh
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Link
              to="/admin/products/create"
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 group-hover:text-blue-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-blue-700 text-center">
                Thêm sản phẩm
              </span>
            </Link>
            <Link
              to="/admin/orders"
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 group-hover:text-green-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-green-700 text-center">
                Quản lý đơn hàng
              </span>
            </Link>
            {/* <Link
              to="/admin/customers"
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50 transition-colors group"
            >
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 group-hover:text-purple-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-purple-700 text-center">
                Khách hàng
              </span>
            </Link> */}
            <Link
              to="/admin/products"
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-500 hover:bg-orange-50 transition-colors group"
            >
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 group-hover:text-orange-600 mb-2" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-orange-700 text-center">
                Xem sản phẩm
              </span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
