import axios from "axios";
import API_URL from "../../config";

const SUBCATEGORY_LABELS = {
  "ao-so-mi": "Áo sơ mi",
  "ao-thun": "Áo thun",
  "quan-jean": "Quần jean",
  "ao-khoac": "Áo khoác",
  vay: "Váy",
  "quan-tay": "Quần tây",
};

export const dashboardService = {
  getTopProducts: async (limit = 5) => {
    const res = await axios.get(
      `${API_URL}/api/stats/sold-products?limit=${limit}`
    );
    return res.data;
  },

  getRecentOrders: async (limit = 5) => {
    const res = await axios.get(`${API_URL}/api/admin/orders?limit=${limit}`);
    return res.data;
  },

  getOrderStats: async () => {
    const res = await axios.get(`${API_URL}/api/stats/order-stats`);
    const data = res.data;
    return [
      { name: "Hoàn thành", value: data.delivered || 0, color: "#10b981" },
      { name: "Chờ xử lý", value: data.pending || 0, color: "#f59e0b" },
      { name: "Đã hủy", value: data.cancelled || 0, color: "#ef4444" },
      { name: "Đã xác nhận", value: data.confirmed || 0, color: "#3b82f6" },
      { name: "Đang giao", value: data.shipped || 0, color: "#3b82f6" },
    ];
  },

  getTopCategories: async (limit = 5) => {
    const res = await axios.get(
      `${API_URL}/api/stats/top-categories?limit=${limit}`
    );
    const data = res.data;
    return data.map((item) => ({
      category: SUBCATEGORY_LABELS[item.subcategory] || item.subcategory,
      revenue: item.revenue,
    }));
  },

  getMonthlyRevenue: async () => {
    const res = await axios.get(`${API_URL}/api/stats/monthly-stats`);
    const data = res.data;
    return data.map((item) => ({
      month: `T${item.month}`,
      revenue: item.totalRevenue,
      orders: item.totalOrders,
    }));
  },

  getOverviewStats: async () => {
    const res = await axios.get(`${API_URL}/api/stats/overview-stats`);
    const data = res.data;
    return {
      totalRevenue: data.totalRevenue || 0,
      revenueGrowth: data.revenueGrowth || 0,
      totalOrders: data.totalOrders || 0,
      ordersGrowth: data.ordersGrowth || 0,
      totalProducts: data.totalProducts || 0,
      productsGrowth: data.productsGrowth || 0,
    };
  },
};
