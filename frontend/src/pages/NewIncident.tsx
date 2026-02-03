import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { incidentApi } from '@/services/incidentApi';
import { ERPModule, Environment, CreateIncidentRequest } from '@/types/incident';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function NewIncident() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [module, setModule] = useState<ERPModule | ''>('');
  const [environment, setEnvironment] = useState<Environment>('Production');
  const [businessUnit, setBusinessUnit] = useState('');

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !module) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const data: CreateIncidentRequest = {
      title,
      description,
      module: module as ERPModule,
      environment,
      businessUnit: businessUnit || undefined,
    };

    setIsPending(true);
    incidentApi.createIncident(data)
      .then((incident) => {
        toast({
          title: 'Incident Created',
          description: `Incident ${incident.id} has been created successfully.`,
        });
        navigate(`/incident/${incident.id}`);
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to create incident. Please try again.',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div className="animate-fade-in mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Report New Incident</h1>
          <p className="mt-1 text-muted-foreground">
            Submit a new ERP incident for triage
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-elevated space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Brief description of the issue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Provide detailed information about the incident, including error messages, affected processes, and business impact..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="module">
              ERP Module <span className="text-destructive">*</span>
            </Label>
            <Select value={module} onValueChange={(v) => setModule(v as ERPModule)}>
              <SelectTrigger>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AP">AP - Accounts Payable</SelectItem>
                <SelectItem value="AR">AR - Accounts Receivable</SelectItem>
                <SelectItem value="GL">GL - General Ledger</SelectItem>
                <SelectItem value="Inventory">Inventory</SelectItem>
                <SelectItem value="HR">HR - Human Resources</SelectItem>
                <SelectItem value="Payroll">Payroll</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessUnit">Business Unit</Label>
            <Input
              id="businessUnit"
              placeholder="e.g., North America Finance"
              value={businessUnit}
              onChange={(e) => setBusinessUnit(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>
            Environment <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={environment}
            onValueChange={(v) => setEnvironment(v as Environment)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Production" id="production" />
              <Label htmlFor="production" className="cursor-pointer font-normal">
                Production
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Test" id="test" />
              <Label htmlFor="test" className="cursor-pointer font-normal">
                Test
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit Incident
          </Button>
        </div>
      </form>
    </div>
  );
}
