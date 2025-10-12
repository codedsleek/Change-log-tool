import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Plus, Home, Settings, HelpCircle, Clock, Users, MessageSquare,
  MoreHorizontal, NotepadText, CornerDownLeft, ChevronUp, ChevronDown,
  LogOut, X, ArrowRight, Folder, Dot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateProjectModal from './components/CreateProjectModal';
import SingleProjectPanel from './components/SingleProjectPanel';
import SettingsModal from './components/SettingsModal';
import SupportModal from './components/SupportModal';

// Header Component
function Header({ showCommentsSidebar, setShowCommentsSidebar, showProfileDropdown, setShowProfileDropdown, dropdownRef, handleOpenSettings }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Home</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCommentsSidebar(!showCommentsSidebar)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm cursor-pointer"
          > 
            <MessageSquare size={16} />
            <span>New Comments</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-8 h-8 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
            />
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {/* Profile Info */}
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Avatar</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Search size={16} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Username</span>
                      <span className="text-sm font-medium text-gray-900">Max D. Praise</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Email</span>
                      <span className="text-sm text-gray-900">firstduke@gmail.com</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Password</span>
                      <span className="text-sm text-gray-900">••••••••</span>
                    </div>
                  </div>
                </div>

                {/* Sign out */}
                <div className="px-4 py-3 border-t border-gray-200">
                  <button className="flex items-center justify-between text-red-600 hover:text-red-700 text-sm w-full">
                    <span>Signout</span>
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({ projects, searchQuery, setSearchQuery, onOpenProject, onNewProject }) {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="text-left mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Khronicle</h1>
        <p className="text-gray-600 text-xs">
          Track project changes and collaborate with your team through comments
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">My Projects</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-amber-800"
              />
            </div>
            <button
              className="flex items-center space-x-2 bg-amber-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors cursor-pointer"
              onClick={onNewProject}
            >
              <Plus size={16} />
              <span>New Project</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProject(project)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Folder size={12} />
                  <h3 className="font-medium text-gray-900 text-sm truncate">{project.title}</h3>
                </div>
                <MoreHorizontal size={16} className="text-gray-400 hover:text-gray-600" />
              </div>

              <p className="text-gray-600 text-xs mb-4 leading-relaxed">{project.description}</p>

              <div className="flex mt-1 items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <Dot size={12} />
                    <span>{project.daysAgo} days ago</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <Dot size={12} />
                    <span>{project.people} people</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare size={12} />
                  <span>{project.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Comments Sidebar Component 
function CommentsSidebar({ show, comments, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="commentsSidebar"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-40 overflow-y-auto"
        >
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">Recent Activity</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-amber-800 cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-100 rounded-lg p-4 shadow-xs">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                    {comment.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{comment.user}</p>
                      <Dot size={12} className='text-gray-400 relative top-[1.5px]'/>
                      <p className="text-xs text-gray-400">{comment.timestamp}</p>
                    </div>
                    <p className="text-left text-xs text-gray-600 mt-1">{comment.message}</p>

                    {/* Project tag row */}
                    {comment.project && (
                    <div className="mt-2 text-xs text-gray-500">
                      <button
                        onClick={() => setShowSupportModal(true)}
                        className="flex items-center justify-between w-full text-gray-600 hover:text-amber-800 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <Folder size={12} />
                          <span>{comment.project}</span>
                        </div>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mt-2">
              <button className="text-sm text-amber-700 hover:underline cursor-pointer">Mark all as read</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// Main Dashboard Component
export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCommentsSidebar, setShowCommentsSidebar] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const dropdownRef = useRef(null);

  const projects = [
    { id: 1, title: 'Website Redesign', description: 'Complete overhaul of company website with new colors and assets', daysAgo: 2, people: 3, comments: 2 },
    { id: 2, title: 'Wren bill managing mobile app', description: 'Enhancements to user interface and new features added for better user experience.', daysAgo: 2, people: 4, comments: 3 },
    { id: 3, title: 'SEO Optimization', description: 'Improved site visibility through keyword research and content updates', daysAgo: 2, people: 3, comments: 2 }
  ];

  const comments = [
    { id: 1, user: 'Jane Doe', timestamp: 'Sep 20, 09:45', message: 'The new color palette is fantastic!', project: 'SEO Optimization' },
    { id: 2, user: 'Rose McIntyre', timestamp: 'Sep 20, 09:25', message: 'What keywords did you use for the SEO optimization project?', project: 'SEO Optimization' },
    { id: 3, user: 'Will Barns', timestamp: 'Sep 19, 10:15', message: 'The UI enhancements are great.', project: 'Website Redesign' },
  ];

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setIsProjectOpen(true);
  };

  // Close dropdown / sidebars when clicking outside + ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowProfileDropdown(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowProfileDropdown(false);
        setShowCommentsSidebar(false);
        setShowNewProjectModal(false);
        setIsProjectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 h-full shrink-0 bg-stone-50 flex flex-col border-r border-gray-200">
        <div className="p-4 flex items-center space-x-2">
          <div className="w-6 h-6 bg-amber-800 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">K</span>
          </div>
          <span className="font-semibold text-gray-900">Khronicle</span>
        </div>

        <div className="p-4">
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="w-full flex items-center space-x-2 bg-amber-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>New Project</span>
          </button>
        </div>

        {/* Sidebar projects */}
        <div className="flex-1 px-4">
          <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Projects</h3>
          <div className="space-y-1">
            {projects.map(proj => (
              <button
                key={proj.id}
                onClick={() => handleOpenProject(proj)}
                className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 bg-gray-300 rounded-sm flex-shrink-0"></div>
                <span className='truncate block text-left w-full'>{proj.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="p-4 space-y-1">
          <button
            onClick={() => setShowSupportModal(true)}
            className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors cursor-pointer"
          >
            <HelpCircle size={16} />
            <span>Support</span>
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors cursor-pointer"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative min-h-0">
        {!isProjectOpen ? (
          <>
            <Header
              showCommentsSidebar={showCommentsSidebar}
              setShowCommentsSidebar={setShowCommentsSidebar}
              showProfileDropdown={showProfileDropdown}
              setShowProfileDropdown={setShowProfileDropdown}
              dropdownRef={dropdownRef}
              handleOpenSettings={() => setShowSettingsModal(true)}
            />
            <DashboardContent
              projects={projects}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenProject={handleOpenProject}
              onNewProject={() => setShowNewProjectModal(true)}
            />
          </>
        ) : (
          <SingleProjectPanel
            key={selectedProject?.id}
            project={selectedProject || {}}
            isOpen={isProjectOpen}
            commentsOpen={showCommentsSidebar}
            onClose={() => setIsProjectOpen(false)}
            onOpenSettings={() => setShowSettingsModal(true)}
          />
        )}
      </div>

      {/* Comments Sidebar */}
      <CommentsSidebar show={showCommentsSidebar} comments={comments} onClose={() => setShowCommentsSidebar(false)} />

      {/* Modals */}
      {showNewProjectModal && <CreateProjectModal onClose={() => setShowNewProjectModal(false)} />}
      <SettingsModal open={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      {showSupportModal && <SupportModal open={showSupportModal} onClose={() => setShowSupportModal(false)} />}
    </div>
  );
}
