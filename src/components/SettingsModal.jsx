import React, { useState, useEffect } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsModal({ open, onClose }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const resetDeleteAccount = () => {
    setShowDeletePopup(false);
    setUsername("");
    setReason("");
    setShowSuccess(false);
  };

  // Auto-redirect after success
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        resetDeleteAccount();
        onClose();
        navigate("/"); 
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, onClose, navigate]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-opacity-75 flex items-center justify-center z-50 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetDeleteAccount();
          onClose();
        }
      }}
    >
      {/* Settings modal */}
      {!showDeletePopup && !showSuccess && (
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-6 relative animate-in fade-in zoom-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-700">Avatar</h3>

            <div className="relative w-20 h-20">
              <div className="w-20 h-20 rounded-full bg-gray-300 border flex items-center justify-center overflow-hidden">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload icon */}
              <label
                htmlFor="profileUpload"
                className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3M12 6v6"
                  />
                </svg>
                <input type="file" id="profileUpload" className="hidden" />
              </label>
            </div>
          </div>

          {/* Username */}
          <div>
            <h3 className="text-left text-sm font-medium text-gray-700 mb-1">
              Username
            </h3>
            <input
              type="text"
              placeholder="Max D. Praise"
              className="w-full border border-gray-300 rounded-md px-3 py-2 font-semibold text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
          </div>

          {/* Email */}
          <div>
            <h3 className="text-left text-sm text-gray-700 mb-1">
              Email Address
            </h3>
            <input
              type="email"
              placeholder="12345firstduke@gmail.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 font-semibold text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
          </div>

          {/* Change password */}
          <div className="flex items-center pb-0 justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md">
            <p className="text-sm text-gray-700">Change Password</p>
            <ArrowRight size={18} className="text-gray-400" />
          </div>

          {/* Delete account */}
          <div
            onClick={() => setShowDeletePopup(true)}
            className="flex items-center pt-0 justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md"
          >
            <p className="text-sm text-red-600">Delete My Account</p>
            <ArrowRight size={18} className="text-red-400" />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button className="bg-amber-800 text-white px-5 py-2 rounded-md text-sm hover:bg-amber-900 transition cursor-pointer">
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {showDeletePopup && !showSuccess && (
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-5 relative animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-800">Delete My Account</h2>
            <button
              onClick={() => setShowDeletePopup(false)}
              className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-left text-xs text-gray-600">
            We’ll be sad to see you go, but your data will be fully erased.
          </p>

          <div>
            <label className="block text-left text-xs text-gray-700 mb-1">
              Enter your username (“Max D. Praise”) to complete this action
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
          </div>

          <div>
            <label className="block text-left text-sm text-gray-700 mb-1">
              Tell us the reason for deleting your account (Optional)
            </label>
            <textarea
              placeholder="Tell us more..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-800 resize-none"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                if (username.trim() === "Max D. Praise") {
                  setShowSuccess(true);
                } else {
                  alert("Please enter your correct username to proceed.");
                }
              }}
              className="bg-red-600 text-white px-5 py-2 rounded-md text-sm hover:bg-red-700 transition cursor-pointer"
            >
              Delete My Account
            </button>

            <button
              onClick={() => resetDeleteAccount()}
              className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success view */}
      {showSuccess && (
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
          <Check 
            size={72}
            className="text-amber-800 mb-4 animate-bounce"
            strokeWidth={1.2}
          />
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Account Deleted Successfully
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Your account has been closed successfully. Goodbye for now.
          </p>

          <button
            onClick={() => {
              setShowSuccess(false);
              onClose();
              navigate("/");
            }}
            className="bg-amber-800 text-white px-6 py-2 rounded-md text-sm hover:bg-amber-900 transition cursor-pointer"
          >
            Go to Homepage
          </button>
        </div>
      )}
    </div>
  );
}
