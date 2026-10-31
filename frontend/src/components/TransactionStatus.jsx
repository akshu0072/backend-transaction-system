const STATUS_STYLES = {
  COMPLETED: 'bg-green-50 text-fintech-success border-green-200',
  PENDING: 'bg-blue-50 text-fintech-primary border-blue-200',
  FAILED: 'bg-red-50 text-fintech-error border-red-200',
  REVERSED: 'bg-amber-50 text-fintech-warning border-amber-200',
};

export default function TransactionStatus({ status }) {
  if (!status) return null;
  const cls = STATUS_STYLES[status] || 'bg-gray-50 text-fintech-muted border-fintech-border';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {status}
    </span>
  );
}
