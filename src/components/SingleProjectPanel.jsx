import React, { useEffect, useRef } from "react";
import { X, ArrowLeft, Users, Share2, FileText, Clock } from "lucide-react";

export default function SingleProjectPanel({ project, isOpen, commentsOpen = false, onClose }) {
  const panelRef = useRef(null);

  // close on ESC (only when open)
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Position: leave room for left sidebar (w-64 = 16rem) and optionally for comments (w-80 = 20rem)
  const leftOffset = '16rem'; // left sidebar width (w-64)
  const rightOffset = commentsOpen ? '20rem' : '0';

  return (
    <div
      ref={panelRef}
      style={{ left: leftOffset, right: rightOffset }}
      className="fixed top-0 bottom-0 z-30 overflow-y-auto bg-white shadow-xl border-l border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-amber-800 flex items-center"
            aria-label="Back"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </button>

          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {project?.title ?? "Project Title"}
            </h1>
            <p className="text-sm text-gray-500">
              {project?.subtitle ?? "Short project subtitle or description"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-amber-800 flex items-center gap-2">
            <Users size={16} /> Invite People
          </button>
          <button className="text-sm text-gray-600 hover:text-amber-800 flex items-center gap-2">
            <Share2 size={16} /> Share Project
          </button>
          <button className="text-sm text-gray-600 hover:text-amber-800 flex items-center gap-2">
            <FileText size={16} /> Export PDF
          </button>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        <p className="text-gray-600 text-sm max-w-3xl">
          {project?.description ??
            "Wren is a personal finance app that helps you track bills, stay ahead of due dates, get clear summaries, and avoid costly late fees."}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span><Clock size={14} /> {project?.daysAgo ?? '2'} days ago</span>
          <span>•</span>
          <span>{project?.people ?? '3'} people</span>
        </div>

        {/* search logs */}
        <div>
          <input
            type="text"
            placeholder="Search Logs..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-700"
          />
        </div>

        {/* logs list (example) */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <article key={i} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Homepage Layout Complete</h3>
                  <p className="text-xs text-gray-500">Design Review</p>
                </div>
                <div className="text-xs text-gray-400">2 comments</div>
              </div>

              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-3">
                <li>Implemented responsive grid layout for hero section</li>
                <li>Refined typography for mobile responsiveness</li>
                <li>Tested layout in Safari and Edge browsers</li>
              </ul>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>18/09/2025</span>
                <button className="text-amber-800 text-xs">+ New Log</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
