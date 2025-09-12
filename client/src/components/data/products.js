// ảnh: đổi sang ảnh của bạn
import New1 from "../../assets/images/NewArrivals/New1.jpeg";
import New1sub from "../../assets/images/NewArrivals/New1-1.jpeg";
import New2 from "../../assets/images/NewArrivals/New2.jpeg";
import New2sub from "../../assets/images/NewArrivals/New2-2.jpeg";
import New3 from "../../assets/images/NewArrivals/New3.jpeg";
import New3sub from "../../assets/images/NewArrivals/New3-3.jpeg";
import New4 from "../../assets/images/NewArrivals/New4.jpeg";
import New4sub from "../../assets/images/NewArrivals/New4-4.jpeg";
import Him1 from "../../assets/images/Him/1.jpeg";
import Him1sub from "../../assets/images/Him/1.1.jpeg";
import Him2 from "../../assets/images/Him/2.jpeg";
import Him2sub from "../../assets/images/Him/2.1.jpeg";
import Him3 from "../../assets/images/Him/3.jpeg";
import Him3sub from "../../assets/images/Him/3.1.jpeg";
import Him4 from "../../assets/images/Him/4.jpeg";
import Him4sub from "../../assets/images/Him/4.1.jpeg";
import Him5 from "../../assets/images/Him/5.jpeg";
import Him5sub from "../../assets/images/Him/5.1.jpeg";
import Him6 from "../../assets/images/Him/6.jpeg";
import Him6sub from "../../assets/images/Him/6.1.jpeg";
import Him7 from "../../assets/images/Him/7.jpeg";
import Him7sub from "../../assets/images/Him/7.1.jpeg";
import Him8 from "../../assets/images/Him/8.jpeg";
import Him8sub from "../../assets/images/Him/8.1.jpeg";
import Him9 from "../../assets/images/Him/9.jpeg";
import Him9sub from "../../assets/images/Him/9.1.jpeg";
import Him10 from "../../assets/images/Him/10.jpeg";
import Him10sub from "../../assets/images/Him/10.1.jpeg";
import Him11 from "../../assets/images/Him/11.jpeg";
import Him11sub from "../../assets/images/Him/11.1.jpeg";
import Him12 from "../../assets/images/Him/12.jpeg";
import Him12sub from "../../assets/images/Him/12.1.jpeg";

export const products = [
  {
    id: "1",
    slug: "ao-thun",
    title: "Unum Tank",
    category: "for-her",
    gender: "her",
    subcategory: "vay",
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
    category: "for-her",
    subcategory: "vay",
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
    category: "for-her",
    subcategory: "ao-thun",
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
    category: "for-her",
    subcategory: "ao-thun",
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
  {
    id: 5,
    slug: "smart-pants",
    title: "Smart Pans",
    category: "for-him",
    subcategory: "quan-tay",
    gender: "him",
    price: 999999,
    salePrice: 25000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him1, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him1sub, alt: "ảnh khi hover" },
    images: [
      { src: Him1, alt: "Compo Bodysuit - chính" },
      { src: Him1sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
    id: 6,
    slug: "great-life-tee",
    title: "Great Life Tee",
    category: "for-him",
    subcategory: "ao-thun",
    gender: "him",
    price: 200000,
    salePrice: 36000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him2, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him2sub, alt: "ảnh khi hover" },
    images: [
      { src: Him2, alt: "Compo Bodysuit - chính" },
      { src: Him2sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
    id: 7,
    slug: "man-shirt",
    title: "Man Shirt",
    category: "for-him",
    subcategory: "ao-so-mi",
    gender: "him",
    price: 500000,
    salePrice: 99000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him3, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him3sub, alt: "ảnh khi hover" },
    images: [
      { src: Him3, alt: "Compo Bodysuit - chính" },
      { src: Him3sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
    id: 8,
    slug: "stone-short",
    title: "Stone Shorts",
    category: "for-him",
    subcategory: "quan-jeans",
    gender: "him",
    price: 500000,
    salePrice: 2000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him4, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him4sub, alt: "ảnh khi hover" },
    images: [
      { src: Him4, alt: "Compo Bodysuit - chính" },
      { src: Him4sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
    id: 9,
    slug: "felix-shirt",
    title: "Felix Shirt",
    category: "for-him",
    subcategory: "ao-so-mi",
    gender: "him",
    price: 500000,
    salePrice: 2000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him5, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him5sub, alt: "ảnh khi hover" },
    images: [
      { src: Him5, alt: "Compo Bodysuit - chính" },
      { src: Him5sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
    id: 10,
    slug: "sunflower",
    title: "Sunflower Polo Tee",
    category: "for-him",
    subcategory: "ao-thun",
    gender: "him",
    price: 690000,
    salePrice: 11000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him6, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him6sub, alt: "ảnh khi hover" },
    images: [
      { src: Him6, alt: "Compo Bodysuit - chính" },
      { src: Him6sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
    id: 11,
    slug: "from-jeans",
    title: "From Jeans-II",
    category: "for-him",
    subcategory: "quan-jeans",
    gender: "him",
    price: 500000,
    salePrice: 100000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him7, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him7sub, alt: "ảnh khi hover" },
    images: [
      { src: Him7, alt: "Compo Bodysuit - chính" },
      { src: Him7sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
    id: 12,
    slug: "check-conrad",
    title: "Check Conrad Shirt",
    category: "for-him",
    subcategory: "ao-so-mi",
    gender: "him",
    price: 250000,
    salePrice: 150000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him8, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him8sub, alt: "ảnh khi hover" },
    images: [
      { src: Him8, alt: "Compo Bodysuit - chính" },
      { src: Him8sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 9, sku: "SP-DEN-L" },
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
    id: 13,
    slug: "great-tee",
    title: "Great Tee",
    category: "for-him",
    subcategory: "ao-thun",
    gender: "him",
    price: 690000,
    salePrice: 11000, // null nếu không sale
    rating: 4.6,
    ratingCount: 128,
    thumbnail: { src: Him8, alt: "Compo Bodysuit - chính" },
    hoverImage: { src: Him8sub, alt: "ảnh khi hover" },
    images: [
      { src: Him8, alt: "Compo Bodysuit - chính" },
      { src: Him8sub, alt: "Compo Bodysuit - phụ" },
    ],
    variants: [
      {
        color: { name: "trắng", code: "#ffffff" },
        sizes: [
          { size: "S", stock: 10, sku: "SP-TRANG-S" },
          { size: "M", stock: 0, sku: "SP-TRANG-M" },
          { size: "L", stock: 7, sku: "SP-TRANG-L" },
          { size: "XL", stock: 2, sku: "SP-TRANG-XL" },
        ],
      },
      {
        color: { name: "đen", code: "#000000" },
        sizes: [
          { size: "S", stock: 7, sku: "SP-DEN-S" },
          { size: "M", stock: 0, sku: "SP-DEN-M" }, // hết
          { size: "L", stock: 5, sku: "SP-DEN-L" },
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
