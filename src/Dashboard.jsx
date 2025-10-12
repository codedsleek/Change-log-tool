import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Plus, Home, Settings, HelpCircle, Clock, Users, MessageSquare,
  MoreHorizontal, Share, NotepadText, CornerDownLeft, ChevronUp, FileCheck,
  ChevronDown , Square, Link,
  LogOut, X, ArrowRight, Folder, Dot, MessageSquare as MsgIcon
} from 'lucide-react';
import CreateProjectModal from "./components/CreateProjectModal";
import SingleProjectPanel from "./components/SingleProjectPanel.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import SupportModal from "./components/SupportModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard({ onOpenSettings }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCommentsSidebar, setShowCommentsSidebar] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const dropdownRef = useRef(null);
  const commentsSidebarRef = useRef(null);
  const searchModalRef = useRef(null);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const handleOpenSettings = () => setShowSettingsModal(true);
  const handleCloseSettings = () => setShowSettingsModal(false);
  const [showSupportModal, setShowSupportModal] = useState(false);



  // Close dropdown / sidebars when clicking outside + ESC
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (commentsSidebarRef.current && !commentsSidebarRef.current.contains(event.target)) {
        setShowCommentsSidebar(false);
      }
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setShowSearchModal(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShowProfileDropdown(false);
        setShowCommentsSidebar(false);
        setShowSearchModal(false);
        setShowNewProjectModal(false);
        setIsProjectOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const hasOpenModal = showNewProjectModal || showSearchModal || showSettingsModal || showSupportModal || showCommentsSidebar;

    if (hasOpenModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [showNewProjectModal, showSearchModal, showSettingsModal, showSupportModal, showCommentsSidebar]);

  const [projects] = useState([
    { id: 1, title: 'Website Redesign', description: 'Complete overhaul of company website with new colors and assets', daysAgo: 2, people: 3, comments: 2 },
    { id: 2, title: 'Wren bill managing mobile app', description: 'Enhancements to user interface and new features added for better user experience.', daysAgo: 2, people: 4, comments: 3 },
    { id: 3, title: 'SEO Optimization', description: 'Improved site visibility through keyword research and content updates', daysAgo: 2, people: 3, comments: 2 }
  ]);

  const handleOpenProject = (project) => {
    console.log('open project', project?.id, project?.title);
    setSelectedProject(project);
    setIsProjectOpen(true);
  };

  const [comments] = useState([
    {
      id: 1,
      user: 'Jane Doe',
      timestamp: 'Sep 20, 09:45',
      message: 'The new color palette is fantastic!',
      project: 'SEO Optimization'
    },
    {
      id: 2,
      user: 'Rose McIntyre',
      timestamp: 'Sep 20, 09:25',
      message: 'What keywords did you use for the SEO optimization project?',
      project: 'SEO Optimization'
    },
    {
      id: 3,
      user: 'Will Barns',
      timestamp: 'Sep 19, 10:15',
      message: 'The UI enhancements are great.',
      project: 'Website Redesign'
    },
  ]);


  const [searchResults] = useState({
    projects: [
      { id: 1, name: 'User Testing Phase', type: 'project' },
      { id: 2, name: 'Launch Preparation', type: 'project' },
    ],
    logs: [
      { id: 1, name: 'Feedback Collection Underway', type: 'log' },
      { id: 2, name: 'Final QA and Deployment Checklist', type: 'log' }
    ],
    comments: [
      { id: 1, user: 'Laura Brown', date: 'Sep 20, 09:25', message: 'The adjustments to the UI have made a significant impact. Well done!', type: 'comment' },
      { id: 2, user: 'Michael Johnson', date: 'Sep 19, 10:15', message: 'I appreciate the new color scheme; it really enhances usability.', type: 'comment' }
    ]
  });

  const sidebarItems = [
    { icon: Search, label: 'Search workspace', active: false, onClick: () => setShowSearchModal(true) },
    { icon: Home, label: 'All Projects', active: true, onClick: () => {} }
  ];

  const bottomSidebarItems = [
    { icon: HelpCircle, label: 'Support' },
    { icon: Settings, label: 'Settings' }
  ];
  console.log("showSettingsModal:", showSettingsModal);


  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 h-full shrink-0 bg-stone-50 flex flex-col border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-amber-800 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <span className="font-semibold text-gray-900">Khronicle</span>
          </div>
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

        <div className="flex-1 px-4">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-3 px-2 py-2 text-sm rounded-md transition-colors ${
                  item.active ? 'bg-gray-100 text-amber-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Projects</h3>
            <div className="space-y-1">
              {projects.map((proj) => (
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
        </div>

        <div className="p-4 ">
          <div className="space-y-1">
            <div className="space-y-1">
              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors cursor-pointer"
              >
                <HelpCircle size={16} />
                <span>Support</span>
              </button>


              <button
                onClick={handleOpenSettings}
                className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors cursor-pointer"
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative min-h-0">
        {!isProjectOpen ? (
          <>
            {/* Header */}
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
                              <Link size={16} />
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

            {/* Dashboard Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="text-left mb-8">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Khronicle</h1>
                <p className="text-gray-600 text-xs">Track project changes and collaborate with your team through comments</p>
              </div>

              {/* My Projects Section */}
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
                      onClick={() => setShowNewProjectModal(true)}
                    >
                      <Plus size={16} />
                      <span>New Project</span>
                    </button>
                  </div>
                </div>

                {/* Project Cards (restored layout) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleOpenProject(project)}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                         <Folder size={12} />

                          <h3 className="font-medium text-gray-900 text-sm text-left">
                            {project.title}
                          </h3>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      <p className="text-gray-600 text-xs mb-4 leading-relaxed text-left">
                        {project.description}
                      </p>
                      <div className="flex-grow border-t border-gray-200"></div>

                      <div className="flex mt-1 items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center space-x">
                            <Clock size={12} />
                            <Dot size={12} />
                            <span>{project.daysAgo} days ago</span>
                          </div>

                          <div className="flex items-center space-x">
                            <Users size={12} />
                            <Dot size={12} />
                            <span>{project.people} people</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <MessageSquare size={12} />
                          <span>{project.comments}</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </div>
          </>
        ) : (
          // Show SingleProjectPanel (when a project is open)
          <div className="flex-1 h-full overflow-hidden">
            <SingleProjectPanel
              key={selectedProject?.id}
              project={selectedProject|| {}}
              isOpen={isProjectOpen}
              commentsOpen={showCommentsSidebar}
              onClose={() => setIsProjectOpen(false)}
              onOpenSettings={handleOpenSettings}
            />
          </div>
        )}
      </div>

      {/* Comments Sidebar (animated) */}
      <AnimatePresence>
        {showCommentsSidebar && (
          <motion.div
            ref={commentsSidebarRef}
            key="commentsSidebar"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-40 overflow-y-auto"
          >
            {/* header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-900">Recent Activity</h2>
              <button onClick={() => setShowCommentsSidebar(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            {/* list */}
            <div className="p-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                      {comment.user.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center ">
                        <p className="text-sm font-medium text-gray-900 truncate">{comment.user}</p>
                          <Dot size={12} className='text-gray-400 relative top-[1.5px]'/>

                        <p className="text-xs text-gray-400">{comment.timestamp}</p>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">{comment.message}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div
                      className="flex flex-col"
                      style={{ paddingLeft: 'calc(1rem + 2rem + 0.75rem)' }}
                    >
                      <div className="border-t border-gray-100 pt-3 flex items-center justify-between group transition-all duration-200">
                        <button
                          className="flex items-center space-x-2 text-sm text-gray-500 hover:text-amber-800 transition-colors duration-200 cursor-pointer"
                        >
                          <div className="w-5 h-5 bg-gray-50 rounded flex items-center justify-center transition-colors duration-200 group-hover:bg-amber-50">
                            <Folder size={14} className="transition-colors duration-200 group-hover:text-amber-800" />
                          </div>
                          <span className="truncate border-b border-transparent group-hover:border-amber-800 transition-all duration-200">
                            {comment.project}
                          </span>
                        </button>

                        <button
                          className="text-gray-400 hover:text-amber-800 transform transition-all duration-200 group-hover:translate-x-1"
                        >
                          <ArrowRight size={16} className="transition-colors duration-200 group-hover:text-amber-800" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}

              {/* footer action */}
              <div className="text-center mt-2">
                <button className="text-sm text-amber-700 hover:underline cursor-pointer">Mark all as read</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* New Project Modal */}
      {showNewProjectModal && <CreateProjectModal onClose={() => setShowNewProjectModal(false)} />}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 bg-black/50 backdrop-opacity-75 animate-fadeIn">
          <div ref={searchModalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workspace"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-amber-800"
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {/* Projects */}
              <div className="p-6">
                <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Projects</h3>
                <div className="">
                  {searchResults.projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        <Folder size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-900">{project.name}</span>
                      </div>
                      <MoreHorizontal size={16} className='hover:text-amber-800 cursor-pointer' />

                    </div>
                  ))}
                </div>
              </div>
              

              {/* Logs */}
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Logs</h3>
                <div className="space-y-2">
                  {searchResults.logs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <NotepadText size={16} className="text-gray-500" />
                        <span className="text-sm  text-gray-900">{log.name}</span>
                      </div>
                      <ArrowRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Comments</h3>
                <div className="space-y-2">
                  {searchResults.comments.map((comment) => (
                    <div key={comment.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{comment.user[0]}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1">
                            <p className="text-sm font-medium text-gray-900">{comment.user}</p>
                            <Dot size={12} className="text-gray-400 relative top-[1px]" />
                            <p className="text-xs text-gray-400">{comment.date}</p>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{comment.message}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-3 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="border border-gray-300 rounded px-1.5 py-0.5 text-gray-600 text-[10px]">
                        <ChevronUp size={12} />
                      </span>
                      <span className="border border-gray-300 rounded px-1.5 py-0.5 text-gray-600 text-[10px]">
                        <ChevronDown size={12} />
                      </span>
                    </div>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="border border-gray-300 rounded px-2 py-0.5 text-gray-600 text-[10px]">                        
                      <CornerDownLeft size={12} />
                    </span>
                    <span>Open</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="border border-gray-300 rounded px-2 py-0.5 text-gray-600 text-[10px]">ESC</span>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SettingsModal open={showSettingsModal} onClose={() => setShowSettingsModal(false)} />

      {showSupportModal && (
        <SupportModal open={showSupportModal} onClose={() => setShowSupportModal(false)} />
      )}

    </div>
  );
}
 
