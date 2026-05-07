import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Briefcase } from 'lucide-react';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) { navigate('/dashboard', { replace: true }); return null; }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await login(email, password);
    if (err) { setError(err); setLoading(false); return; }
    navigate('/dashboard');
  }

  return (
    <div className={`page-wrapper ${styles.pageWrapper}`}>
      <div className={styles.card}>
        <div className={styles.logoMark}><Briefcase size={24} /></div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to manage your job listings</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorBox}>{error}</div>}

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            <LogIn size={16} />
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className={styles.switchText}>
          Don't have an account? <Link to="/register" className={styles.switchLink}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
