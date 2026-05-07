import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllListings } from '@/lib/storage';
import type { Listing } from '@/types';
import ListingCard from '@/components/ListingCard';
import { Search, Briefcase, TrendingUp, Users, ArrowRight } from 'lucide-react';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    setListings(getAllListings(query));
  }, [query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <TrendingUp size={14} />
              <span>{listings.length} active jobs</span>
            </div>
            <h1 className={styles.heroTitle}>
              Find Your<br />
              <span className={styles.heroAccent}>Dream Job</span>
            </h1>
            <p className={styles.heroSub}>
              Browse thousands of job listings from top companies. Your next career move starts here.
            </p>
            <form className={styles.searchBox} onSubmit={handleSearch}>
              <Search size={18} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs by title, company, location…"
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <div className={styles.heroStats}>
              <div className={styles.stat}><Briefcase size={16} /><span>500+ companies</span></div>
              <div className={styles.stat}><Users size={16} /><span>10k+ candidates</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className={styles.listingsSection}>
        <div className="container">
          <div className={styles.listingsHeader}>
            <div>
              <h2 className={styles.listingsTitle}>
                {query ? `Results for "${query}"` : 'Latest Openings'}
              </h2>
              <p className={styles.listingsCount}>{listings.length} job{listings.length !== 1 ? 's' : ''} found</p>
            </div>
            {query && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setQuery(''); }}>
                Clear search
              </button>
            )}
          </div>

          {listings.length === 0 ? (
            <div className={styles.empty}>
              <Briefcase size={40} />
              <p>No jobs found. Try a different search.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {listings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}

          <div className={styles.cta}>
            <p>Are you hiring? <Link to="/register" className={styles.ctaLink}>Post a job <ArrowRight size={14} /></Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
