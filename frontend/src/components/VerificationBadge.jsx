import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function VerificationBadge({ status = "Verified", size = "md", showIcon = true }) {
  const isVerified = status.toLowerCase() === 'verified';
  
  const sizeClasses = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5 font-medium",
    lg: "text-sm px-3.5 py-1.5 gap-2 font-semibold",
  }[size] || "text-xs px-3 py-1 gap-1.5 font-medium";

  if (isVerified) {
    return (
      <span className={`inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 ${sizeClasses}`}>
        {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
        <span>Verified Record</span>
      </span>
    );
  }

  if (status.toLowerCase() === 'pending') {
    return (
      <span className={`inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />}
        <span>Verification Pending</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${sizeClasses}`}>
      {showIcon && <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
      <span>{status}</span>
    </span>
  );
}
