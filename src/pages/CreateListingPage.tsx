import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { createListing } from '@/lib/storage';
import type { Listing } from '@/types';
import ListingForm from '@/components/ListingForm';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import styles from './FormPage.module.css';

export default function CreateListingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: { title: string; company: string; location: string; description: string; salaryRange: string; type: Listing['type'] }) {
    if (!user) return;
    setLoading(true);
    createListing({ ...data, userId: user.id });
    navigate('/dashboard');
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <Link to="/dashboard" className={`btn btn-ghost btn-sm ${styles.back}`}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrap}><PlusCircle size={22} /></div>
            <div>
              <h1 className={styles.title}>Post a New Job</h1>
              <p className={styles.subtitle}>Fill in the details below to publish your listing</p>
            </div>
          </div>
          <ListingForm submitLabel="Publish Listing" onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}
