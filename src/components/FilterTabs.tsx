import React from 'react'

interface FilterTabsProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
  methodCounts: {
    all: number
    get: number
    post: number
    put: number
    delete: number
  }
}

const FilterTabs: React.FC<FilterTabsProps> = ({ selectedMethod, onMethodChange, methodCounts }) => {
  const tabs = [
    { id: 'all', label: 'All', count: methodCounts.all },
    { id: 'get', label: 'GET', count: methodCounts.get },
    { id: 'post', label: 'POST', count: methodCounts.post },
    { id: 'put', label: 'PUT', count: methodCounts.put },
    { id: 'delete', label: 'DELETE', count: methodCounts.delete },
  ]

  return (
    <div className="flex justify-center">
      <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onMethodChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              selectedMethod === tab.id
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default FilterTabs