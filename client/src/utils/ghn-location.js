const GHN_TOKEN = "d8959273-a8ee-11f0-bdaf-ae7fa045a771";
const GHN_SHOP_ID = 197612;

// Lấy danh sách tỉnh/thành từ GHN
export async function getGHNProvinces() {
  const res = await fetch(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: GHN_TOKEN,
      },
    }
  );
  const data = await res.json();
  return data?.data || [];
}

// Lấy danh sách quận/huyện từ GHN
export async function getGHNDistricts(provinceId) {
  const res = await fetch(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: GHN_TOKEN,
      },
      body: JSON.stringify({ province_id: Number(provinceId) }),
    }
  );
  const data = await res.json();
  return data?.data || [];
}

// Lấy danh sách phường/xã từ GHN
export async function getGHNWards(districtId) {
  const res = await fetch(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: GHN_TOKEN,
      },
      body: JSON.stringify({ district_id: Number(districtId) }),
    }
  );
  const data = await res.json();
  return data?.data || [];
}
