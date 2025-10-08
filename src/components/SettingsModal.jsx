import React from "react";
import { X, ArrowRight } from "lucide-react";

export default function SettingsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-6 relative animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Avatar</h3>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border"
            />
            <button className="text-sm text-amber-700 hover:underline">
              Upload
            </button>
          </div>
        </div>

        {/* Username */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Username</h3>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
          />
        </div>

        {/* Email */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Email Address
          </h3>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
          />
        </div>

        {/* Change password */}
        <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md">
          <p className="text-sm text-gray-700">Change Password</p>
          <ArrowRight size={18} className="text-gray-400" />
        </div>

        {/* Delete account */}
        <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md">
          <p className="text-sm text-red-600">Delete My Account</p>
          <ArrowRight size={18} className="text-red-400" />
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button className="bg-amber-800 text-white px-5 py-2 rounded-md text-sm hover:bg-amber-900 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
