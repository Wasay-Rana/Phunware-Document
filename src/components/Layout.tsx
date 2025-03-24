import React from 'react';
import { NavLink } from 'react-router-dom';
import { Upload, MessageSquare, FileBox } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <FileBox className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  MBOX Processor
                </span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 py-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & Process
                </NavLink>
                <NavLink
                  to="/chat"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 py-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  AI Chat
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;