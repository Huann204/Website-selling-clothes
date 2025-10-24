import React, { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import API_URL from "../config";
import { SiZalo } from "react-icons/si";
import { toast } from "react-toastify";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/api/info`);
        if (!response.ok) throw new Error("Failed to fetch contact info");
        const data = await response.json();
        console.log(data);
        setContactInfo(data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchContactInfo();
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/social`);
        if (!response.ok) throw new Error("Failed to fetch social links");
        const data = await response.json();
        console.log(data);
        setSocialLinks(data);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchSocialLinks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.phone
    ) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      setIsSubmitting(false);
      return;
    }
    await fetch(`${API_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
    toast.success("Cảm ơn bạn đã gửi yêu cầu");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Toast */}
      {submitSuccess && (
        <div className="fixed top-8 right-8 z-50 bg-black text-white px-6 py-4 shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">Tin nhắn đã được gửi thành công</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              Liên hệ
            </p>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-4">
              Hãy nói chuyện với chúng tôi
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn với bất kỳ câu hỏi
              hoặc thắc mắc nào.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Contact Info - 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-6">
                Thông tin
              </h2>
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <MapPin className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Địa chỉ</p>
                      <p className="text-gray-900 leading-relaxed">
                        {contactInfo?.address || "Chưa cập nhật địa chỉ"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Phone className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Điện thoại</p>
                      <a
                        href="tel:0123456789"
                        className="text-gray-900 hover:underline"
                      >
                        {contactInfo?.phone || "Chưa cập nhật số điện thoại"}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Mail className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <a
                        href="mailto:contact@ssstutter.com"
                        className="text-gray-900 hover:underline"
                      >
                        {contactInfo?.email || "Chưa cập nhật email"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500 mb-1">Giờ mở cửa</p>
              <p className="text-gray-900">Thứ 2 - Chủ nhật: 9:00 - 22:00</p>
            </div>

            {/* Social Media */}
            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500 mb-4">Mạng xã hội</p>
              <div className="flex gap-3">
                <a
                  href={socialLinks?.facebook || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks?.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks?.zalo || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <SiZalo className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-video bg-gray-100 overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d782.5947820413423!2d105.78023493145396!3d21.085879282833105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1761198806117!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Contact Form - 3 cols */}
          <div className="lg:col-span-3">
            <div className="bg-white border p-4 sm:p-6 lg:p-10">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-6">
                Gửi tin nhắn
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full outline-none px-0 py-3 border-0 border-b border-gray-300 focus:border-black focus:ring-0 transition-colors bg-transparent placeholder:text-gray-400 text-sm"
                      placeholder="Họ và tên *"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 outline-none py-3 border-0 border-b border-gray-300 focus:border-black focus:ring-0 transition-colors bg-transparent placeholder:text-gray-400 text-sm"
                      placeholder="Email *"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-0 outline-none py-3 border-0 border-b border-gray-300 focus:border-black focus:ring-0 transition-colors bg-transparent placeholder:text-gray-400 text-sm"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-0 outline-none py-3 border-0 border-b border-gray-300 focus:border-black focus:ring-0 transition-colors resize-none bg-transparent placeholder:text-gray-400 text-sm"
                    placeholder="Nội dung *"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-white px-8 sm:px-10 py-3.5 rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs tracking-wider font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Đang gửi</span>
                      </>
                    ) : (
                      <>
                        <span>Gửi tin nhắn</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
