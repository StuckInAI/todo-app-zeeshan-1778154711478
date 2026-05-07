import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getListingsByUser, deleteListing } from '@/lib/storage';
import type { Listing } from '@/types';
import ListingCard from '@/components/ListingCard';
import { PlusCircle, LayoutDashboard, Briefcase } from 'lucide-react';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);

  const load = useCallback(() => {
    if (user) setListings(getListingsByUser(user.id));
  }, [user]);

  useEffect(() => { load(); }, [load]);

  function handleDelete(id: string) {
    if (!user) return;
    if (!window.confirm('Delete this listing?')) return;
    deleteListing(id, user.id);
    load();
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.breadcrumb}><LayoutDashboard size={15} /> Dashboard</div>
            <h1 className={styles.title}>My Listings</h1>
            <p className={styles.subtitle}>Manage your job postings</p>
          </div>
          <Link to="/dashboard/new" className="btn btn-primary">
            <PlusCircle size={16} /> Post a Job
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{listings.length}</div>
            <div className={styles.statLabel}>Total Listings</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{listings.filter(l => l.type === 'full-time').length}</div>
            <div className={styles.statLabel}>Full-time</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{listings.filter(l => l.type === 'remote').length}</div>
            <div className={styles.statLabel}>Remote</div>
          </div>
        </div>

        {/* Listings */}
        {listings.length === 0 ? (
          <div className={styles.empty}>
            <Briefcase size={48} />
            <h3>No listings yet</h3>
            <p>Post your first job to start attracting candidates.</p>
            <Link to="/dashboard/new" className="btn btn-primary">
              <PlusCircle size={16} /> Post Your First Job
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {listings.map(l => (
              <ListingCard key={l.id} listing={l} showActions onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
