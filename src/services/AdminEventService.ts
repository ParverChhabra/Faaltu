import { ApiConfig, ApiResponse, Event, Host, CreateEventPayload, UpdateEventPayload, CancelEventPayload } from '../types/ApiTypes';

export class AdminEventServiceClient {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.config.baseUrl}${endpoint}`;
      const headers: HeadersInit = {
        'Authorization': `Bearer ${this.config.token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Event Management
  async listEvents(): Promise<ApiResponse<Event[]>> {
    return this.makeRequest<Event[]>('/v2/event');
  }

  async getEvent(id: string): Promise<ApiResponse<Event>> {
    return this.makeRequest<Event>(`/v2/event/${id}`);
  }

  async createEvent(payload: CreateEventPayload): Promise<ApiResponse<Event>> {
    return this.makeRequest<Event>('/v2/event', 'POST', payload);
  }

  async updateEvent(id: string, payload: UpdateEventPayload): Promise<ApiResponse<Event>> {
    return this.makeRequest<Event>(`/v2/event/${id}`, 'PUT', payload);
  }

  async cancelEvent(id: string, payload: CancelEventPayload): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/v2/event/${id}/cancel`, 'POST', payload);
  }

  // Host Management
  async getAvailableHosts(eventId: string): Promise<ApiResponse<Host[]>> {
    return this.makeRequest<Host[]>(`/v2/event/${eventId}/available_hosts`);
  }

  async addHost(eventId: string, hostId: string): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/v2/event/${eventId}/host/${hostId}`, 'POST');
  }

  async removeHost(eventId: string, hostId: string): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/v2/event/${eventId}/host/${hostId}`, 'DELETE');
  }

  async getConflictingEvents(eventId: string, hostId: string): Promise<ApiResponse<Event[]>> {
    return this.makeRequest<Event[]>(`/v2/event/${eventId}/host/${hostId}`);
  }

  // Showcase and Approval
  async getShowcasePageData(eventId: string): Promise<ApiResponse<any>> {
    return this.makeRequest<any>(`/v2/event/${eventId}/showcase`);
  }

  async getApprovalPageData(eventId: string): Promise<ApiResponse<any>> {
    return this.makeRequest<any>(`/v2/event/${eventId}/approval-page`);
  }

  // Calendar and Templates
  async getCalendarActionables(eventId: string): Promise<ApiResponse<any[]>> {
    return this.makeRequest<any[]>(`/v2/event/${eventId}/calendar-actionable`);
  }

  async getCollateralTemplates(eventId: string): Promise<ApiResponse<any[]>> {
    return this.makeRequest<any[]>(`/v2/event/${eventId}/collateral_templates`);
  }

  async getEventCatalogue(eventId: string): Promise<ApiResponse<any>> {
    return this.makeRequest<any>(`/v2/event/${eventId}/catalogue`);
  }

  // Validation
  async validateOldEventId(oldEventId: string): Promise<ApiResponse<any>> {
    return this.makeRequest<any>(`/v2/event/old-event/${oldEventId}`);
  }
}