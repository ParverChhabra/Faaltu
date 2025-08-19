import React, { useState } from 'react'
import { Search, Code, Book, Server, ExternalLink } from 'lucide-react'
import Header from './components/Header'
import MethodCard from './components/MethodCard'
import SearchBar from './components/SearchBar'
import FilterTabs from './components/FilterTabs'
import { adminEventMethods } from './data/adminEventMethods'
import { AdminEventMethod } from './types/AdminEventMethod'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string>('all')
  const [selectedMethodDetail, setSelectedMethodDetail] = useState<AdminEventMethod | null>(null)

  const filteredMethods = adminEventMethods.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         method.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMethod = selectedMethod === 'all' || method.httpMethod.toLowerCase() === selectedMethod.toLowerCase()
    return matchesSearch && matchesMethod
  })

  const methodCounts = {
    all: adminEventMethods.length,
    get: adminEventMethods.filter(m => m.httpMethod === 'GET').length,
    post: adminEventMethods.filter(m => m.httpMethod === 'POST').length,
    put: adminEventMethods.filter(m => m.httpMethod === 'PUT').length,
    delete: adminEventMethods.filter(m => m.httpMethod === 'DELETE').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Server className="w-12 h-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AdminEventService API</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation and interactive explorer for the AdminEventService API endpoints. 
            Manage events, hosts, testimonials, and more with our powerful REST API.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Code className="w-4 h-4 mr-1" />
              <span>{adminEventMethods.length} Endpoints</span>
            </div>
            <div className="flex items-center">
              <Book className="w-4 h-4 mr-1" />
              <span>REST API</span>
            </div>
            <div className="flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              <span>TypeScript SDK</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <FilterTabs 
            selectedMethod={selectedMethod} 
            onMethodChange={setSelectedMethod}
            methodCounts={methodCounts}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMethods.length} of {adminEventMethods.length} endpoints
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedMethod !== 'all' && ` with ${selectedMethod.toUpperCase()} method`}
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMethods.map((method) => (
            <MethodCard 
              key={method.name} 
              method={method} 
              onClick={() => setSelectedMethodDetail(method)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredMethods.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No methods found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>

      {/* Method Detail Modal */}
      {selectedMethodDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMethodDetail.name}</h2>
                <button 
                  onClick={() => setSelectedMethodDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`method-badge method-${selectedMethodDetail.httpMethod.toLowerCase()}`}>
                      {selectedMethodDetail.httpMethod}
                    </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {selectedMethodDetail.endpoint}
                    </code>
                  </div>
                  <p className="text-gray-600">{selectedMethodDetail.description}</p>
                </div>

                {selectedMethodDetail.parameters && selectedMethodDetail.parameters.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedMethodDetail.parameters.map((param, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {param.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs">{param.type}</code>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {param.required ? (
                                  <span className="text-red-600">✓</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {param.description || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedMethodDetail.exampleCode && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Example Usage</h3>
                    <pre className="code-block">
                      <code>{selectedMethodDetail.exampleCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App