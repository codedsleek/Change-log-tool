import React, { useState, useEffect } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsModal({ open, onClose }) {
  const [stage, setStage] = useState("main"); // "main" | "delete" | "success"
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const resetAll = () => {
    setStage("main");
    setUsername("");
    setReason("");
  };

  // auto close success screen
  useEffect(() => {
    if (stage === "success") {
      const timer = setTimeout(() => {
        resetAll();
        onClose();
        navigate("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [stage, onClose, navigate]);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      resetAll();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      {/* MAIN SETTINGS */}
      {stage === "main" && (
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-6 relative animate-in fade-in zoom-in">
          <Header title="Settings" onClose={onClose} />

          {/* Avatar */}
          <section className="flex items-center justify-between">
            <h3 className="text-sm text-gray-700">Avatar</h3>
            <AvatarUpload />
          </section>

          {/* Username */}
          <InputField label="Username" placeholder="Max D. Praise" />

          {/* Email */}
          <InputField
            label="Email Address"
            type="email"
            placeholder="12345firstduke@gmail.com"
          />

          {/* Options */}
          <div className="space-y-1">
            <OptionRow label="Change Password" />
            <OptionRow
              label="Delete My Account"
              color="red"
              onClick={() => setStage("delete")}
            />
          </div>

          {/* Footer */}
          <FooterButtons
            primaryLabel="Save Changes"
            onPrimary={() => {}}
            secondaryLabel="Close"
            onSecondary={onClose}
          />
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {stage === "delete" && (
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-5 relative animate-in fade-in slide-in-from-top-2">
          <Header title="Delete My Account" onClose={() => setStage("main")} />

          <p className="text-xs text-gray-600">
            We’ll be sad to see you go, but your data will be fully erased.
          </p>

          <InputField
            label='Enter your username (“Max D. Praise”) to complete this action'
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextareaField
            label="Tell us the reason for deleting your account (Optional)"
            placeholder="Tell us more..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <FooterButtons
            primaryLabel="Delete My Account"
            onPrimary={() =>
              username.trim() === "Max D. Praise"
                ? setStage("success")
                : alert("Please enter your correct username to proceed.")
            }
            primaryColor="red"
            secondaryLabel="Cancel"
            onSecondary={resetAll}
          />
        </div>
      )}

      {/* SUCCESS CARD */}
      {stage === "success" && (
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 flex flex-col items-center text-center animate-in fade-in zoom-in">
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
              resetAll();
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

/* ---------- Sub-Components ---------- */

function Header({ title, onClose }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        <X size={20} />
      </button>
    </div>
  );
}

function InputField({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-left text-sm text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
        {...props}
      />
    </div>
  );
}

function TextareaField({ label, ...props }) {
  return (
    <div>
      <label className="block text-left text-sm text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows={4}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-800 resize-none"
        {...props}
      />
    </div>
  );
}

function OptionRow({ label, color = "gray", onClick }) {
  const textColor =
    color === "red"
      ? "text-red-600 hover:bg-gray-50"
      : "text-gray-700 hover:bg-gray-50";
  const iconColor = color === "red" ? "text-red-400" : "text-gray-400";

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${textColor}`}
    >
      <p className="text-sm">{label}</p>
      <ArrowRight size={18} className={iconColor} />
    </div>
  );
}

function FooterButtons({
  primaryLabel,
  onPrimary,
  primaryColor = "amber",
  secondaryLabel,
  onSecondary,
}) {
  const primaryClasses =
    primaryColor === "red"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-amber-800 hover:bg-amber-900";

  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
      <button
        onClick={onPrimary}
        className={`${primaryClasses} text-white px-5 py-2 rounded-md text-sm transition cursor-pointer`}
      >
        {primaryLabel}
      </button>
      <button
        onClick={onSecondary}
        className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition cursor-pointer"
      >
        {secondaryLabel}
      </button>
    </div>
  );
}

function AvatarUpload() {
  return (
    <div className="relative w-20 h-20">
      <div className="w-20 h-20 rounded-full bg-gray-300 border flex items-center justify-center overflow-hidden">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
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
  );
}
