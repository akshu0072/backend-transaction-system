import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-fintech-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md rounded-2xl border border-fintech-border bg-fintech-card p-8 shadow-card"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-fintech-primary text-white">
            <Wallet className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-fintech-text">Create your account</h1>
          <p className="mt-1 text-sm text-fintech-muted">Get started in seconds</p>
        </div>

        {error && <div className="mb-4"><ErrorMessage message={error} onDismiss={() => setError('')} /></div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fintech-text">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm outline-none transition focus:border-fintech-primary focus:ring-2 focus:ring-fintech-primary/20 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fintech-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm outline-none transition focus:border-fintech-primary focus:ring-2 focus:ring-fintech-primary/20 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fintech-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm outline-none transition focus:border-fintech-primary focus:ring-2 focus:ring-fintech-primary/20 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-fintech-text">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border border-fintech-border bg-fintech-card px-4 py-2.5 text-sm outline-none transition focus:border-fintech-primary focus:ring-2 focus:ring-fintech-primary/20 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-fintech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-fintech-primary-dark disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-fintech-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-fintech-primary hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
