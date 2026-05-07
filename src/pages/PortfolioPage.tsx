import {
  Github, Linkedin, Mail, ExternalLink, Download,
  Code2, Palette, Server, Smartphone, Star, ArrowRight, Globe
} from 'lucide-react';
import styles from './PortfolioPage.module.css';

const skills = [
  { category: 'Frontend', icon: <Palette size={20} />, items: ['React', 'TypeScript', 'CSS Modules', 'Tailwind CSS', 'Next.js', 'Vite'] },
  { category: 'Backend', icon: <Server size={20} />, items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST APIs', 'JWT Auth'] },
  { category: 'Mobile', icon: <Smartphone size={20} />, items: ['React Native', 'Expo', 'iOS', 'Android'] },
  { category: 'Tools', icon: <Code2 size={20} />, items: ['Git', 'Docker', 'Figma', 'VS Code', 'Vercel', 'Railway'] },
];

const projects = [
  {
    title: 'JobBoard SaaS',
    description: 'A full-featured job listings platform with authentication, CRUD operations, and real-time search. Built for B2C audiences with a clean, modern UI.',
    tags: ['React', 'TypeScript', 'Node.js', 'Prisma'],
    stars: 128,
    link: '#',
    repo: '#',
    featured: true,
    gradient: 'linear-gradient(135deg, #ef4444, #991b1b)',
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'Analytics dashboard for e-commerce businesses with real-time charts, inventory management, and order tracking.',
    tags: ['Next.js', 'PostgreSQL', 'Chart.js'],
    stars: 94,
    link: '#',
    repo: '#',
    featured: true,
    gradient: 'linear-gradient(135deg, #8b5cf6, #4c1d95)',
  },
  {
    title: 'Open Source UI Kit',
    description: 'A collection of 50+ accessible React components with dark mode support, full TypeScript types, and Storybook docs.',
    tags: ['React', 'Storybook', 'Radix UI'],
    stars: 312,
    link: '#',
    repo: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #f59e0b, #92400e)',
  },
  {
    title: 'Dev Blog Platform',
    description: 'A markdown-powered developer blog with syntax highlighting, RSS feed, and SEO optimization. Built with Next.js App Router.',
    tags: ['Next.js', 'MDX', 'Tailwind'],
    stars: 67,
    link: '#',
    repo: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #10b981, #064e3b)',
  },
];

const experience = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'TechCorp Inc.',
    period: '2022 – Present',
    desc: 'Led development of a multi-tenant SaaS platform serving 50k+ users. Reduced load times by 40% through code splitting and edge caching.',
  },
  {
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2020 – 2022',
    desc: 'Built consumer-facing React apps from scratch. Implemented design systems and collaborated closely with product and design teams.',
  },
  {
    role: 'Junior Developer',
    company: 'Agency Studio',
    period: '2018 – 2020',
    desc: 'Delivered web projects for clients across fintech, healthcare, and retail verticals. Worked across the full stack.',
  },
];

export default function PortfolioPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroLeft}>
            <div className={styles.available}>
              <span className={styles.dot} />
              Available for work
            </div>
            <h1 className={styles.heroName}>Alex Johnson</h1>
            <p className={styles.heroTitle}>Full-Stack Engineer & UI Designer</p>
            <p className={styles.heroDesc}>
              I build fast, accessible, and beautiful web products. Specialising in React ecosystems,
              Node.js backends, and everything in between.
            </p>
            <div className={styles.heroCtas}>
              <a href="#projects" className="btn btn-primary">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn btn-outline">
                <Mail size={16} /> Contact Me
              </a>
              <a href="#" className={`btn btn-ghost ${styles.resumeBtn}`}>
                <Download size={16} /> Resume
              </a>
            </div>
            <div className={styles.socials}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <Linkedin size={20} />
              </a>
              <a href="https://example.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <Globe size={20} />
              </a>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>AJ</span>
              </div>
              <div className={styles.avatarBadge}>
                <Code2 size={14} />
                <span>6 yrs exp.</span>
              </div>
            </div>
            <div className={styles.floatCard}>
              <p className={styles.floatCardNum}>50k+</p>
              <p className={styles.floatCardLabel}>Users Served</p>
            </div>
          </div>
        </div>
        <div className={styles.heroBg} />
      </section>

      {/* Skills */}
      <section className={styles.section} id="skills">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>What I work with</p>
            <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
          </div>
          <div className={styles.skillsGrid}>
            {skills.map(s => (
              <div key={s.category} className={styles.skillCard}>
                <div className={styles.skillIcon}>{s.icon}</div>
                <h3 className={styles.skillCategory}>{s.category}</h3>
                <div className={styles.skillTags}>
                  {s.items.map(item => (
                    <span key={item} className={styles.skillTag}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="projects">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>What I've built</p>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
          </div>
          <div className={styles.projectsGrid}>
            {projects.map(p => (
              <div key={p.title} className={`${styles.projectCard} ${p.featured ? styles.projectFeatured : ''}`}>
                <div className={styles.projectBanner} style={{ background: p.gradient }} />
                <div className={styles.projectBody}>
                  <div className={styles.projectMeta}>
                    <div className={styles.projectTags}>
                      {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                    <div className={styles.projectStars}>
                      <Star size={13} />
                      {p.stars}
                    </div>
                  </div>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectDesc}>{p.description}</p>
                  <div className={styles.projectLinks}>
                    <a href={p.link} className="btn btn-primary btn-sm">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a href={p.repo} className="btn btn-outline btn-sm">
                      <Github size={14} /> Source
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className={styles.section} id="experience">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Where I've worked</p>
            <h2 className={styles.sectionTitle}>Experience</h2>
          </div>
          <div className={styles.timeline}>
            {experience.map((exp, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <div>
                      <h3 className={styles.timelineRole}>{exp.role}</h3>
                      <p className={styles.timelineCompany}>{exp.company}</p>
                    </div>
                    <span className={styles.timelinePeriod}>{exp.period}</span>
                  </div>
                  <p className={styles.timelineDesc}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={`${styles.section} ${styles.contactSection}`} id="contact">
        <div className="container">
          <div className={styles.contactCard}>
            <p className={styles.sectionEyebrow} style={{ color: '#fca5a5' }}>Get in touch</p>
            <h2 className={styles.contactTitle}>Let's Work Together</h2>
            <p className={styles.contactDesc}>
              I'm currently open to new opportunities — freelance projects, full-time roles, or just a chat.
              Drop me a line and I'll get back to you within 24 hours.
            </p>
            <div className={styles.contactActions}>
              <a href="mailto:alex@example.com" className={`btn ${styles.contactBtn}`}>
                <Mail size={18} /> alex@example.com
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`btn ${styles.contactBtnOutline}`}>
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
