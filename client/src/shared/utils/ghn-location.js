import axios from "axios";
import API_URL from "@/config";
// Lấy danh sách tỉnh/thành từ GHN
export async function getGHNProvinces() {
  const res = await axios.get(`${API_URL}/api/ship/provinces`);
  return res?.data?.data || [];
}

// Lấy danh sách quận/huyện từ GHN
export async function getGHNDistricts(provinceId) {
  const res = await axios.post(`${API_URL}/api/ship/districts`, {
    provinceId: Number(provinceId),
  });
  return res?.data?.data || [];
}

// Lấy danh sách phường/xã từ GHN
export async function getGHNWards(districtId) {
  const res = await axios.post(`${API_URL}/api/ship/wards`, {
    districtId: Number(districtId),
  });
  return res?.data?.data || [];
}
