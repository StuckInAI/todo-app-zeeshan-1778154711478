import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getListingById, updateListing } from '@/lib/storage';
import type { Listing } from '@/types';
import ListingForm from '@/components/ListingForm';
import { ArrowLeft, Edit } from 'lucide-react';
import styles from './FormPage.module.css';

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const listing = id ? getListingById(id) : undefined;

  if (!listing || listing.userId !== user?.id) {
    return (
      <div className={`page-wrapper ${styles.notFound}`}>
        <p>Listing not found or you don't have permission to edit it.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  async function handleSubmit(data: { title: string; company: string; location: string; description: string; salaryRange: string; type: Listing['type'] }) {
    if (!user || !id) return;
    setLoading(true);
    updateListing(id, user.id, data);
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
            <div className={styles.iconWrap}><Edit size={22} /></div>
            <div>
              <h1 className={styles.title}>Edit Listing</h1>
              <p className={styles.subtitle}>Update your job listing details</p>
            </div>
          </div>
          <ListingForm
            initial={listing}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
