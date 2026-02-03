import { Severity } from '@/types/incident';
import { cn } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: Severity;
  size?: 'sm' | 'md' | 'lg';
}

export function SeverityBadge({ severity, size = 'md' }: SeverityBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const severityClasses = {
    P1: 'bg-severity-p1 text-white',
    P2: 'bg-severity-p2 text-white',
    P3: 'bg-severity-p3 text-white',
  };

  const labels = {
    P1: 'P1 Critical',
    P2: 'P2 High',
    P3: 'P3 Medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold uppercase tracking-wide',
        sizeClasses[size],
        severityClasses[severity]
      )}
    >
      {size === 'sm' ? severity : labels[severity]}
    </span>
  );
}
