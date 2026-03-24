import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ChevronRight, ArrowUpRight, Clock, Search } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { tradingGuides, affiliateLinks } from '../data/tradingData';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

// Guide listing page
function GuidesList() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...new Set(tradingGuides.map(g => g.category))];

    const filtered = tradingGuides.filter(g => {
        const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
            g.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchCategory = activeCategory === 'All' || g.category === activeCategory;
        return matchSearch && matchCategory;
    });

    return (
        <>
            <section className="trading-hero" style={{ paddingBottom: '2rem' }}>
                <div className="section-container">
                    <Link to="/trading" className="trading-back-link">
                        <ArrowLeft size={16} /> Back to Trading Hub
                    </Link>
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                        <span className="trading-hero-badge">
                            <BookOpen size={14} /> Learn Trading
                        </span>
                    </motion.div>
                    <motion.h1 className="trading-hero-title" initial="hidden" animate="visible" variants={fadeUp} custom={1} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                        Trading Guides
                    </motion.h1>
                    <motion.p className="trading-hero-subtitle" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        Learn the strategies, risk management rules, and tools we use to trade crypto profitably.
                    </motion.p>

                    {/* Search */}
                    <motion.div className="blog-search-wrap" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
                        <Search size={16} className="blog-search-icon" />
                        <input
                            type="text"
                            placeholder="Search guides..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="blog-search-input"
                            id="guide-search"
                        />
                    </motion.div>
                </div>
            </section>

            <div className="section-container" style={{ paddingBottom: '6rem' }}>
                {/* Category filters */}
                <motion.div className="trading-guide-filters" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Guides grid */}
                <div className="trading-guides-grid">
                    {filtered.map((guide, i) => (
                        <motion.div key={guide.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                            <Link to={`/trading/guides/${guide.slug}`} className="trading-guide-card" id={`guide-${guide.slug}`}>
                                <div className="trading-guide-card-top">
                                    <span className="trading-guide-category">{guide.category}</span>
                                    <span className="trading-guide-read-time"><Clock size={12} /> {guide.readTime}</span>
                                </div>
                                <div className="trading-guide-icon">{guide.icon}</div>
                                <h3 className="trading-guide-title">{guide.title}</h3>
                                <p className="trading-guide-excerpt">{guide.excerpt}</p>
                                <div className="trading-guide-footer">
                                    <span className="trading-guide-date">
                                        {new Date(guide.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="trading-guide-read-more">
                                        Read <ChevronRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="trading-journal-empty" style={{ marginTop: '3rem' }}>
                        <BookOpen size={32} />
                        <p>No guides found matching your search.</p>
                    </div>
                )}
            </div>
        </>
    );
}

// Individual guide detail page
function GuideDetail({ slug }) {
    const guide = tradingGuides.find(g => g.slug === slug);

    if (!guide) {
        return (
            <div className="section-container" style={{ paddingTop: '8rem', paddingBottom: '6rem', textAlign: 'center' }}>
                <h1>Guide Not Found</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>This guide doesn't exist.</p>
                <Link to="/trading/guides" className="btn btn-primary" style={{ marginTop: '2rem', textDecoration: 'none' }}>
                    Back to Guides
                </Link>
            </div>
        );
    }

    return (
        <>
            <section className="trading-hero" style={{ paddingBottom: '2rem' }}>
                <div className="section-container">
                    <Link to="/trading/guides" className="trading-back-link">
                        <ArrowLeft size={16} /> Back to Guides
                    </Link>
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                        <span className="trading-hero-badge">
                            {guide.icon} {guide.category}
                        </span>
                    </motion.div>
                    <motion.h1 className="trading-hero-title" initial="hidden" animate="visible" variants={fadeUp} custom={1} style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
                        {guide.title}
                    </motion.h1>
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <span><Clock size={14} style={{ verticalAlign: '-2px' }} /> {guide.readTime} read</span>
                        <span>{new Date(guide.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </motion.div>
                </div>
            </section>

            <div className="section-container" style={{ paddingBottom: '6rem' }}>
                <motion.article className="trading-guide-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    {guide.content.map((block, i) => {
                        if (block.type === 'paragraph') {
                            return <p key={i}>{block.text}</p>;
                        }
                        if (block.type === 'heading') {
                            return <h2 key={i}>{block.text}</h2>;
                        }
                        if (block.type === 'list') {
                            return (
                                <ul key={i}>
                                    {block.items.map((item, j) => <li key={j}>{item}</li>)}
                                </ul>
                            );
                        }
                        if (block.type === 'cta') {
                            return (
                                <div key={i} className="trading-guide-cta">
                                    <a href={block.url} target={block.url.startsWith('/') ? '_self' : '_blank'} rel="noopener noreferrer" className="hero-btn-primary" style={{ textDecoration: 'none' }}>
                                        {block.text} <ArrowUpRight size={16} />
                                    </a>
                                    {block.label && <p className="trading-guide-cta-label">{block.label}</p>}
                                </div>
                            );
                        }
                        return null;
                    })}
                </motion.article>

                {/* Related guides */}
                <div style={{ marginTop: '4rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>More Guides</h3>
                    <div className="trading-guides-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {tradingGuides.filter(g => g.slug !== slug).slice(0, 3).map((g, i) => (
                            <Link to={`/trading/guides/${g.slug}`} className="trading-guide-card" key={g.slug}>
                                <div className="trading-guide-card-top">
                                    <span className="trading-guide-category">{g.category}</span>
                                    <span className="trading-guide-read-time"><Clock size={12} /> {g.readTime}</span>
                                </div>
                                <div className="trading-guide-icon">{g.icon}</div>
                                <h3 className="trading-guide-title">{g.title}</h3>
                                <p className="trading-guide-excerpt">{g.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default function TradingGuides() {
    const { slug } = useParams();

    return (
        <div className="trading-page">
            {slug ? <GuideDetail slug={slug} /> : <GuidesList />}
        </div>
    );
}
