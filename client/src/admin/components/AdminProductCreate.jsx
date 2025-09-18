import React, { useEffect, useState } from "react";
import { ArrowLeft, Save, Upload, ImagePlus, Tag, Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function AdminProductCreate() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State preview ảnh
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [hoverPreview, setHoverPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [hoverFile, setHoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("for-her");
  const [sex, setSex] = useState("her");
  const [subcategory, setSubcategory] = useState("ao-thun");
  const [description, setDescription] = useState("");
  const [form, setForm] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [tags, setTags] = useState([]);
  const [variants, setVariants] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const formatPrice = (v) =>
    new Intl.NumberFormat("vi-VN").format(Number(v)) + "₫";
  // thêm 1 variant rỗng
  const addVariant = () => {
    setVariants((prev) => [...prev, {}]);
  };
  // xoá variant theo index
  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };
  const updateVariant = (index, data) => {
    setVariants((prev) => {
      const newArr = [...prev];
      newArr[index] = data;
      return newArr;
    });
  };
  // Handlers
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleHover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHoverFile(file);
      setHoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGallery = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setGalleryFiles(files);
    setGalleryPreview(newPreviews);
  };
  const validateForm = () => {
    let newErrors = {};

    if (!title.trim()) newErrors.title = "Tên sản phẩm là bắt buộc";
    if (!price || Number(price) <= 0) newErrors.price = "Giá phải lớn hơn 0";
    if (!salePrice || Number(price) <= 0)
      newErrors.salePrice = "Giá phải lớn hơn 0";
    if (!thumbnailFile) newErrors.thumbnail = "Cần chọn ảnh chính";
    // if (variants.some((v) => !v.stock || Number(v.stock) < 0))
    //   newErrors.variants = "Tồn kho phải >= 0 cho tất cả size";
    // if (!tags.length) newErrors.tags = "Cần nhập ít nhất 1 tag";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dghdbbkfc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };
  const handleSaveProduct = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      // Upload ảnh lên Cloudinary
      const thumbnailUrl = thumbnailFile
        ? await uploadToCloudinary(thumbnailFile)
        : "";
      const hoverUrl = hoverFile ? await uploadToCloudinary(hoverFile) : "";
      const galleryUrls = [];
      for (const file of galleryFiles) {
        const url = await uploadToCloudinary(file);
        galleryUrls.push(url);
      }

      // Dữ liệu sản phẩm
      const productData = {
        title: title,
        category: category,
        gender: sex,
        subcategory: subcategory,
        price: price,
        salePrice: salePrice,
        description: description,
        form: form,
        origin: origin,
        tags: tags,
        brand: brand,
        isActive: isActive,
        thumbnail: {
          src: thumbnailUrl,
        },
        hoverImage: {
          src: hoverUrl,
        },
        images: galleryUrls.map((galleryUrl) => ({
          src: galleryUrl,
        })),
        variants,
      };

      // Gửi sang Node.js
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Lỗi khi lưu sản phẩm!");

      // ✅ Thành công → chuyển hướng
      navigate("/admin/products");
      const data = await res.json();
      console.log("Đã lưu sản phẩm:", data);
      alert("Lưu sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu sản phẩm!");
    } finally {
      setLoading(false); // tắt loading
    }
  };
  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      {/* Sidebar mobile overlay */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 lg:hidden">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <AdminSidebar activeLabel="Sản phẩm" />
      </div>

      {/* Main */}
      <main className="flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                <ArrowLeft className="h-4 w-4" /> Trở lại
              </button>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                Thêm sản phẩm
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/admin/products`}>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                  Huỷ
                </button>
              </Link>
              <button
                onClick={handleSaveProduct}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
              >
                <Save className="h-4 w-4" />{" "}
                {loading ? "Đang lưu..." : "Lưu sản phẩm"}
              </button>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-10 py-5 sm:py-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Form left */}
            <div className="xl:col-span-2 space-y-6">
              {/* Thông tin cơ bản */}
              <Section title="Thông tin cơ bản">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Tên sản phẩm" required>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={inputClass}
                      placeholder="Tên sản phẩm"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                  </Field>
                  <Field label="Thương hiệu">
                    <input
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className={inputClass}
                      placeholder="No Brand"
                    />
                  </Field>
                  <Field label="Danh mục">
                    <select
                      className={inputClass}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>for-her</option>
                      <option>for-him</option>
                    </select>
                  </Field>
                  <Field label="Giới tính">
                    <select
                      className={inputClass}
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <option>her</option>
                      <option>him</option>
                    </select>
                  </Field>
                  <Field label="Tiểu mục">
                    <select
                      className={inputClass}
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option value={"ao-thun"}>Áo thun</option>
                      <option value={"ao-so-mi"}>Áo sơ mi</option>
                      <option value={"quan-jeans"}>Quần jeans</option>
                      <option value={"quan-tay"}>Quần tây</option>
                      <option value={"vay"}>Váy</option>
                    </select>
                  </Field>
                </div>
                <Field label="Mô tả">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputClass} min-h-[96px]`}
                    placeholder="Mô tả về sản phẩm"
                  />
                </Field>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Chất liệu / Form">
                    <input
                      value={form}
                      onChange={(e) => setForm(e.target.value)}
                      className={inputClass}
                      placeholder="vải bamboo (thoáng mát và không nhăn)"
                    />
                  </Field>
                  <Field label="Xuất xứ">
                    <input
                      className={inputClass}
                      placeholder="Việt Nam"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </Field>
                </div>
              </Section>

              {/* Giá bán */}
              <Section title="Giá bán">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Giá niêm yết (VND)" required>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={inputClass}
                      type="number"
                      placeholder="499000"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">{errors.price}</p>
                    )}
                  </Field>

                  <Field label="Giá khuyến mãi (VND)">
                    <input
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className={inputClass}
                      type="number"
                      placeholder="Giá đã giảm"
                    />
                    {errors.salePrice && (
                      <p className="text-red-500 text-sm">{errors.salePrice}</p>
                    )}
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Tình trạng">
                    <select
                      className={inputClass}
                      value={isActive}
                      onChange={(e) => setIsActive(e.target.value)}
                    >
                      <option value={true}>Đang bán</option>
                      <option value={false}>Ẩn</option>
                    </select>
                  </Field>
                  <Field label="Tags">
                    <div className="relative">
                      <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value.split(", "))}
                        className={`${inputClass} pl-9`}
                        placeholder="bamboo, thoang-mat, khong-nhan"
                      />
                    </div>
                  </Field>
                </div>
              </Section>

              {/* Hình ảnh */}
              <Section title="Hình ảnh">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <UploadBox
                      title="Thumbnail (bắt buộc)"
                      hint="PNG/JPG"
                      onChange={handleThumbnail}
                    />
                    {errors.thumbnail && (
                      <p className="text-red-500 text-sm">{errors.thumbnail}</p>
                    )}
                  </div>
                  <UploadBox
                    title="Hover Image (tuỳ chọn)"
                    hint="PNG/JPG"
                    onChange={handleHover}
                  />
                  <UploadBox
                    title="Thư viện ảnh"
                    hint="Tối đa 6 ảnh"
                    multi
                    onChange={handleGallery}
                  />
                </div>
                <div className="mt-4 space-y-4">
                  <div className="lg:flex lg:gap-5">
                    {thumbnailPreview && (
                      <div>
                        <div className="text-xs font-semibold text-slate-500 mb-1">
                          Thumbnail
                        </div>
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail"
                          className="h-32 rounded-lg border object-cover"
                        />
                      </div>
                    )}

                    {hoverPreview && (
                      <div>
                        <div className="text-xs font-semibold text-slate-500 mb-1">
                          Hover Image
                        </div>
                        <img
                          src={hoverPreview}
                          alt="Hover"
                          className="h-32 rounded-lg border object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {galleryPreview.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-2">
                        Thư viện ảnh
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {galleryPreview.map((f, idx) => (
                          <div
                            key={idx}
                            className="relative border rounded-lg overflow-hidden"
                          >
                            <img
                              src={f.url}
                              alt={f.name}
                              className="h-40 w-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                              {f.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* Biến thể */}
              <Section title="Biến thể – Màu & Size">
                {variants.map((v, idx) => (
                  <VariantCard
                    key={idx}
                    onChange={(data) => updateVariant(idx, data)}
                    onRemove={() => removeVariant(idx)}
                  />
                ))}

                <div className="pt-2">
                  <button
                    onClick={addVariant}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    + Thêm màu
                  </button>
                </div>
              </Section>
            </div>

            {/* Right column */}
            <div className="space-y-6 xl:sticky xl:top-20 h-fit">
              <Section title="Xem nhanh">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="h-24 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 self-start">
                    <img
                      src={hoverPreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">
                      {title ? title : "Tên sản phẩm"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {brand ? brand : "No Brand"}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-emerald-700">
                        {price ? formatPrice(price) : "0đ"}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {salePrice ? formatPrice(salePrice) : "0đ"}
                      </span>
                      <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                        {salePrice && price
                          ? 100 - Math.floor((salePrice / price) * 100) + "%"
                          : "0%"}
                      </span>
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ===== Sub components =====
function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </div>
      {children}
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label} {required && <span className="text-rose-500">*</span>}
      </div>
      {children}
    </label>
  );
}

function UploadBox({ title, hint, multi, onChange }) {
  const inputId = `upload-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-6 text-center">
      <ImagePlus className="h-8 w-8 text-slate-400" />
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-slate-500">{hint}</div>

      <input
        id={inputId}
        type="file"
        multiple={multi}
        className="hidden"
        onChange={onChange}
      />

      <label
        htmlFor={inputId}
        className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-100 w-full sm:w-auto"
      >
        <Upload className="h-4 w-4" />
        {multi ? "Tải nhiều ảnh" : "Tải ảnh"}
      </label>
    </div>
  );
}

function VariantCard({ onChange, onRemove }) {
  const [color, setColor] = useState("");
  const [stocks, setStocks] = useState({ S: 0, M: 0, L: 0, XL: 0 });

  // cập nhật lên cha mỗi khi thay đổi
  useEffect(() => {
    onChange({
      color: { name: color },
      sizes: Object.entries(stocks).map(([size, stock]) => ({
        size,
        stock,
      })),
    });
  }, [color, stocks]);

  const handleStockChange = (size, value) => {
    setStocks((prev) => ({ ...prev, [size]: Number(value) }));
  };

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase text-slate-500">
            Màu sắc
          </div>
          <input
            className={`${inputClass} mt-1`}
            placeholder="Ví dụ: trắng / đen"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button
          onClick={onRemove}
          className="ml-3 px-2 py-1 text-xs text-red-600 border border-red-300 rounded hover:bg-red-50"
        >
          Xoá
        </button>
      </div>

      <table className="min-w-[280px] w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
          <tr>
            <th className="px-4 py-2 text-left">Size</th>
            <th className="px-4 py-2 text-left">Tồn kho</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {["S", "M", "L", "XL"].map((size) => (
            <tr key={size}>
              <td className="px-4 py-2 font-medium">{size}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-20 border rounded px-2 py-1 text-sm"
                  min="0"
                  value={stocks[size]}
                  onChange={(e) => handleStockChange(size, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Tailwind input class dùng chung
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-100 focus:border-sky-300 focus:ring";
