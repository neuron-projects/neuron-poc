import { Status } from '@/types/incident';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusClasses: Record<Status, string> = {
    'Open': 'bg-primary/10 text-primary',
    'In Progress': 'bg-severity-p2/10 text-severity-p2',
    'Resolved': 'bg-severity-p3/10 text-severity-p3',
    'Closed': 'bg-muted text-muted-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium uppercase tracking-wide',
        statusClasses[status]
      )}
    >
      {status}
    </span>
  );
}
