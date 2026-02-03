import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Severity, Status, ERPModule } from '@/types/incident';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  severityFilter: Severity | 'all';
  onSeverityChange: (value: Severity | 'all') => void;
  statusFilter: Status | 'all';
  onStatusChange: (value: Status | 'all') => void;
  moduleFilter: ERPModule | 'all';
  onModuleChange: (value: ERPModule | 'all') => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  statusFilter,
  onStatusChange,
  moduleFilter,
  onModuleChange,
}: FilterBarProps) {
  return (
    <div className="card-elevated p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search incidents by ID or title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={severityFilter} onValueChange={(v) => onSeverityChange(v as Severity | 'all')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="P1">P1 Critical</SelectItem>
              <SelectItem value="P2">P2 High</SelectItem>
              <SelectItem value="P3">P3 Medium</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as Status | 'all')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={moduleFilter} onValueChange={(v) => onModuleChange(v as ERPModule | 'all')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              <SelectItem value="AP">AP</SelectItem>
              <SelectItem value="AR">AR</SelectItem>
              <SelectItem value="GL">GL</SelectItem>
              <SelectItem value="Inventory">Inventory</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Payroll">Payroll</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
