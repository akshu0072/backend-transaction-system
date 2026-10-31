import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { accountService } from '../services/accountService';
import AccountCard from '../components/AccountCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Accounts() {
  const navigate = useNavigate();
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

  const handleSelect = (account) => {
    navigate('/transactions/new', { state: { fromAccount: account._id } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-fintech-text">Accounts</h1>
          <p className="mt-1 text-sm text-fintech-muted">Select an account to send a transaction</p>
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

      {loading ? (
        <Loading label="Loading accounts…" />
      ) : accounts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-fintech-border bg-fintech-card p-12 text-center">
          <p className="text-sm text-fintech-muted">No accounts found.</p>
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
            <div key={a._id} className="relative">
              <AccountCard
                account={a}
                balance={balances[a._id]}
                balanceLoading={balances[a._id] === undefined}
                onSelect={handleSelect}
              />
              <div className="mt-2 flex items-center justify-end">
                <button
                  onClick={() => handleSelect(a)}
                  className="flex items-center gap-1.5 text-xs font-medium text-fintech-primary hover:underline"
                >
                  Send from this account
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
