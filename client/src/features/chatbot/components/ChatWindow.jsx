import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { X, Send, MessageCircle, Minimize2 } from "lucide-react";
import "./ChatWidget.css";
import API_URL from "@/config";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            from: "bot",
            text: "Xin chào! Tôi là trợ lý ảo của cửa hàng. Tôi có thể giúp bạn tìm kiếm sản phẩm, tư vấn size, hoặc giải đáp các thắc mắc khác. Bạn cần hỗ trợ gì?",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);
  const [input, setInput] = useState("");
  // const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Dùng useMutation để gửi tin nhắn đến chatbot
  const { mutate: sendChatMessage, isPending } = useMutation({
    mutationFn: async (messageData) => {
      const res = await axios.post(`${API_URL}/api/chatbot`, messageData);
      return res.data;
    },
    onSuccess: (data) => {
      const botMsg = { from: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
      // setIsTyping(false);
    },
    onError: (error) => {
      console.error("Error:", error);
      const errorMsg = {
        from: "bot",
        text: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.",
      };
      setMessages((prev) => [...prev, errorMsg]);
      // setIsTyping(false);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // setIsTyping(true);

    // Gọi mutation để gửi tin nhắn
    sendChatMessage({
      messages: [...messages, userMsg],
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[calc(100vw-3rem)] h-[70vh] max-w-[280px] sm:bottom-6 sm:right-6 sm:w-80 sm:h-[420px] sm:max-w-none bg-white rounded-2xl shadow-2xl flex flex-col z-[99999] transition-all duration-300 border border-gray-200 backdrop-blur-sm chat-mobile-compact">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 flex justify-between items-center rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-xs">Hỗ trợ khách hàng</h3>
            <p className="text-xs text-blue-100">Trực tuyến</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onClose}
            className="w-7 h-7 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
            title="Minimize"
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-gray-50 to-white chat-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className="message-slide">
            <ChatMessage from={msg.from} text={msg.text} />
          </div>
        ))}

        {/* Typing Indicator */}
        {isPending && (
          <div className="flex justify-start message-slide">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={16} />
              </div>
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot-1"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot-2"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot-3"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
        <div className="flex items-center space-x-2">
          <div className="flex justify-center relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              rows="1"
              className="w-full resize-none border border-gray-200 rounded-2xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 max-h-16"
              placeholder="Nhập tin nhắn..."
              style={{
                minHeight: "36px",
                lineHeight: "18px",
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className=" w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Send size={16} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <button
            onClick={() => setInput("Tôi muốn tư vấn size")}
            className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 text-xs rounded-full transition-all duration-200 border border-gray-200 hover:border-blue-300 chat-hover-scale shadow-sm hover:shadow-md"
          >
            📏 Size
          </button>
          <button
            onClick={() => setInput("Sản phẩm này có màu gì?")}
            className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 text-xs rounded-full transition-all duration-200 border border-gray-200 hover:border-blue-300 chat-hover-scale shadow-sm hover:shadow-md"
          >
            🎨 Màu sắc
          </button>
          <button
            onClick={() => setInput("Chính sách đổi trả như thế nào?")}
            className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 text-xs rounded-full transition-all duration-200 border border-gray-200 hover:border-blue-300 chat-hover-scale shadow-sm hover:shadow-md"
          >
            🔄 Đổi trả
          </button>
        </div>
      </div>
    </div>
  );
}
