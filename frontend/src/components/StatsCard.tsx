import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  variant: 'p1' | 'p2' | 'p3' | 'default';
}

export function StatsCard({ title, count, icon: Icon, variant }: StatsCardProps) {
  const variantClasses = {
    p1: 'border-l-4 border-l-severity-p1',
    p2: 'border-l-4 border-l-severity-p2',
    p3: 'border-l-4 border-l-severity-p3',
    default: 'border-l-4 border-l-primary',
  };

  const iconClasses = {
    p1: 'text-severity-p1',
    p2: 'text-severity-p2',
    p3: 'text-severity-p3',
    default: 'text-primary',
  };

  return (
    <div className={cn('stats-card', variantClasses[variant])}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold">{count}</p>
        </div>
        <div className={cn('rounded-full bg-muted p-3', iconClasses[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
