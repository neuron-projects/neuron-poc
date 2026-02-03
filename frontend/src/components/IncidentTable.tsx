import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Incident } from '@/types/incident';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface IncidentTableProps {
  incidents: Incident[];
  isLoading?: boolean;
}

export function IncidentTable({ incidents, isLoading }: IncidentTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="card-elevated overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Severity</TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Module</TableHead>
              <TableHead className="w-[100px]">Environment</TableHead>
              <TableHead className="w-[140px]">Created</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="card-elevated flex flex-col items-center justify-center py-16">
        <p className="text-lg font-medium text-muted-foreground">No incidents found</p>
        <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="card-elevated overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Severity</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[100px]">Module</TableHead>
            <TableHead className="w-[100px]">Environment</TableHead>
            <TableHead className="w-[140px]">Created</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow
              key={incident.id}
              className="table-row-hover"
              onClick={() => navigate(`/incident/${incident.id}`)}
            >
              <TableCell>
                <SeverityBadge severity={incident.aiSeverity} size="sm" />
              </TableCell>
              <TableCell className="font-mono text-sm font-medium">
                {incident.id.substring(0, 8)}...
              </TableCell>
              <TableCell className="max-w-[300px] truncate font-medium">
                {incident.title}
              </TableCell>
              <TableCell>
                <span className="rounded bg-muted px-2 py-1 text-xs font-medium">
                  {incident.module}
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {incident.environment}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(incident.createdAt), 'MMM d, HH:mm')}
              </TableCell>
              <TableCell>
                <StatusBadge status={incident.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
