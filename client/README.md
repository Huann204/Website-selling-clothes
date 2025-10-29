# 👕 Website Bán Quần Áo - E-Commerce Platform

Nền tảng thương mại điện tử hiện đại cho việc mua bán quần áo trực tuyến, được xây dựng với React và Vite.

## ✨ Tính Năng Chính

### 🛍️ Khách Hàng

- **Trang chủ**: Hero section, sản phẩm mới, sản phẩm bán chạy
- **Danh mục sản phẩm**: Lọc và tìm kiếm sản phẩm theo category
- **Chi tiết sản phẩm**: Xem thông tin chi tiết, hình ảnh, biến thể
- **Giỏ hàng**: Quản lý giỏ hàng với CartContext
- **Thanh toán**: Tích hợp Giao Hàng Nhanh (GHN)
- **Theo dõi đơn hàng**: Tra cứu trạng thái đơn hàng
- **Chatbot**: Hỗ trợ khách hàng tự động
- **Tìm kiếm**: Tìm kiếm sản phẩm nâng cao

### 👨‍💼 Quản Trị Viên

- **Dashboard**: Thống kê tổng quan với Recharts
- **Quản lý sản phẩm**: Tạo, chỉnh sửa, xóa sản phẩm
- **Quản lý đơn hàng**: Xem và cập nhật trạng thái đơn hàng
- **Quản lý danh mục**: Categories management
- **Quản lý khách hàng**: Customers management
- **Phân tích**: Analytics và báo cáo
- **Quản lý Admin**: Thêm/xóa quản trị viên
- **Xác thực**: Đăng nhập/đăng ký với JWT

## 🛠️ Công Nghệ Sử Dụng

### Core

- **React 19.1.0** - Thư viện UI
- **React Router DOM 7.8.2** - Routing
- **Vite 7.0.4** - Build tool & dev server

### UI/UX

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Icons** - Icon components
- **Lottie React** - Animations
- **@splidejs/react-splide** - Carousel/slider

### State & Data

- **React Context API** - State management (Cart, Auth)
- **Recharts** - Data visualization
- **React Markdown** - Markdown rendering

### Utilities

- **JWT Decode** - JWT token parsing
- **React Toastify** - Notifications
- **Axios** (implied) - HTTP client

### Development Tools

- **ESLint** - Linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Cấu Trúc Thư Mục

```
client/
├── src/
│   ├── admin/               # Admin panel
│   │   ├── components/      # Admin components
│   │   ├── context/         # Admin auth context
│   │   ├── pages/          # Admin pages
│   │   └── ProtectedRoute/ # Route protection
│   ├── components/         # Customer components
│   ├── context/            # Global contexts (Cart, etc.)
│   ├── pages/              # Customer pages
│   ├── routes/             # Route configuration
│   ├── shared/             # Shared components
│   ├── utils/              # Utility functions (GHN API)
│   ├── assets/             # Static assets
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── public/                 # Public assets
└── config files            # Vite, Tailwind, ESLint, etc.
```

## 🚀 Bắt Đầu

### Yêu Cầu

- Node.js >= 16.x
- npm hoặc yarn

### Cài Đặt

1. Clone repository

```bash
git clone https://github.com/Huann204/Website-selling-clothes.git
cd ecommerce/client
```

2. Cài đặt dependencies

```bash
npm install
```

3. Tạo file `.env` và cấu hình biến môi trường

```env
VITE_API_URL=http://localhost:5000
```

4. Chạy development server

```bash
npm run dev
```

5. Mở trình duyệt tại `http://localhost:5173`

## 📜 Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run preview  # Preview production build
npm run lint     # Chạy ESLint
```

## 🌐 API Integration

Dự án kết nối với backend API thông qua `VITE_API_URL`. Đảm bảo backend server đang chạy trước khi sử dụng.

### Giao Hàng Nhanh (GHN) Integration

- Tích hợp API GHN cho việc tính phí ship và quản lý đơn hàng
- Utility functions trong `src/utils/ghn.js` và `src/utils/ghn-location.js`

## 🔐 Xác Thực

- JWT-based authentication
- Protected routes cho admin panel
- Guest routes cho login/register
- Context API để quản lý auth state

## 🎨 Styling

- **Tailwind CSS** cho utility classes
- **Custom components** với Tailwind
- **Responsive design** cho mobile và desktop
- **Lottie animations** cho loading states

## 📦 Deployment

### Build Production

```bash
npm run build
```

### Deploy lên Vercel

Dự án đã được cấu hình với `vercel.json` để deploy lên Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Đóng Góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Dự án này là private và thuộc về Huann204.

## 👨‍💻 Tác Giả

**Huann204**

- GitHub: [@Huann204](https://github.com/Huann204)
- Repository: [Website-selling-clothes](https://github.com/Huann204/Website-selling-clothes)

## 🐛 Báo Lỗi

Nếu bạn tìm thấy lỗi, vui lòng tạo issue trên GitHub repository.

## 📞 Liên Hệ

Để biết thêm thông tin, vui lòng liên hệ qua GitHub issues hoặc email.

---

**Built with ❤️ using React + Vite**
