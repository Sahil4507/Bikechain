import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/bikes', { replace: true });
  }, [navigate]);

  return (
    <div className="p-12 text-center text-xs text-slate-500">
      Redirecting to motorcycle registry...
    </div>
  );
}
