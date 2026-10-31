import { AlertCircle, X } from 'lucide-react';

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-fintech-error"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1 leading-relaxed">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="rounded-md p-1 transition hover:bg-red-100"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
