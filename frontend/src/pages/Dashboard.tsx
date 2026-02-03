import { useState, useMemo, useEffect } from 'react';
import { AlertCircle, Clock, CheckCircle2, Activity, Loader2 } from 'lucide-react';
import { incidentApi } from '@/services/incidentApi';
import { Severity, Status, ERPModule, Incident } from '@/types/incident';
import { StatsCard } from '@/components/StatsCard';
import { FilterBar } from '@/components/FilterBar';
import { IncidentTable } from '@/components/IncidentTable';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [moduleFilter, setModuleFilter] = useState<ERPModule | 'all'>('all');
  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      setIsLoading(true);
      try {
        const data = await incidentApi.getIncidents();
        setIncidents(data);
      } catch (error) {
        console.error("Failed to fetch incidents", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const stats = useMemo(() => {
    return {
      p1Count: incidents.filter((i) => i.aiSeverity === 'P1').length,
      p2Count: incidents.filter((i) => i.aiSeverity === 'P2').length,
      p3Count: incidents.filter((i) => i.aiSeverity === 'P3').length,
      totalOpen: incidents.filter((i) => i.status === 'Open' || i.status === 'In Progress').length,
    };
  }, [incidents]);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesSearch =
        searchQuery === '' ||
        incident.incidentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = severityFilter === 'all' || incident.aiSeverity === severityFilter;
      const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
      const matchesModule = moduleFilter === 'all' || incident.module === moduleFilter;

      return matchesSearch && matchesSeverity && matchesStatus && matchesModule;
    });
  }, [incidents, searchQuery, severityFilter, statusFilter, moduleFilter]);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Incident Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Monitor and triage ERP system incidents
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="P1 Critical"
          count={stats.p1Count}
          icon={AlertCircle}
          variant="p1"
        />
        <StatsCard
          title="P2 High"
          count={stats.p2Count}
          icon={Clock}
          variant="p2"
        />
        <StatsCard
          title="P3 Medium"
          count={stats.p3Count}
          icon={CheckCircle2}
          variant="p3"
        />
        <StatsCard
          title="Active Incidents"
          count={stats.totalOpen}
          icon={Activity}
          variant="default"
        />
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        severityFilter={severityFilter}
        onSeverityChange={setSeverityFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        moduleFilter={moduleFilter}
        onModuleChange={setModuleFilter}
      />

      <IncidentTable incidents={filteredIncidents} isLoading={isLoading} />
    </div>
  );
}
