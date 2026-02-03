import axios from 'axios';
import { Incident, CreateIncidentRequest, Status } from '@/types/incident';
import { mockIncidents } from '@/data/mockIncidents';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const incidentApi = {
  async getIncidents(): Promise<Incident[]> {
    const response = await api.get<{ incidents: Incident[], count: number }>('/incidents/');
    return response.data.incidents;
  },

  async getIncidentById(id: string): Promise<Incident> {
    const response = await api.get<Incident>(`/incidents/${id}`);
    return response.data;
  },

  async createIncident(data: CreateIncidentRequest): Promise<Incident> {
    const response = await api.post<Incident>('/incidents/', data);
    return response.data;
  },

  async updateStatus(id: string, status: Status): Promise<Incident> {
    const response = await api.patch<{ message: string, status: string }>(`/incidents/${id}`, { status });
    // Since we only get back message and status, we'll refetch or return a partial if needed.
    // However, the detail page usually refetches. For now, we'll return what we have.
    const updatedIncident = await this.getIncidentById(id);
    return updatedIncident;
  }
};
