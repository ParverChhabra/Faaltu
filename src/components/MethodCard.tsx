import React from 'react'
import { ExternalLink, Code, FileText } from 'lucide-react'
import { AdminEventMethod } from '../types/AdminEventMethod'

interface MethodCardProps {
  method: AdminEventMethod
  onClick: () => void
}

const MethodCard: React.FC<MethodCardProps> = ({ method, onClick }) => {
  const getMethodColor = (httpMethod: string) => {
    switch (httpMethod.toLowerCase()) {
      case 'get': return 'method-get'
      case 'post': return 'method-post'
      case 'put': return 'method-put'
      case 'delete': return 'method-delete'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="method-card cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <span className={`method-badge ${getMethodColor(method.httpMethod)}`}>
          {method.httpMethod}
        </span>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {method.name}
      </h3>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {method.description}
      </p>
      
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-500">
          <Code className="w-3 h-3 mr-1" />
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
            {method.endpoint}
          </code>
        </div>
        
        {method.parameters && method.parameters.length > 0 && (
          <div className="flex items-center text-xs text-gray-500">
            <FileText className="w-3 h-3 mr-1" />
            <span>{method.parameters.length} parameter{method.parameters.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View Details →
        </button>
      </div>
    </div>
  )
}

export default MethodCard