export async function calcGHNFee(districtId, wardCode, weight = 1000) {
  const payload = {
    service_type_id: 2,
    shop_id: 197612,
    from_district_id: 1581,
    to_district_id: Number(districtId),
    to_ward_code: String(wardCode),
    height: 10,
    length: 20,
    width: 15,
    weight: Number(weight),
  };

  try {
    const res = await fetch(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "d8959273-a8ee-11f0-bdaf-ae7fa045a771",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok || data.code !== 200) {
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
  const {
    toName,
    toPhone,
    toAddress,
    toWardCode,
    toDistrictId,
    codAmount,
    items,
    weight,
    length,
    width,
    height,
    note,
    orderCode,
  } = orderData;

  const payload = {
    payment_type_id: codAmount > 0 ? 2 : 1, // 1: Người gửi trả, 2: Người nhận trả (COD)
    note: note || "",
    required_note: "KHONGCHOXEMHANG",
    return_phone: "0355539891",
    return_address: "Yên Nội, Vạn Yên, Mê Linh, Hà Nội",
    return_district_id: 197612, // District ID shop
    return_ward_code: "", // Ward code shop
    client_order_code: orderCode || "", // Mã đơn hàng của bạn
    to_name: toName,
    to_phone: toPhone,
    to_address: toAddress,
    to_ward_code: String(toWardCode),
    to_district_id: Number(toDistrictId),
    cod_amount: Number(codAmount) || 0,
    content: "Quần áo", // Nội dung hàng hóa
    weight: Number(weight) || 1000, // gram
    length: Number(length) || 20, // cm
    width: Number(width) || 15, // cm
    height: Number(height) || 10, // cm
    pick_station_id: null,
    deliver_station_id: null,
    insurance_value: Math.min(codAmount, 5000000),
    service_id: 0,
    service_type_id: 2,
    coupon: null,
    pick_shift: [2],
    items: items || [
      {
        name: "Quần áo",
        code: "ITEM01",
        quantity: 1,
        price: codAmount || 0,
        length: length || 20,
        width: width || 15,
        height: height || 10,
        weight: weight || 1000,
      },
    ],
  };

  try {
    const res = await fetch(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "d8959273-a8ee-11f0-bdaf-ae7fa045a771",
          ShopId: "197612",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok || data.code !== 200) {
      throw new Error(data.message || "Không thể tạo đơn hàng trên GHN");
    }

    return data.data;
  } catch (error) {
    console.error("Lỗi khi tạo đơn GHN:", error);
    throw error;
  }
}
