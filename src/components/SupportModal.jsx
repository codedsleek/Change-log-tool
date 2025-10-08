import React, { useState } from "react";
import { X } from "lucide-react";

export default function SupportModal({ open, onClose }) {
  const [reason, setReason] = useState("");

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
          <h2 className="text-lg font-semibold text-gray-800">Support</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-left text-sm text-gray-600">
          Send us your questions or concerns by sending us a mail
        </p>

        <div>
          <label className="text-left text-sm text-gray-700 mb-1 block">
            Reason for Reaching Out
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800 cursor-pointer"
          >
            <option value="">Select a reason</option>
            <option value="general">General Feedback</option>
            <option value="bug">Bug Fixing</option>
            <option value="feature">Feature Request</option>
            <option value="howto">How To</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition cursor-pointer"
          >
            Close
          </button>
          <button
            className="bg-amber-800 text-white px-5 py-2 rounded-md text-sm hover:bg-amber-900 transition cursor-pointer"
            onClick={() => {
              if (!reason) {
                alert("Please select a reason before sending.");
                return;
              }
              alert(`Mail sent for reason: ${reason}`);
              onClose();
            }}
          >
            Send Mail
          </button>
        </div>
      </div>
    </div>
  );
}
