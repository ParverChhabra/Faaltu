import React, { useState, useEffect } from 'react';
import { Calendar, Plus, RefreshCw, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { AdminEventServiceClient } from '../services/AdminEventService';
import { Event } from '../types/ApiTypes';

interface EventListProps {
  apiClient: AdminEventServiceClient;
  onEventSelect: (event: Event) => void;
  onCreateEvent: () => void;
}

const EventList: React.FC<EventListProps> = ({ apiClient, onEventSelect, onCreateEvent }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    
    const response = await apiClient.listEvents();
    
    if (response.success && response.data) {
      setEvents(response.data);
    } else {
      setError(response.error || 'Failed to load events');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Events</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={loadEvents}
              disabled={loading}
              className="flex items-center px-3 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={onCreateEvent}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Event
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No events found' : 'No events yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Create your first event to get started'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={onCreateEvent}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Create Event
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onEventSelect(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {event.name}
                    </h3>
                    {event.description && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Start: {formatDate(event.startTimeStamp)}</span>
                      <span>End: {formatDate(event.endTimeStamp)}</span>
                      {event.expectedVolunteerCount && (
                        <span>Volunteers: {event.expectedVolunteerCount}</span>
                      )}
                    </div>
                    {event.status && (
                      <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                        event.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : event.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventSelect(event);
                      }}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;