import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("Cảm ơn bạn đã đăng ký!");
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="mt-5 bg-[#aabec6] p-[5%]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[33px] font-semibold mb-4">
          NEWSLETTER
        </h2>
        <p className="text-[16px] text-[#4a4a4a] mb-8">
          Đăng ký để nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
            className="flex-1 px-6 py-4 text-[14px] focus:outline-none"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-black text-white text-[14px] font-semibold hover:bg-[#333] transition-all duration-300"
          >
            ĐĂNG KÝ
          </button>
        </form>

        {message && (
          <p className="mt-4 text-[14px] font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
