export interface ApiConfig {
  baseUrl: string;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  startTimeStamp: string;
  endTimeStamp: string;
  timezone: string;
  partnerId?: string;
  status?: string;
  expectedVolunteerCount?: number;
}

export interface Host {
  id: string;
  name: string;
  email: string;
  status?: string;
}

export interface CreateEventPayload {
  opportunityId: string;
  variantId: string;
  partnerId: string;
  name: string;
  startTimeStamp: string;
  endTimeStamp: string;
  timezone: string;
  language: string;
  expectedVolunteerCount: number;
  tags: string[];
}

export interface UpdateEventPayload {
  name?: string;
  startTimeStamp?: string;
  endTimeStamp?: string;
  timezone?: string;
  expectedVolunteerCount?: number;
  tags?: string[];
}

export interface CancelEventPayload {
  reason: string;
}