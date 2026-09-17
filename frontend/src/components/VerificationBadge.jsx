import React from 'react';
import { CheckCircle2, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

export default function VerificationBadge({ status = "Verified", size = "md", showIcon = true }) {
  const isVerified = status.toLowerCase() === 'verified';
  
  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5 font-medium",
    lg: "text-sm px-3.5 py-1.5 gap-2 font-semibold",
  }[size] || "text-xs px-3 py-1 gap-1.5";

  if (isVerified) {
    return (
      <span className={`inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm ${sizeClasses}`}>
        {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 animate-pulse" />}
        <span>Identity Verified</span>
      </span>
    );
  }

  if (status.toLowerCase() === 'pending') {
    return (
      <span className={`inline-flex items-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
        <span>Verification Pending</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 ${sizeClasses}`}>
      {showIcon && <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
      <span>{status}</span>
    </span>
  );
}
