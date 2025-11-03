import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormLayout, ProductFormContent } from "./Layout/LayoutAdmin";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../../config";

export default function AdminProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID sản phẩm từ URL

  // State preview ảnh
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [hoverPreview, setHoverPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [hoverFile, setHoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // State form data
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
  const [loadingData, setLoadingData] = useState(true);
  const { admin } = useContext(AuthContext);
  const token = admin?.token;
  // Fetch dữ liệu sản phẩm để edit

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingData(true);
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Không thể tải thông tin sản phẩm");

        const product = await res.json();

        // Điền dữ liệu vào form
        setTitle(product.title || "");
        setBrand(product.brand || "");
        setCategory(product.category || "for-her");
        setSex(product.gender || "her");
        setSubcategory(product.subcategory || "ao-thun");
        setDescription(product.description || "");
        setForm(product.form || "");
        setOrigin(product.origin || "");
        setPrice(product.price || "");
        setSalePrice(product.salePrice || "");
        setIsActive(product.isActive !== undefined ? product.isActive : true);
        setTags(product.tags || []);
        setVariants(product.variants || []);

        // Set preview ảnh từ URL có sẵn
        if (product.thumbnail?.src) {
          setThumbnailPreview(product.thumbnail.src);
        }
        if (product.hoverImage?.src) {
          setHoverPreview(product.hoverImage.src);
        }
        if (product.images?.length > 0) {
          setGalleryPreview(
            product.images.map((img, idx) => ({
              name: `gallery-${idx}`,
              url: img.src,
            }))
          );
        }
      } catch (err) {
        console.error(err);
        alert("Có lỗi khi tải thông tin sản phẩm!");
        navigate("/admin/products");
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

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
    if (Number(salePrice) < 0) newErrors.salePrice = "Giá phải lớn hơn 0";
    if (!thumbnailPreview) newErrors.thumbnail = "Cần chọn ảnh chính";
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

  const handleUpdateProduct = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      // Upload ảnh mới lên Cloudinary (nếu có)
      let thumbnailUrl = thumbnailPreview;
      let hoverUrl = hoverPreview;
      let galleryUrls = galleryPreview.map((img) => img.url);

      // Nếu có file thumbnail mới
      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile);
      }

      // Nếu có file hover mới
      if (hoverFile) {
        hoverUrl = await uploadToCloudinary(hoverFile);
      }

      // Nếu có gallery files mới
      if (galleryFiles.length > 0) {
        galleryUrls = [];
        for (const file of galleryFiles) {
          const url = await uploadToCloudinary(file);
          galleryUrls.push(url);
        }
      }

      // Dữ liệu sản phẩm cập nhật
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

      // Gửi PUT request để cập nhật
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Lỗi khi cập nhật sản phẩm!");

      const data = await res.json();
      console.log("Đã cập nhật sản phẩm:", data);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  // Loading state khi đang fetch data
  if (loadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <ProductFormLayout
      title="Sửa sản phẩm"
      onSave={handleUpdateProduct}
      loading={loading}
      saveText="Cập nhật"
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
