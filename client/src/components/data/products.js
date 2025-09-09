// ảnh: đổi sang ảnh của bạn
import New1 from "../../assets/images/NewArrivals/New1.jpeg";
import New1sub from "../../assets/images/NewArrivals/New1-1.jpeg";
import New2 from "../../assets/images/NewArrivals/New2.jpeg";
import New2sub from "../../assets/images/NewArrivals/New2-2.jpeg";
import New3 from "../../assets/images/NewArrivals/New3.jpeg";
import New3sub from "../../assets/images/NewArrivals/New3-3.jpeg";
import New4 from "../../assets/images/NewArrivals/New4.jpeg";
import New4sub from "../../assets/images/NewArrivals/New4-4.jpeg";
export const products = [
  {
    id: "1",
    slug: "unum-tank",
    title: "Unum Tank",
    category: "ao-thun",
    gender: "her",
    price: 299000,
    salePrice: 199000, // null nếu không sale
    description:
      "Áo sơ mi nam form refined fit SSSTUTTER chất bamboo sơ vin linh hoạt FIT SHIRT",
    form: "vải bamboo (thoáng mát và không nhăn)",
    origin: "Việt Nam",
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: New1, alt: "Unum Tank - chính" },
    hoverImage: { src: New1sub, alt: "ảnh khi hover" },
    images: [
      { src: New1, alt: "Unum Tank - chính" },
      { src: New1sub, alt: "Unum Tank - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "white" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 8, sku: "SP-TRANG-M" },
          { size: "L", stock: 5, sku: "SP-TRANG-L" },
        ],
      },
      {
        color: { name: "đen", code: "black" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 1, sku: "SP-DEN-L" },
          { size: "XL", stock: 1, sku: "SP-DEN-XL" },
        ],
      },
    ],
    tags: ["bamboo", "thoang-mat", "khong-nhan"],
    isActive: true,
    createdAt: "2025-09-01T00:00:00Z",
  },

  {
    id: 2,
    slug: "low-waist-skort",
    title: "Low Waist Skort",
    category: "vay",
    gender: "her",
    price: 419000,
    salePrice: 399000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: New2, alt: "Low Waist Skort - chính" },
    hoverImage: { src: New2sub, alt: "ảnh khi hover" },
    images: [
      { src: New2, alt: "Low Waist Skort - chính" },
      { src: New2sub, alt: "Low Waist Skort - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#fff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 8, sku: "SP-TRANG-M" },
          { size: "L", stock: 5, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "black" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 1, sku: "SP-DEN-L" },
          { size: "XL", stock: 1, sku: "SP-DEN-XL" },
        ],
      },
      {
        color: { name: "đỏ", code: "red" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DO-S" },
          { size: "M", stock: 0, sku: "SP-DO-M" }, // hết
          { size: "L", stock: 1, sku: "SP-DO-L" },
          { size: "XL", stock: 1, sku: "SP-DO-XL" },
        ],
      },
    ],
    tags: ["bamboo", "thoang-mat", "khong-nhan"],
    isActive: true,
    createdAt: "2025-09-01T00:00:00Z",
  },
  {
    id: 3,
    slug: "dots-mini-skirt",
    title: "Dots mini Skirt",
    category: "ao-thun",
    gender: "her",
    price: 419000,
    salePrice: 399000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: New3, alt: "Dots mini Skirt - chính" },
    hoverImage: { src: New3sub, alt: "ảnh khi hover" },
    images: [
      { src: New3, alt: "Dots mini Skirt - chính" },
      { src: New3sub, alt: "Dots mini Skirt - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 8, sku: "SP-TRANG-M" },
          { size: "L", stock: 5, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 1, sku: "SP-DEN-L" },
          { size: "XL", stock: 1, sku: "SP-DEN-XL" },
        ],
      },
      {
        color: { name: "đỏ", code: "red" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DO-S" },
          { size: "M", stock: 0, sku: "SP-DO-M" }, // hết
          { size: "L", stock: 1, sku: "SP-DO-L" },
          { size: "XL", stock: 1, sku: "SP-DO-XL" },
        ],
      },
    ],
    tags: ["bamboo", "thoang-mat", "khong-nhan"],
    isActive: true,
    createdAt: "2025-09-01T00:00:00Z",
  },
  {
    id: 4,
    slug: "compo-bodysuit",
    title: "Compo Bodysuit",
    category: "ao-thun",
    gender: "her",
    price: 419000,
    salePrice: 399000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: New4, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: New4sub, alt: "ảnh khi hover" },
    images: [
      { src: New4, alt: "Compo Bodysuit - chính" },
      { src: New4sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 8, sku: "SP-TRANG-M" },
          { size: "L", stock: 5, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 1, sku: "SP-DEN-L" },
          { size: "XL", stock: 1, sku: "SP-DEN-XL" },
        ],
      },
      {
        color: { name: "đỏ", code: "red" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DO-S" },
          { size: "M", stock: 0, sku: "SP-DO-M" }, // hết
          { size: "L", stock: 1, sku: "SP-DO-L" },
          { size: "XL", stock: 1, sku: "SP-DO-XL" },
        ],
      },
    ],
    tags: ["bamboo", "thoang-mat", "khong-nhan"],
    isActive: true,
    createdAt: "2025-09-01T00:00:00Z",
  },
  // thêm 3-5 sp nữa cho list đẹp
];
