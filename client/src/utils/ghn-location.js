const GHN_TOKEN = "d8959273-a8ee-11f0-bdaf-ae7fa045a771";
const GHN_SHOP_ID = 197612;
import axios from "axios";
// Lấy danh sách tỉnh/thành từ GHN
export async function getGHNProvinces() {
  const res = await axios.get(
    `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
    {
      headers: {
        "Content-Type": "application/json",
        Token: GHN_TOKEN,
      },
    }
  );
  return res?.data?.data || [];
}

// Lấy danh sách quận/huyện từ GHN
export async function getGHNDistricts(provinceId) {
  const res = await axios.post(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
    {
      province_id: Number(provinceId),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Token: GHN_TOKEN,
      },
    }
  );
  return res?.data?.data || [];
}

// Lấy danh sách phường/xã từ GHN
export async function getGHNWards(districtId) {
  const res = await axios.post(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
    {
      district_id: Number(districtId),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Token: GHN_TOKEN,
      },
    }
  );
  return res?.data?.data || [];
}
