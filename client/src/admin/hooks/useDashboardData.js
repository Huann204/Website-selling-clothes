import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export const useDashboardData = () => {
  const topProducts = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => dashboardService.getTopProducts(),
  });

  const recentOrders = useQuery({
    queryKey: ["recentOrders"],
    queryFn: () => dashboardService.getRecentOrders(),
  });

  const orderStats = useQuery({
    queryKey: ["orderStats"],
    queryFn: () => dashboardService.getOrderStats(),
  });

  const categoryData = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => dashboardService.getTopCategories(),
  });

  const revenueData = useQuery({
    queryKey: ["revenueData"],
    queryFn: () => dashboardService.getMonthlyRevenue(),
  });

  const overviewStats = useQuery({
    queryKey: ["overviewStats"],
    queryFn: () => dashboardService.getOverviewStats(),
  });

  const isLoading =
    topProducts.isLoading ||
    recentOrders.isLoading ||
    orderStats.isLoading ||
    categoryData.isLoading ||
    revenueData.isLoading ||
    overviewStats.isLoading;

  return {
    topProducts: topProducts.data,
    recentOrders: recentOrders.data,
    orderStats: orderStats.data,
    categoryData: categoryData.data,
    revenueData: revenueData.data,
    stats: overviewStats.data,
    isLoading,
  };
};
