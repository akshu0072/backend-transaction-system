export default function Loading({ label = 'Loading…', size = 'md' }) {
  const dims = size === 'lg' ? 'h-8 w-8' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div
        className={`${dims} animate-spin rounded-full border-2 border-fintech-border border-t-fintech-primary`}
        role="status"
        aria-label="Loading"
      />
      {label && <span className="text-sm text-fintech-muted">{label}</span>}
    </div>
  );
}
