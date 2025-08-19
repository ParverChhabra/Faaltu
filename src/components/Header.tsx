import React from 'react'
import { Settings, Github, ExternalLink } from 'lucide-react'

interface HeaderProps {
  onConfigClick: () => void;
  hasValidConfig: boolean;
}

const Header: React.FC<HeaderProps> = ({ onConfigClick, hasValidConfig }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AE</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Event Manager</span>
            </div>
            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
              v2.0
            </span>
            {hasValidConfig && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Connected
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onConfigClick}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                hasValidConfig 
                  ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100' 
                  : 'text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">
                {hasValidConfig ? 'Settings' : 'Configure'}
              </span>
            </button>
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">API Docs</span>
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header