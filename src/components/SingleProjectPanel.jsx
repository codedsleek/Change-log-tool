import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, Users, Share2, FileText,
  Clock, MessageSquare, MoreHorizontal,
  Dot, PencilLine, Link,
} from "lucide-react";

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function SingleProjectPanel({ project, isOpen, onClose }) {
  const panelRef = useRef(null);
  const exportRef = useRef(null);
  const menuRefs = useRef({});

  const [showNewLogPopup, setShowNewLogPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [openLogId, setOpenLogId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [commentsByLog, setCommentsByLog] = useState({
    1: [
      { id: 1, author: "Jamie Smith", date: "20/09/2025", text: "Great job, Jamie! I like the new notification settings." },
      { id: 2, author: "Alex Davies", date: "20/09/2025", text: "Thanks for implementing the user suggestions!" },
      { id: 3, author: "Rose Carter", date: "20/09/2025", text: "The onboarding process is much easier now." },
    ],
    2: [
      { id: 1, author: "Samuel Saidu", date: "18/09/2025", text: "Looks great! The mobile version is much better now." },
    ],
  });
  const [newCommentByLog, setNewCommentByLog] = useState({});
  const [logDetails, setLogDetails] = useState([""]);

  const addDetail = () => setLogDetails(prev => [...prev, ""]);
  const removeDetail = index => {
    setLogDetails(prev => prev.filter((_, i) => i !== index).length ? prev.filter((_, i) => i !== index) : [""]);
  };
  const handleDetailChange = (index, value) => {
    setLogDetails(prev => prev.map((d, i) => (i === index ? value : d)));
  };

  // Close settings/menu on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (showSettings && exportRef.current && !exportRef.current.contains(e.target)) setShowSettings(false);
      if (openMenuId) {
        const openMenu = menuRefs.current[openMenuId];
        if (openMenu && !openMenu.contains(e.target)) setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSettings, openMenuId]);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = e => {
      if (e.key !== "Escape") return;
      if (showNewLogPopup) setShowNewLogPopup(false);
      else if (isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showNewLogPopup, isOpen, onClose]);

  // Disable body scroll when new log popup is open
  useEffect(() => {
    document.body.style.overflow = showNewLogPopup ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showNewLogPopup]);

  if (!isOpen) return null;

  const handleAddComment = logId => {
    const text = (newCommentByLog[logId] || "").trim();
    if (!text) return;

    const newComment = {
      id: crypto.randomUUID(),
      author: "You",
      date: new Date().toLocaleDateString("en-GB"),
      text,
    };

    setCommentsByLog(prev => ({ ...prev, [logId]: [...(prev[logId] || []), newComment] }));
    setNewCommentByLog(prev => ({ ...prev, [logId]: "" }));
  };

  const logs = [
    {
      id: 1,
      title: "Feature Enhancement",
      subtype: "User Feedback Implementation",
      bullets: [
        "Integrated user suggestions for bill tracking",
        "Improved notification settings for reminders",
        "Streamlined onboarding process for new users",
      ],
      date: "20/09/2025",
      daysAgo: "2 days ago",
    },
    {
      id: 2,
      title: "Security Upgrade",
      subtype: "Data Protection Review",
      bullets: [
        "Enhanced encryption for user data",
        "Implemented two-factor authentication",
        "Conducted a thorough security audit",
      ],
      date: "21/09/2025",
      daysAgo: "2 days ago",
    },
  ];

  return (
    <div
      ref={panelRef}
      className="flex-1 flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-amber-800 hover:underline text-sm font-medium cursor-pointer"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <button className="flex items-center text-sm text-gray-600 hover:text-amber-800 hover:underline cursor-pointer">
            <Users size={16} className="mr-1" /> Invite People
          </button>
          <button className="flex items-center text-sm text-gray-600 hover:text-amber-800 hover:underline cursor-pointer">
            <Link size={16} className="mr-1" /> Share Project
          </button>
          <div ref={exportRef} className="relative">
            <button
              onClick={() => setShowSettings(prev => !prev)}
              className="flex items-center text-sm text-gray-600 hover:text-amber-800 hover:underline cursor-pointer"
            >
              <FileText size={16} className="mr-1" /> Export PDF
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-slideDownFadeIn origin-top transition-all duration-200">
                <button
                  onClick={() => { setShowSettings(false); console.log("Exporting WITH comments..."); }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-150 rounded-t-lg"
                >
                  Export with comments
                </button>
                <button
                  onClick={() => { setShowSettings(false); console.log("Exporting WITHOUT comments..."); }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-150 rounded-b-lg"
                >
                  Export without comments
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Project info */}
        <div className="mb-6">
          <h1 className="text-left text-xl font-semibold text-gray-900">{project?.title ?? "Wren Finance App"}</h1>
          <p className="text-left text-sm text-gray-500 mt-1 max-w-3xl">
            {project?.description ?? "Wren is a personal finance app that helps you track bills, stay ahead of due dates, and avoid late fees."}
          </p>
        </div>

        {/* Search and new log */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Search Logs..."
              className="w-full border border-gray-200 rounded-lg px-4 h-8 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowNewLogPopup(true)}
              className="bg-amber-800 text-white px-8 h-8 rounded-sm text-sm hover:bg-amber-900 transition cursor-pointer"
            >
              + New Log
            </button>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-6">
          {logs.map(log => {
            const comments = commentsByLog[log.id] || [];
            return (
              <article key={log.id} className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">{log.title}</h3>
                    <p className="text-xs text-left text-gray-500">{log.subtype}</p>
                  </div>

                  <div ref={el => (menuRefs.current[log.id] = el)} className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === log.id ? null : log.id)}
                      className="text-gray-400 hover:text-amber-800 p-1 rounded cursor-pointer"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {openMenuId === log.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-slideDownFadeIn origin-top transition-all duration-200">
                        <button
                          onClick={() => { setOpenMenuId(null); console.log(`Editing log: ${log.id}`); }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-150 rounded-t-lg cursor-pointer"
                        >
                          <PencilLine size={14} className="mr-2 text-gray-500" /> Edit log
                        </button>
                        <button
                          onClick={() => { setOpenMenuId(null); console.log(`Sharing log link: ${log.id}`); }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-150 rounded-b-lg cursor-pointer"
                        >
                          <Link size={14} className="mr-2 text-gray-500" /> Share log link
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="list-disc list-inside text-sm text-left text-gray-600 space-y-1 mb-3">
                  {log.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                </ul>

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} />
                    <span>{log.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-gray-400">
                      <Clock size={14} />
                      <Dot size={12} />
                      <span>{log.daysAgo}</span>
                    </div>
                    <button
                      onClick={() => setOpenLogId(openLogId === log.id ? null : log.id)}
                      className="inline-flex items-center gap-2 border border-gray-200 rounded-sm px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <MessageSquare size={12} />
                      <span>{comments.length} Comments</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {openLogId === log.id && (
                  <div className="mt-4 border-t pt-4">
                    <div className="space-y-3 pr-2">
                      {comments.map(c => (
                        <div key={c.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700">
                            {c.author.split(" ").map(s => s[0]).slice(0, 2).join("")}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <p className="text-sm font-semibold text-black">{c.author}</p>
                              <Dot size={12} className="text-gray-400 relative top-[1.5px]" />
                              <p className="text-xs text-gray-400">{c.date}</p>
                            </div>
                            <p className="text-left text-xs text-gray-600 mt-1">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="mt-4">
                      <textarea
                        maxLength={200}
                        value={newCommentByLog[log.id] || ""}
                        onChange={e => setNewCommentByLog(prev => ({ ...prev, [log.id]: e.target.value }))}
                        placeholder="Write a comment..."
                        rows={3}
                        className="w-full bg-gray-100 text-gray-500 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
                      />
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => handleAddComment(log.id)}
                          className="bg-amber-800 text-white px-4 py-2 rounded-md text-sm hover:bg-amber-900 transition cursor-pointer"
                        >
                          Add comment
                        </button>
                        <button
                          onClick={() => setOpenLogId(null)}
                          className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
