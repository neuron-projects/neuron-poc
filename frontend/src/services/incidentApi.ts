import axios from 'axios';
import { Incident, CreateIncidentRequest, Status } from '@/types/incident';
import { mockIncidents } from '@/data/mockIncidents';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementation
export const incidentApi = {
  async getIncidents(): Promise<Incident[]> {
    await delay(500);
    return [...mockIncidents];
  },

  async getIncidentById(id: string): Promise<Incident | undefined> {
    await delay(300);
    return mockIncidents.find(inc => inc.incidentId === id);
  },

  async createIncident(data: CreateIncidentRequest): Promise<Incident> {
    await delay(800);
    
    const newIncident: Incident = {
      incidentId: `INC-${String(mockIncidents.length + 1).padStart(3, '0')}`,
      ...data,
      submittedBy: 'current.user@company.com',
      createdAt: new Date().toISOString(),
      status: 'Open',
      aiSeverity: data.environment === 'Production' ? 'P2' : 'P3',
      aiSeverityReason: `${data.environment} environment + ${data.module} module impact`,
      aiCategory: 'Pending Analysis',
      aiConfidence: 0.75,
      aiSuggestions: [
        'Initial triage in progress',
        'Gathering additional context',
        'Checking similar historical incidents'
      ]
    };
    
    mockIncidents.push(newIncident);
    return newIncident;
  },

  async updateStatus(id: string, status: Status): Promise<Incident | undefined> {
    await delay(400);
    const incident = mockIncidents.find(inc => inc.incidentId === id);
    if (incident) {
      incident.status = status;
    }
    return incident;
  }
};

// Real API implementation (for future use)
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const realIncidentApi = {
  getIncidents: () => api.get<Incident[]>('/incidents'),
  getIncidentById: (id: string) => api.get<Incident>(`/incidents/${id}`),
  createIncident: (data: CreateIncidentRequest) => api.post<Incident>('/incidents', data),
  updateStatus: (id: string, status: Status) => api.patch<Incident>(`/incidents/${id}/status`, { status }),
};
