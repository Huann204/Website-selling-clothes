import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import API_URL from "@/config";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function AdminRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    mutate: postAut,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post(
        `${API_URL}/api/admin/auth/register`,
        userData
      );
      return res.data;
    },
    onSuccess: () => {
      setTimeout(() => navigate("/admin/login"), 1500);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (password !== confirm) {
      setPasswordError("Mật khẩu nhập lại không khớp!");
      return;
    }

    postAut({
      name,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Register
        </h2>
        {passwordError && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {passwordError}
          </p>
        )}
        {isError && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error.response?.data?.message || "Đăng ký thất bại!"}
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 text-sm mb-3 text-center">
            Đăng ký thành công! Vui lòng đợi duyệt.
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* name */}
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tên"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            Đăng ký
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/admin/login" className="text-green-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
