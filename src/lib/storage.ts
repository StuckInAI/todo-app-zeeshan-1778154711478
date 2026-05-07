import type { User, Listing } from '@/types';

const USERS_KEY = 'jb_users';
const LISTINGS_KEY = 'jb_listings';
const AUTH_KEY = 'jb_auth';

// ── helpers ──────────────────────────────────────────────────────────────────
function readUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function readListings(): Listing[] {
  try { return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]'); } catch { return []; }
}
function writeListings(listings: Listing[]) {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
}

// ── auth ─────────────────────────────────────────────────────────────────────
export type StoredAuth = { userId: string; token: string };

export function getStoredAuth(): StoredAuth | null {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch { return null; }
}
export function setStoredAuth(a: StoredAuth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(a));
}
export function clearStoredAuth() {
  localStorage.removeItem(AUTH_KEY);
}

// ── users ─────────────────────────────────────────────────────────────────────
export function findUserByEmail(email: string): User | undefined {
  return readUsers().find(u => u.email === email.toLowerCase());
}
export function findUserById(id: string): User | undefined {
  return readUsers().find(u => u.id === id);
}

// Simple password store (hashed with btoa for demo — NOT production-safe)
const PASSWORDS_KEY = 'jb_passwords';
function readPasswords(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(PASSWORDS_KEY) || '{}'); } catch { return {}; }
}
function writePasswords(p: Record<string, string>) {
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(p));
}
export function createUser(email: string, password: string): User {
  const user: User = { id: crypto.randomUUID(), email: email.toLowerCase(), createdAt: Date.now() };
  const users = readUsers();
  users.push(user);
  writeUsers(users);
  const passwords = readPasswords();
  passwords[user.id] = btoa(password);
  writePasswords(passwords);
  return user;
}
export function verifyPassword(userId: string, password: string): boolean {
  const passwords = readPasswords();
  return passwords[userId] === btoa(password);
}
export function generateToken(userId: string): string {
  return btoa(JSON.stringify({ userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 }));
}
export function validateToken(token: string): string | null {
  try {
    const { userId, exp } = JSON.parse(atob(token));
    if (Date.now() > exp) return null;
    return userId as string;
  } catch { return null; }
}

// ── listings ──────────────────────────────────────────────────────────────────
export function getAllListings(search?: string): Listing[] {
  let listings = readListings().sort((a, b) => b.createdAt - a.createdAt);
  if (search && search.trim()) {
    const q = search.toLowerCase();
    listings = listings.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q)
    );
  }
  return listings;
}
export function getListingsByUser(userId: string): Listing[] {
  return readListings().filter(l => l.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
}
export function getListingById(id: string): Listing | undefined {
  return readListings().find(l => l.id === id);
}
export function createListing(data: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>): Listing {
  const listing: Listing = { ...data, id: crypto.randomUUID(), createdAt: Date.now(), updatedAt: Date.now() };
  const listings = readListings();
  listings.push(listing);
  writeListings(listings);
  return listing;
}
export function updateListing(id: string, userId: string, data: Partial<Omit<Listing, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Listing | null {
  const listings = readListings();
  const idx = listings.findIndex(l => l.id === id && l.userId === userId);
  if (idx === -1) return null;
  listings[idx] = { ...listings[idx], ...data, updatedAt: Date.now() };
  writeListings(listings);
  return listings[idx];
}
export function deleteListing(id: string, userId: string): boolean {
  const listings = readListings();
  const idx = listings.findIndex(l => l.id === id && l.userId === userId);
  if (idx === -1) return false;
  listings.splice(idx, 1);
  writeListings(listings);
  return true;
}

// ── seed data ─────────────────────────────────────────────────────────────────
export function seedIfEmpty() {
  if (readListings().length > 0) return;
  const seed: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>[] = [
    { userId: 'seed', title: 'Senior Frontend Engineer', company: 'Acme Corp', location: 'San Francisco, CA', description: 'We are looking for a talented Senior Frontend Engineer to join our growing team. You will work on cutting-edge web applications using React and TypeScript.', salaryRange: '$130k – $160k', type: 'full-time' },
    { userId: 'seed', title: 'Product Designer', company: 'Designify', location: 'Remote', description: 'Join our design team to craft beautiful user experiences for millions of users worldwide. Experience with Figma and design systems required.', salaryRange: '$100k – $130k', type: 'remote' },
    { userId: 'seed', title: 'Backend Engineer (Node.js)', company: 'Streamline', location: 'New York, NY', description: 'Build scalable APIs and microservices. Strong experience with Node.js, PostgreSQL, and cloud infrastructure (AWS/GCP) is essential.', salaryRange: '$120k – $150k', type: 'full-time' },
    { userId: 'seed', title: 'Data Scientist', company: 'InsightAI', location: 'Austin, TX', description: 'Analyze large datasets and build ML models to drive business decisions. Python, TensorFlow, and strong statistics background required.', salaryRange: '$110k – $145k', type: 'full-time' },
    { userId: 'seed', title: 'DevOps Engineer', company: 'CloudNine', location: 'Remote', description: 'Manage CI/CD pipelines, Kubernetes clusters, and infrastructure as code. Experience with Terraform and AWS required.', salaryRange: '$115k – $140k', type: 'remote' },
    { userId: 'seed', title: 'iOS Developer', company: 'AppForge', location: 'Seattle, WA', description: 'Develop and maintain our iOS application. Swift expertise and experience shipping apps on the App Store required.', salaryRange: '$125k – $155k', type: 'full-time' },
  ];
  const now = Date.now();
  const listings = seed.map((s, i) => ({ ...s, id: crypto.randomUUID(), createdAt: now - i * 86400000, updatedAt: now - i * 86400000 }));
  writeListings(listings);
}
