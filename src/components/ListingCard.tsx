import { Link } from 'react-router-dom';
import type { Listing } from '@/types';
import { MapPin, DollarSign, Clock, Building2 } from 'lucide-react';
import styles from './ListingCard.module.css';

const TYPE_BADGE: Record<Listing['type'], string> = {
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
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}

type Props = { listing: Listing; showActions?: boolean; onDelete?: (id: string) => void };

export default function ListingCard({ listing, showActions, onDelete }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {listing.company.charAt(0).toUpperCase()}
        </div>
        <div className={styles.titleBlock}>
          <Link to={`/listings/${listing.id}`} className={styles.title}>
            {listing.title}
          </Link>
          <div className={styles.company}>
            <Building2 size={13} />
            {listing.company}
          </div>
        </div>
        <span className={`badge ${TYPE_BADGE[listing.type]}`}>{listing.type}</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.metaItem}><MapPin size={13} />{listing.location}</span>
        {listing.salaryRange && <span className={styles.metaItem}><DollarSign size={13} />{listing.salaryRange}</span>}
        <span className={styles.metaItem}><Clock size={13} />{timeAgo(listing.createdAt)}</span>
      </div>
      <p className={styles.desc}>{listing.description.slice(0, 140)}{listing.description.length > 140 ? '…' : ''}</p>
      {showActions && (
        <div className={styles.actions}>
          <Link to={`/dashboard/edit/${listing.id}`} className="btn btn-outline btn-sm">Edit</Link>
          <button onClick={() => onDelete?.(listing.id)} className="btn btn-danger btn-sm">Delete</button>
        </div>
      )}
    </div>
  );
}
