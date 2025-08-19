import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, MapPin, Clock, Settings, Trash2, UserPlus, RefreshCw } from 'lucide-react';
import { AdminEventServiceClient } from '../services/AdminEventService';
import { Event, Host } from '../types/ApiTypes';

interface EventDetailsProps {
  event: Event;
  apiClient: AdminEventServiceClient;
  onBack: () => void;
  onEventUpdated: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, apiClient, onBack, onEventUpdated }) => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [availableHosts, setAvailableHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const loadHosts = async () => {
    setLoading(true);
    const response = await apiClient.getAvailableHosts(event.id);
    if (response.success && response.data) {
      setAvailableHosts(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHosts();
  }, [event.id]);

  const handleAddHost = async (hostId: string) => {
    const response = await apiClient.addHost(event.id, hostId);
    if (response.success) {
      await loadHosts();
      onEventUpdated();
    } else {
      setError(response.error || 'Failed to add host');
    }
  };

  const handleRemoveHost = async (hostId: string) => {
    const response = await apiClient.removeHost(event.id, hostId);
    if (response.success) {
      await loadHosts();
      onEventUpdated();
    } else {
      setError(response.error || 'Failed to remove host');
    }
  };

  const handleCancelEvent = async () => {
    if (!cancelReason.trim()) {
      setError('Please provide a cancellation reason');
      return;
    }

    const response = await apiClient.cancelEvent(event.id, { reason: cancelReason });
    if (response.success) {
      setShowCancelModal(false);
      onEventUpdated();
      onBack();
    } else {
      setError(response.error || 'Failed to cancel event');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
              <p className="text-gray-600">Event ID: {event.id}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex items-center px-4 py-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Cancel Event
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{formatDate(event.startTimeStamp)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{formatDate(event.endTimeStamp)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Timezone</p>
                    <p className="font-medium">{event.timezone}</p>
                  </div>
                </div>
                {event.expectedVolunteerCount && (
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Expected Volunteers</p>
                      <p className="font-medium">{event.expectedVolunteerCount}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {event.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            )}
          </div>

          {/* Host Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Available Hosts</h2>
              <button
                onClick={loadHosts}
                disabled={loading}
                className="flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-6 h-6 text-gray-400 animate-spin mx-auto mb-2" />
                <p className="text-gray-500">Loading hosts...</p>
              </div>
            ) : availableHosts.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No available hosts found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {availableHosts.map((host) => (
                  <div
                    key={host.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{host.name}</p>
                      <p className="text-sm text-gray-500">{host.email}</p>
                      {host.status && (
                        <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                          host.status === 'available' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {host.status}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddHost(host.id)}
                      className="flex items-center px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Event Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel Event</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel "{event.name}"? This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Reason *
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Keep Event
              </button>
              <button
                onClick={handleCancelEvent}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Cancel Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;