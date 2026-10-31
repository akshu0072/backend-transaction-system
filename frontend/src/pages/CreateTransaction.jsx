import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { accountService } from '../services/accountService';
import { transactionService } from '../services/transactionService';
import { generateIdempotencyKey } from '../utils/idempotency';
import TransactionForm from '../components/TransactionForm';
import TransactionStatus from '../components/TransactionStatus';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function CreateTransaction() {
  const location = useLocation();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [fromAccount, setFromAccount] = useState(location.state?.fromAccount || '');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const idempotencyRef = useRef(generateIdempotencyKey());

  useEffect(() => {
    (async () => {
      try {
        const list = await accountService.getAccounts();
        setAccounts(list || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load accounts');
      } finally {
        setLoadingAccounts(false);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    setError('');
    setResult(null);
    if (!fromAccount || !toAccount || !amount) {
      setError('Please fill in all fields');
      return;
    }
    if (Number(amount) <= 0) {
      setError('Amount must be positive');
      return;
    }
    if (fromAccount === toAccount) {
      setError('From and To accounts must differ');
      return;
    }

    setProcessing(true);
    try {
      const res = await transactionService.createTransaction({
        fromAccount,
        toAccount,
        amount: Number(amount),
        idempotencyKey: idempotencyRef.current,
      });
      setResult(res?.transaction || res);
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message;
      setError(msg || 'Transaction processing failed, please retry');
    } finally {
      setProcessing(false);
      idempotencyRef.current = generateIdempotencyKey();
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-fintech-text">New Transaction</h1>
        <p className="mt-1 text-sm text-fintech-muted">Send funds to another account</p>
      </div>

      {loadingAccounts ? (
        <Loading label="Loading your accounts…" />
      ) : (
        <>
          {error && !processing && <ErrorMessage message={error} onDismiss={() => setError('')} />}

          <AnimatePresence mode="wait">
            {processing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-fintech-border bg-fintech-card p-8 text-center shadow-card"
              >
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-fintech-primary" />
                <h2 className="mt-4 text-lg font-semibold text-fintech-text">Processing Transaction</h2>
                <p className="mt-1 text-sm text-fintech-muted">
                  Your transaction is being processed securely.
                </p>
                <p className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-fintech-primary">
                  Please do not close the page or submit again.
                </p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-fintech-border bg-fintech-card p-8 shadow-card"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-fintech-success" />
                <h2 className="mt-4 text-center text-lg font-semibold text-fintech-text">Transaction Completed</h2>
                <p className="mt-1 text-center text-sm text-fintech-muted">
                  Transaction completed successfully.
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-fintech-border pb-3">
                    <dt className="text-fintech-muted">Transaction ID</dt>
                    <dd className="font-mono text-fintech-text">{result._id || result.id || '—'}</dd>
                  </div>
                  <div className="flex justify-between border-b border-fintech-border pb-3">
                    <dt className="text-fintech-muted">Amount</dt>
                    <dd className="font-medium text-fintech-text">
                      INR{(Number(result.amount) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-fintech-muted">Status</dt>
                    <dd><TransactionStatus status={result.status} /></dd>
                  </div>
                </dl>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setResult(null);
                      setToAccount('');
                      setAmount('');
                    }}
                    className="flex-1 rounded-xl border border-fintech-border px-4 py-2.5 text-sm font-medium text-fintech-text transition hover:bg-gray-50"
                  >
                    New Transaction
                  </button>
                  <button
                    onClick={() => navigate('/dashboard',{ state: { refresh: Date.now() },})}
                    className="flex-1 rounded-xl bg-fintech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-fintech-primary-dark"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-fintech-border bg-fintech-card p-6 shadow-card"
              >
                <TransactionForm
                  accounts={accounts}
                  fromAccount={fromAccount}
                  setFromAccount={setFromAccount}
                  toAccount={toAccount}
                  setToAccount={setToAccount}
                  amount={amount}
                  setAmount={setAmount}
                  onSubmit={handleSubmit}
                  processing={processing}
                  submitLabel="Send Transaction"
                />
                {error && <div className="mt-4"><ErrorMessage message={error} /></div>}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
