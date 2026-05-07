import { useParams, useNavigate, Link } from 'react-router-dom';
import { getListingById } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { MapPin, DollarSign, Briefcase, Clock, ArrowLeft, Building2, Edit } from 'lucide-react';
import styles from './ListingDetailPage.module.css';

const TYPE_BADGE: Record<string, string> = {
  'full-time': 'badge-blue',
  'part-time': 'badge-orange',
  'contract': 'badge-purple',
  'remote': 'badge-green',
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const listing = id ? getListingById(id) : undefined;

  if (!listing) {
    return (
      <div className={`page-wrapper ${styles.notFound}`}>
        <Briefcase size={48} />
        <h2>Listing not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Jobs</button>
      </div>
    );
  }

  const isOwner = user?.id === listing.userId;

  return (
    <div className="page-wrapper">
      <div className="container">
        <button className={`btn btn-ghost btn-sm ${styles.back}`} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{listing.company.charAt(0).toUpperCase()}</div>
                <div className={styles.titleBlock}>
                  <h1 className={styles.title}>{listing.title}</h1>
                  <div className={styles.company}><Building2 size={15} />{listing.company}</div>
                </div>
                <span className={`badge ${TYPE_BADGE[listing.type]}`}>{listing.type}</span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}><MapPin size={14} />{listing.location}</span>
                {listing.salaryRange && <span className={styles.metaItem}><DollarSign size={14} />{listing.salaryRange}</span>}
                <span className={styles.metaItem}><Clock size={14} />Posted {timeAgo(listing.createdAt)}</span>
              </div>

              <hr className={styles.divider} />

              <h2 className={styles.sectionTitle}>Job Description</h2>
              <div className={styles.description}>
                {listing.description.split('\n').map((para, i) => (
                  para.trim() ? <p key={i}>{para}</p> : null
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Job Overview</h3>
              <div className={styles.sideItems}>
                <div className={styles.sideItem}><Briefcase size={16} /><div><span>Type</span><strong>{listing.type}</strong></div></div>
                <div className={styles.sideItem}><MapPin size={16} /><div><span>Location</span><strong>{listing.location}</strong></div></div>
                {listing.salaryRange && <div className={styles.sideItem}><DollarSign size={16} /><div><span>Salary</span><strong>{listing.salaryRange}</strong></div></div>}
              </div>
            </div>

            {isOwner ? (
              <Link to={`/dashboard/edit/${listing.id}`} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                <Edit size={16} /> Edit Listing
              </Link>
            ) : (
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Apply Now
              </button>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
