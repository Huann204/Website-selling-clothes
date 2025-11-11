import React, { useState, useContext, useEffect } from "react";
import AdminLayout from "@admin/components/Layout/AdminLayout";
import {
  Store,
  Mail,
  Globe,
  Save,
  AlertCircle,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  CheckCircle,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { SiZalo } from "react-icons/si";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@shared/lib/axios";

const Settings = () => {
  const { admin } = useContext(AuthContext);
  const token = admin?.token;
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("general");
  const [saveStatus, setSaveStatus] = useState(null);

  const { data: generalSettings } = useQuery({
    queryKey: ["general-settings"],
    queryFn: async () => {
      const res = await api.get(`/api/info`);
      return res.data;
    },
    enabled: !!token,
  });

  // Fetch social settings
  const { data: socialSettings } = useQuery({
    queryKey: ["social-settings"],
    queryFn: async () => {
      const res = await api.get(`/api/social`);
      return res.data;
    },
    enabled: !!token,
  });

  const [generalForm, setGeneralForm] = useState({});
  const [socialForm, setSocialForm] = useState({});

  useEffect(() => {
    if (generalSettings) setGeneralForm(generalSettings);
  }, [generalSettings]);

  useEffect(() => {
    if (socialSettings) setSocialForm(socialSettings);
  }, [socialSettings]);

  // Update general settings
  const updateGeneralMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.put(`/api/info`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["general-settings"]);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    },
    onError: (error) => {
      console.error("Error saving settings:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    },
  });

  const updateSocialMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.put(`/api/social`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["social-settings"]);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    },
    onError: (error) => {
      console.error("Error saving social settings:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    },
  });

  const handleSave = (section) => {
    if (section === "general") {
      setSaveStatus("saving");
      updateGeneralMutation.mutate(generalForm);
    } else if (section === "social") {
      setSaveStatus("saving");
      updateSocialMutation.mutate(socialForm);
    }
  };

  const tabs = [
    { id: "general", label: "Tổng quan", icon: Store },
    { id: "social", label: "Mạng xã hội", icon: Globe },
  ];

  return (
    <AdminLayout
      title="Cài đặt hệ thống"
      activeLabel="Cài đặt"
      showBackButton={false}
      showSaveButton={false}
    >
      <div className="space-y-6">
        {/* Header with Save Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 sm:p-6 text-white">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">
              Cài đặt hệ thống
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Quản lý cấu hình và tùy chỉnh cửa hàng của bạn
            </p>
          </div>
          {saveStatus && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                saveStatus === "success"
                  ? "bg-green-500/20 border border-green-500/50"
                  : saveStatus === "error"
                  ? "bg-red-500/20 border border-red-500/50"
                  : "bg-blue-500/20 border border-blue-500/50"
              }`}
            >
              {saveStatus === "success" && (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Đã lưu thành công!
                  </span>
                </>
              )}
              {saveStatus === "error" && (
                <>
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Lỗi khi lưu!</span>
                </>
              )}
              {saveStatus === "saving" && (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span className="text-sm font-medium">Đang lưu...</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex border-b border-slate-200 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Thông tin cửa hàng
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tên cửa hàng
                    </label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        value={generalForm?.name || ""}
                        onChange={(e) =>
                          setGeneralForm({
                            ...generalForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email cửa hàng
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        value={generalForm?.email || ""}
                        onChange={(e) =>
                          setGeneralForm({
                            ...generalForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="tel"
                        value={generalForm?.phone || ""}
                        onChange={(e) =>
                          setGeneralForm({
                            ...generalForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Địa chỉ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        value={generalForm?.address || ""}
                        onChange={(e) =>
                          setGeneralForm({
                            ...generalForm,
                            address: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mô tả
                    </label>
                    <textarea
                      value={generalForm?.description || ""}
                      onChange={(e) =>
                        setGeneralForm({
                          ...generalForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleSave("general")}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Lưu thay đổi
                </button>
              </div>
            </div>
          )}

          {/* Social Media Settings */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Liên kết mạng xã hội
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Facebook
                    </label>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="url"
                        value={socialForm?.facebook || ""}
                        onChange={(e) =>
                          setSocialForm({
                            ...socialForm,
                            facebook: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://facebook.com/your-page"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Instagram
                    </label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="url"
                        value={socialForm?.instagram || ""}
                        onChange={(e) =>
                          setSocialForm({
                            ...socialForm,
                            instagram: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://instagram.com/your-account"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Zalo
                    </label>
                    <div className="relative">
                      <SiZalo className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="url"
                        value={socialForm?.zalo || ""}
                        onChange={(e) =>
                          setSocialForm({
                            ...socialForm,
                            zalo: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://zalo.me/your-account"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleSave("social")}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Lưu thay đổi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
