import React from "react";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
export default function ChatMessage({ from, text }) {
  const isUser = from === "user";

  return (
    <div
      className={`flex items-start space-x-3 ${
        isUser ? "flex-row-reverse space-x-reverse" : ""
      } ${isUser ? "user-message" : "bot-message"}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
          isUser
            ? "chat-gradient-blue text-white"
            : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600"
        }`}
      >
        {isUser ? (
          <img
            className="w-full h-full rounded-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/051/270/245/non_2x/cartoon-people-avatar-minimalist-human-avatar-versatile-icon-for-online-projects-an-avatar-for-the-profile-picture-of-someone-vector.jpg"
            alt=""
          />
        ) : (
          <Bot size={16} />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] ${
          isUser ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <div
          className={`px-4 py-3 w-full rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 hover:shadow-md ${
            isUser
              ? "chat-gradient-blue text-white rounded-br-sm"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm hover:border-gray-300"
          }`}
        >
          <p className="whitespace-pre-wrap break-words ">
            <ReactMarkdown>{text}</ReactMarkdown>
          </p>
        </div>

        {/* Timestamp */}
        <span
          className={`text-xs text-gray-400 mt-1 px-2 opacity-70 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
