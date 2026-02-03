import { Link, useLocation } from 'react-router-dom';
import { Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <AlertTriangle className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none">ERP Triage</span>
            <span className="text-xs text-muted-foreground">Incident Portal</span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          {location.pathname !== '/new' && (
            <Button asChild>
              <Link to="/new">
                <Plus className="mr-2 h-4 w-4" />
                New Incident
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
