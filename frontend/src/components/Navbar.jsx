import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, ArrowLeftRight, PlusCircle, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/accounts', label: 'Accounts', icon: Wallet },
  { to: '/transactions/new', label: 'New Transaction', icon: ArrowLeftRight },
  { to: '/initial-funds', label: 'Initial Funds', icon: PlusCircle },
];

export default function Navbar() {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-fintech-border bg-fintech-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fintech-primary text-white">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-semibold text-fintech-text">Ledger</span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-fintech-primary'
                      : 'text-fintech-muted hover:bg-gray-50 hover:text-fintech-text'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user && (
              <span className="text-sm text-fintech-muted">{user.name || user.email}</span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-fintech-border px-3 py-2 text-sm font-medium text-fintech-text transition hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-fintech-text md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed inset-y-0 right-0 z-40 w-72 border-l border-fintech-border bg-fintech-card p-4 md:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-semibold text-fintech-text">Menu</span>
              <button onClick={() => setOpen(false)} className="rounded-lg p-2" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-fintech-primary'
                        : 'text-fintech-muted hover:bg-gray-50 hover:text-fintech-text'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="mt-6 flex w-full items-center gap-2 rounded-lg border border-fintech-border px-3 py-2.5 text-sm font-medium text-fintech-text transition hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
