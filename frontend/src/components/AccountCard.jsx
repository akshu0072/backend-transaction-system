import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AccountCard({ account, balance, balanceLoading, onSelect }) {
  const status = account.status || '—';
  const statusColor =
    status === 'ACTIVE'
      ? 'text-fintech-success'
      : status === 'PENDING'
      ? 'text-fintech-primary'
      : 'text-fintech-muted';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="cursor-pointer rounded-2xl border border-fintech-border bg-fintech-card p-5 shadow-card hover:shadow-card-hover"
      onClick={() => onSelect?.(account)}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-fintech-muted">Account</p>
          <p className="mt-1 truncate font-mono text-sm text-fintech-text">{account._id}</p>
        </div>
        {onSelect && (
          <ArrowRight className="h-5 w-5 shrink-0 text-fintech-muted" />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-fintech-muted">Balance</p>
          {balanceLoading ? (
            <div className="mt-1 h-6 w-24 animate-pulse rounded bg-fintech-border" />
          ) : (
            <p className="mt-1 text-2xl font-semibold text-fintech-text">
              INR{(Number(balance) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-fintech-muted">Status</p>
          <p className={`mt-1 text-sm font-semibold ${statusColor}`}>{status}</p>
        </div>
      </div>
    </motion.div>
  );
}
