import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import { MessageCircle } from "lucide-react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[999999999] group cursor-pointer transition-all duration-300 ${
          isOpen
            ? "opacity-0 pointer-events-none scale-0"
            : "opacity-100 scale-100"
        } chat-gradient-blue text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300`}
      >
        {/* Icon */}
        <MessageCircle size={24} className="drop-shadow-sm relative z-10" />

        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-xs font-bold text-white">1</span>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>

        {/* Background Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 opacity-30 blur-xl animate-pulse"></div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-xl relative">
            <span className="font-medium">Cần hỗ trợ? Chat ngay!</span>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </button>
      <div
        className={`fixed bottom-4 right-4 z-[999999999] transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-0 pointer-events-none"
        }`}
      >
        <ChatWindow onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
