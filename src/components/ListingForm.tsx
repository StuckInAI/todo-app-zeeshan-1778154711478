import { useState } from 'react';
import type { Listing } from '@/types';
import styles from './ListingForm.module.css';

type FormData = {
  title: string;
  company: string;
  location: string;
  description: string;
  salaryRange: string;
  type: Listing['type'];
};

type Props = {
  initial?: Partial<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
  submitLabel: string;
  loading?: boolean;
};

export default function ListingForm({ initial, onSubmit, submitLabel, loading }: Props) {
  const [form, setForm] = useState<FormData>({
    title: initial?.title || '',
    company: initial?.company || '',
    location: initial?.location || '',
    description: initial?.description || '',
    salaryRange: initial?.salaryRange || '',
    type: initial?.type || 'full-time',
  });
  const [error, setError] = useState('');

  function set(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.location.trim() || !form.description.trim()) {
      setError('Title, company, location, and description are required.');
      return;
    }
    setError('');
    await onSubmit(form);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={`error-msg ${styles.errorBox}`}>{error}</div>}

      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Senior Frontend Engineer" />
        </div>
        <div className="form-group">
          <label className="form-label">Company Name *</label>
          <input className="form-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="e.g. Acme Corp" />
        </div>
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label">Location *</label>
          <input className="form-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. San Francisco, CA or Remote" />
        </div>
        <div className="form-group">
          <label className="form-label">Job Type *</label>
          <select className="form-input" value={form.type} onChange={e => set('type', e.target.value as Listing['type'])}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Salary Range</label>
        <input className="form-input" value={form.salaryRange} onChange={e => set('salaryRange', e.target.value)} placeholder="e.g. $80k – $110k" />
      </div>

      <div className="form-group">
        <label className="form-label">Job Description *</label>
        <textarea className="form-input form-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the role, responsibilities, and requirements…" rows={6} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
