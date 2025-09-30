import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductFormLayout, ProductFormContent } from "./Layout/LayoutAdmin";
import { AuthContext } from "../context/AuthContext";

export default function AdminProductCreate() {
  const navigate = useNavigate();
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

  const { admin } = useContext(AuthContext);
  const token = admin?.token;
  // Fetch dữ liệu sản phẩm để edit
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }),
    [token]
  );
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
    if (variants.some((v) => !v.color?.name.trim())) {
      newErrors.variants = "Cần nhập tên màu cho tất cả biến thể";
    }

    if (!title.trim()) newErrors.title = "Tên sản phẩm là bắt buộc";
    if (!price || Number(price) <= 0) newErrors.price = "Giá phải lớn hơn 0";
    if (salePrice && Number(salePrice) >= Number(price)) {
      newErrors.salePrice = "Giá khuyến mãi phải nhỏ hơn giá gốc";
    }
    if (Number(salePrice) < 0)
      newErrors.salePrice = "Giá khuyến mãi phải lớn hơn 0";

    if (!thumbnailFile) newErrors.thumbnail = "Cần chọn ảnh chính";
    // if (variants.some((v) => !v.stock || Number(v.stock) < 0))
    //   newErrors.variants = "Tồn kho phải >= 0 cho tất cả size";
    // if (!tags.length) newErrors.tags = "Cần nhập ít nhất 1 tag";
    variants.forEach((v, idx) => {
      if (!v.color?.name || v.color.name.trim() === "") {
        newErrors[`variant-${idx}`] = "Vui lòng nhập màu sắc cho biến thể";
      }
    });
    if (variants.length == 0) newErrors.variant = "Vui lòng chọn biến thể";
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
        headers,
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Lỗi khi lưu sản phẩm!");

      // Thành công chuyển hướng
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
    <ProductFormLayout
      title="Thêm sản phẩm"
      onSave={handleSaveProduct}
      loading={loading}
      saveText="Lưu sản phẩm"
    >
      <ProductFormContent
        // Form data
        title={title}
        setTitle={setTitle}
        brand={brand}
        setBrand={setBrand}
        category={category}
        setCategory={setCategory}
        sex={sex}
        setSex={setSex}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        description={description}
        setDescription={setDescription}
        form={form}
        setForm={setForm}
        origin={origin}
        setOrigin={setOrigin}
        price={price}
        setPrice={setPrice}
        salePrice={salePrice}
        setSalePrice={setSalePrice}
        isActive={isActive}
        setIsActive={setIsActive}
        tags={tags}
        setTags={setTags}
        variants={variants}
        errors={errors}
        // Image handlers
        handleThumbnail={handleThumbnail}
        handleHover={handleHover}
        handleGallery={handleGallery}
        thumbnailPreview={thumbnailPreview}
        hoverPreview={hoverPreview}
        galleryPreview={galleryPreview}
        // Variant handlers
        addVariant={addVariant}
        removeVariant={removeVariant}
        updateVariant={updateVariant}
        // Preview data
        formatPrice={formatPrice}
      />
    </ProductFormLayout>
  );
}
