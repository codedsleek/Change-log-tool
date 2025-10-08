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

  return (
    <div
      ref={panelRef}
      className="flex-1 flex flex-col  bg-white shadow-xl border-l border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
        {/* Left side - Back button */}
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-amber-800 text-sm font-medium "
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </button>
        </div>

        {/* Right side - Actions + Profile */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm text-gray-600 hover:text-amber-800 cursor-pointer">
              <Users size={16} className="mr-1" />
              Invite People
            </button>
            <button className="flex items-center text-sm text-gray-600 hover:text-amber-800 cursor-pointer">
              <Share2 size={16} className="mr-1" />
              Share Project
            </button>
            <button className="flex items-center text-sm text-gray-600 hover:text-amber-800 cursor-pointer">
              <FileText size={16} className="mr-1" />
              Export PDF
            </button>
          </div>

          {/* Profile avatar */}
          <button className="w-8 h-8 rounded-sm bg-purple-500 hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-800 focus:ring-offset-2 cursor-pointer"></button>

          
        </div>
      </div>


      {/* Body */}
      {/* Body */}
      <div className="p-6 overflow-y-auto">
        {/* Title and subtitle */}
        <div className="text-left mb-3">
          <h1 className="text-xl font-semibold text-gray-900">
            {project?.title ?? "Wren Finance App"}
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl mx-auto">
            {project?.description ??
              "Wren is a personal finance app that helps you track bills, stay ahead of due dates, get clear summaries, and avoid costly late fees."}
          </p>
        </div>

        {/* Meta row + New Log button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{project?.daysAgo ?? "2"} days ago</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{project?.people ?? "3"} people</span>
            </div>
          </div>
          
        </div>

        {/* Search logs */}
        <div className="grid grid-cols-3 items-center gap-3 mb-6 ">
          <input
            type="text"
            placeholder="Search Logs..."
            className="col-span-2 h-10 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
          />
          <button className="h-10 bg-amber-800 text-white px-4 py-2 rounded-sm text-xs hover:bg-amber-900 transition cursor-pointer">
            + New Log
          </button>
        </div>

        {/* Logs list */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <article
              key={i}
              className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Homepage Layout Complete
                  </h3>
                  <p className="text-xs text-left text-gray-500">Design Review</p>
                </div>
                <div className="text-xs text-gray-400">2 comments</div>
              </div>

              <ul className="list-disc list-inside text-sm text-left text-gray-600 space-y-1 mb-3">
                <li>Implemented responsive grid layout for hero section</li>
                <li>Refined typography for mobile responsiveness</li>
                <li>Tested layout in Safari and Edge browsers</li>
              </ul>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>18/09/2025</span>
                <button className="text-amber-800 text-xs hover:underline">
                  + New Log
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}
