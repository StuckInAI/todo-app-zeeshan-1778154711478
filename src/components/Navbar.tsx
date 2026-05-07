import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, LayoutDashboard, LogOut, LogIn, UserPlus, PlusCircle, User } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <Briefcase size={22} />
          <span>JobBoard</span>
        </Link>
        <div className={styles.actions}>
          <Link to="/portfolio" className={`btn btn-ghost btn-sm ${styles.navLink}`}>
            <User size={16} />
            Portfolio
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className={`btn btn-ghost btn-sm ${styles.navLink}`}>
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <Link to="/dashboard/new" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                Post a Job
              </Link>
              <button onClick={handleLogout} className={`btn btn-ghost btn-sm ${styles.navLink}`}>
                <LogOut size={16} />
                <span className={styles.hideXs}>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`btn btn-ghost btn-sm ${styles.navLink}`}>
                <LogIn size={16} />
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
