import React from 'react'
import { Github, ExternalLink } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AE</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">AdminEventService</span>
            </div>
            <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
              v2.0
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
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