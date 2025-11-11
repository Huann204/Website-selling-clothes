import React from "react";
import { Tag } from "lucide-react";
import {
  Field,
  Section,
  UploadBox,
  VariantCard,
} from "@admin/components/products/ProductForm";

export default function ProductFormContent({
  // Form data
  title,
  setTitle,
  brand,
  setBrand,
  category,
  setCategory,
  sex,
  setSex,
  subcategory,
  setSubcategory,
  description,
  setDescription,
  form,
  setForm,
  origin,
  setOrigin,
  price,
  setPrice,
  salePrice,
  setSalePrice,
  isActive,
  setIsActive,
  tags,
  setTags,
  variants,
  errors,
  // Image handlers
  handleThumbnail,
  handleHover,
  handleGallery,
  thumbnailPreview,
  hoverPreview,
  galleryPreview,
  // Variant handlers
  addVariant,
  removeVariant,
  updateVariant,
  // Preview data
  formatPrice,
}) {
  return (
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
                className="inputClass"
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
                className="inputClass"
                placeholder="No Brand"
              />
            </Field>
            <Field label="Danh mục">
              <select
                className="inputClass"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>for-her</option>
                <option>for-him</option>
              </select>
            </Field>
            <Field label="Giới tính">
              <select
                className="inputClass"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option>her</option>
                <option>him</option>
                <option>unisex</option>
              </select>
            </Field>
            <Field label="Tiểu mục">
              <select
                className="inputClass"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value={"ao-thun"}>Áo thun</option>
                <option value={"ao-so-mi"}>Áo sơ mi</option>
                <option value={"ao-khoac"}>Áo khoác</option>
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
              className={`inputClass min-h-[96px]`}
              placeholder="Mô tả về sản phẩm"
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Chất liệu / Form">
              <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                className="inputClass"
                placeholder="vải bamboo (thoáng mát và không nhăn)"
              />
            </Field>
            <Field label="Xuất xứ">
              <input
                className="inputClass"
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
                className="inputClass"
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
                className="inputClass"
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
                className="inputClass"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
              >
                <option value={true}>Đang bán</option>
                <option value={false}>Ẩn</option>
              </select>
            </Field>
            <Field label="Tags">
              <div className="relative">
                <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={Array.isArray(tags) ? tags.join(", ") : tags}
                  onChange={(e) => setTags(e.target.value.split(", "))}
                  className={`inputClass pl-9`}
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
              key={`variant-${idx}`}
              variant={v}
              onChange={(data) => updateVariant(idx, data)}
              onRemove={() => removeVariant(idx)}
              errors={errors[`variant-${idx}`]}
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
        {errors.variant && (
          <p className="text-red-500 text-sm">{errors.variant}</p>
        )}
      </div>

      {/* Right column */}
      <div className="space-y-6 xl:sticky xl:top-20 h-fit">
        <Section title="Xem nhanh">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <div className="h-24 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 self-start">
              <img
                src={thumbnailPreview || hoverPreview}
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
                  {salePrice ? formatPrice(salePrice) : "0đ"}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {price ? formatPrice(price) : "0đ"}
                </span>
                <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {salePrice && price
                    ? Math.floor(((price - salePrice) / price) * 100) + "%"
                    : "0%"}
                </span>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
