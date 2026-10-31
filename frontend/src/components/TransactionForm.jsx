import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function TransactionForm({
  accounts,
  fromAccount,
  setFromAccount,
  toAccount,
  setToAccount,
  amount,
  setAmount,
  onSubmit,
  processing,
  showFromSelector = true,
  lockedFromAccount = null,
  submitLabel = 'Send Transaction',
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {showFromSelector && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-fintech-text">From Account</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            disabled={processing || !!lockedFromAccount}
            required
            className="w-full rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm text-fintech-text outline-none transition focus:border-fintech-primary focus:ring-2 focus:ring-fintech-primary/20 disabled:opacity-60"
          >
            <option value="">Select an account</option>
            {accounts.map((a) => (
              <option key={a._id} value={a._id}>
                {a._id}
              </option>
            ))}
          </select>
        </div>
      )}

      {lockedFromAccount && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-fintech-text">From Account</label>
          <div className="w-full rounded-xl border border-fintech-border bg-gray-50 px-4 py-2.5 font-mono text-sm text-fintech-text">
            {lockedFromAccount}
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-fintech-text">To Account</label>
        <input
          type="text"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          disabled={processing}
          required
          placeholder="Destination account ID"
          className="w-full rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm text-fintech-text outline-none transition focus:border-fintech-primary focus:ring-2 focus:ring-fintech-primary/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-fintech-text">Amount</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-fintech-muted">$</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={processing}
            required
            placeholder="0.00"
            className="w-full rounded-xl border border-fintech-border bg-fintech-card pl-8 pr-4 py-2.5 text-sm text-fintech-text outline-none transition focus:border-fintech-primary focus:ring-2 focus:ring-fintech-primary/20 disabled:opacity-60"
          />
        </div>
      </div>

      <motion.button
        whileTap={{ scale: processing ? 1 : 0.98 }}
        type="submit"
        disabled={processing}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-fintech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-fintech-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {processing && <Loader2 className="h-4 w-4 animate-spin" />}
        {processing ? 'Processing…' : submitLabel}
      </motion.button>
    </form>
  );
}
