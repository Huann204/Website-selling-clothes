import axios from "axios";
import API_URL from "@/config";
export async function calcGHNFee(districtId, wardCode) {
  const payload = {
    toDistrictId: Number(districtId),
    toWardCode: String(wardCode),
  };

  try {
    const res = await axios.post(`${API_URL}/api/ship/calc-fee`, payload);
    const data = res.data;
    if (res.status !== 200 || data.code !== 200) {
      throw new Error(data.message || "Không thể tính phí ship");
    }

    return data?.data?.total || 20000;
  } catch (error) {
    console.error("Lỗi khi gọi GHN API:", error);
    return 20000;
  }
}

// Tạo đơn hàng trên GHN
export async function createGHNOrder(orderData) {
  try {
    const res = await axios.post(`${API_URL}/api/ship/create-order`, orderData);
    const data = res.data;
    if (res.status !== 200 || data.code !== 200) {
      throw new Error(data.message || "Không thể tạo đơn hàng trên GHN");
    }
    return data.data;
  } catch (error) {
    console.error("Lỗi khi tạo đơn GHN:", error);
    throw error;
  }
}
