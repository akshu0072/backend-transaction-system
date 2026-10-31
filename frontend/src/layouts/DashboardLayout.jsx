import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-fintech-bg">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
