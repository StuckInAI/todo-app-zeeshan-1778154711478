import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, Briefcase } from 'lucide-react';
import styles from './AuthPage.module.css';

export default function RegisterPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) { navigate('/dashboard', { replace: true }); return null; }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    const { error: err } = await register(email, password);
    if (err) { setError(err); setLoading(false); return; }
    navigate('/dashboard');
  }

  return (
    <div className={`page-wrapper ${styles.pageWrapper}`}>
      <div className={styles.card}>
        <div className={styles.logoMark}><Briefcase size={24} /></div>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Start posting jobs for free</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorBox}>{error}</div>}

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            <UserPlus size={16} />
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <Link to="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
