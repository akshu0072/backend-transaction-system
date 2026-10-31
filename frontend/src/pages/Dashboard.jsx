import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowLeftRight, Wallet } from 'lucide-react';
import { accountService } from '../services/accountService';
import AccountCard from '../components/AccountCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';


export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const loadAccounts = async () => {
    setLoading(true);
    setError('');
    try {
      const list = await accountService.getAccounts();
      setAccounts(list || []);
      const bal = {};
      await Promise.all(
        (list || []).map(async (a) => {
          try {
            bal[a._id] = await accountService.getBalance(a._id);
          } catch {
            bal[a._id] = null;
          }
        })
      );
      setBalances(bal);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    setError('');
    try {
      await accountService.createAccount();
      await loadAccounts();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account');
    } finally {
      setCreating(false);
    }
  };

  const totalBalance = Object.values(balances).reduce((sum, b) => sum + (Number(b) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-fintech-text">Dashboard</h1>
          <p className="mt-1 text-sm text-fintech-muted">Overview of your accounts</p>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="flex items-center justify-center gap-2 rounded-xl bg-fintech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-fintech-primary-dark disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {creating ? 'Creating…' : 'Create Account'}
        </button>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="rounded-2xl border border-fintech-border bg-fintech-card p-5 shadow-card">
        <p className="text-xs font-medium uppercase tracking-wide text-fintech-muted">Total Balance</p>
        <p className="mt-1 text-3xl font-semibold text-fintech-text">
          ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/transactions/new"
          className="flex items-center gap-2 rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm font-medium text-fintech-text transition hover:shadow-card"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Send Transaction
        </Link>
        <Link
          to="/initial-funds"
          className="flex items-center gap-2 rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm font-medium text-fintech-text transition hover:shadow-card"
        >
          <Plus className="h-4 w-4" />
          Initial Funds
        </Link>
      </div>

      {loading ? (
        <Loading label="Loading your accounts…" />
      ) : accounts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-fintech-border bg-fintech-card p-12 text-center">
          <Wallet className="mx-auto h-10 w-10 text-fintech-muted" />
          <p className="mt-4 text-sm text-fintech-muted">No accounts found.</p>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-fintech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-fintech-primary-dark disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            Create your first account
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((a) => (
            <AccountCard
              key={a._id}
              account={a}
              balance={balances[a._id]}
              balanceLoading={balances[a._id] === undefined}
              onSelect={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
