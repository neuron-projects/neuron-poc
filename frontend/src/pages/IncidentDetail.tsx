import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ArrowLeft,
  User,
  Calendar,
  Building2,
  Server,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { incidentApi } from '@/services/incidentApi';
import { Status } from '@/types/incident';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { SeverityBadge } from '@/components/SeverityBadge';
import { StatusBadge } from '@/components/StatusBadge';

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newStatus, setNewStatus] = useState<Status | ''>('');
  const [incident, setIncident] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isStatusPending, setIsStatusPending] = useState(false);

  const fetchIncident = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await incidentApi.getIncidentById(id);
      if (data) {
        setIncident(data);
      } else {
        setError(new Error("Not found"));
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncident();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (newStatus && id) {
      setIsStatusPending(true);
      try {
        await incidentApi.updateStatus(id, newStatus as Status);
        toast({
          title: 'Status Updated',
          description: `Incident status has been updated to ${newStatus}.`,
        });
        setNewStatus('');
        fetchIncident(); // Refresh data
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to update status. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsStatusPending(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-16">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-xl font-semibold">Incident Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          The incident you're looking for doesn't exist or has been removed.
        </p>
        <Button className="mt-6" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold">{incident.incidentId}</h1>
              <SeverityBadge severity={incident.aiSeverity} />
              <StatusBadge status={incident.status} />
            </div>
            <p className="mt-2 text-lg">{incident.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <Select value={newStatus} onValueChange={(v) => setNewStatus(v as Status)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleStatusUpdate}
            disabled={!newStatus || isStatusPending}
          >
            {isStatusPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Module</p>
                    <p className="font-medium">{incident.module}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Environment</p>
                    <p className="font-medium">{incident.environment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted by</p>
                    <p className="font-medium">{incident.submittedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {format(new Date(incident.createdAt), 'MMM d, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                {incident.businessUnit && (
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <div className="rounded-lg bg-muted p-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Business Unit</p>
                      <p className="font-medium">{incident.businessUnit}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {incident.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Sidebar */}
        <div>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Severity */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Severity Assessment
                  </p>
                  <SeverityBadge severity={incident.aiSeverity} size="sm" />
                </div>
                <p className="mt-2 text-sm">{incident.aiSeverityReason}</p>
              </div>

              {/* Category */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <span className="text-sm font-medium">
                    {Math.round(incident.aiConfidence * 100)}% confidence
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-severity-p3" />
                  <span className="font-medium">{incident.aiCategory}</span>
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Lightbulb className="h-4 w-4" />
                  Suggested Actions
                </p>
                <ol className="space-y-2">
                  {incident.aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
