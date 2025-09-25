import React, { useState } from 'react';
import { Search, Plus, Home, Settings, HelpCircle, Clock, Users, MessageSquare, MoreHorizontal } from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects] = useState([
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Complete overhaul of company website with new colors and assets',
      daysAgo: 2,
      people: 3,
      comments: 2
    },
    {
      id: 2,
      title: 'Website Redesign',
      description: 'Complete overhaul of company website with new colors and assets',
      daysAgo: 2,
      people: 3,
      comments: 5
    },
    {
      id: 3,
      title: 'Website Redesign',
      description: 'Complete overhaul of company website with new colors and assets',
      daysAgo: 2,
      people: 3,
      comments: 2
    }
  ]);

  const sidebarItems = [
    { icon: Search, label: 'Search workspace', active: false },
    { icon: Home, label: 'All Projects', active: true }
  ];

  const bottomSidebarItems = [
    { icon: HelpCircle, label: 'Support' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-amber-800 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <span className="font-semibold text-gray-900">Khronicle</span>
          </div>
        </div>

        {/* New Project Button */}
        <div className="p-4">
          <button className="w-full flex items-center space-x-2 bg-amber-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors">
            <Plus size={16} />
            <span>New Project</span>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-2 py-2 text-sm rounded-md transition-colors ${
                  item.active 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Projects
            </h3>
            <div className="space-y-1">
              <button className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <span>Website Redesign</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <span>Website Redesign</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                <span>Website Redesign</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Items */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-1">
            {bottomSidebarItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Home</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm">
                <MessageSquare size={16} />
                <span>New Comments</span>
              </button>
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome to Khronicle
            </h1>
            <p className="text-gray-600">
              Track project changes and collaborate with your team through comments
            </p>
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
                <button className="flex items-center space-x-2 bg-amber-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors">
                  <Plus size={16} />
                  <span>New Project</span>
                </button>
              </div>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {project.title}
                      </h3>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{project.daysAgo} days ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{project.people}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare size={12} />
                        <span>{project.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}