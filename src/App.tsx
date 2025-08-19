import React, { useState } from 'react'
import { Settings } from 'lucide-react'
import Header from './components/Header'
import EventList from './components/EventList'
import EventDetails from './components/EventDetails'
import CreateEventModal from './components/CreateEventModal'
import ApiConfigModal from './components/ApiConfigModal'
import { AdminEventServiceClient } from './services/AdminEventService'
import { ApiConfig, Event } from './types/ApiTypes'

function App() {
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    baseUrl: 'https://api.example.com',
    token: ''
  })
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const apiClient = new AdminEventServiceClient(apiConfig)

  const handleConfigUpdate = (newConfig: ApiConfig) => {
    setApiConfig(newConfig)
    setRefreshTrigger(prev => prev + 1)
  }

  const handleEventCreated = () => {
    setRefreshTrigger(prev => prev + 1)
    setShowCreateModal(false)
  }

  const handleEventUpdated = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onConfigClick={() => setShowConfigModal(true)}
        hasValidConfig={!!apiConfig.token}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!apiConfig.token ? (
          <div className="text-center py-16">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configure API Connection</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Please configure your API base URL and authentication token to start managing events.
            </p>
            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <Settings className="w-5 h-5 mr-2" />
              Configure API
            </button>
          </div>
        ) : selectedEvent ? (
          <EventDetails
            event={selectedEvent}
            apiClient={apiClient}
            onBack={() => setSelectedEvent(null)}
            onEventUpdated={handleEventUpdated}
          />
        ) : (
          <EventList
            key={refreshTrigger}
            apiClient={apiClient}
            onEventSelect={setSelectedEvent}
            onCreateEvent={() => setShowCreateModal(true)}
          />
        )}
      </main>

      {/* Modals */}
      <ApiConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        config={apiConfig}
        onConfigUpdate={handleConfigUpdate}
      />
      
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        apiClient={apiClient}
        onEventCreated={handleEventCreated}
      />
    </div>
  )
}

export default App