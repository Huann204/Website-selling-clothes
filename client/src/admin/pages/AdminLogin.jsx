import React, { useState, useContext } from "react";
import { AuthContext } from "@admin/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import API_URL from "@/config";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: postAut,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${API_URL}/api/admin/auth/login`, data);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.token);
      navigate("/admin");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postAut({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        {isError && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error.response?.data?.message || "Đăng nhập thất bại!"}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
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
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {isPending ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/admin/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
