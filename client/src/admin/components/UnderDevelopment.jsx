import React from "react";
import { Construction, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnderDevelopment = ({ title = "Tính năng đang phát triển" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon với animation */}
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse">
          <Construction className="w-12 h-12 text-blue-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          {title}
        </h1>

        {/* Description */}
        <p className="text-slate-600 mb-2">
          Chức năng này đang được phát triển
        </p>
        <p className="text-sm text-slate-500 mb-8">
          Vui lòng quay lại sau. Chúng tôi đang làm việc chăm chỉ để hoàn thiện
          tính năng này!
        </p>

        {/* Progress indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
          <div
            className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-pink-600 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        {/* Decorative elements */}
        <div className="mt-12 flex items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
            <span>Đang thiết kế</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-blue-300 rounded-full"></div>
            <span>Đang code</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
            <span>Đang test</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
