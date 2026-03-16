import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Tag, ArrowRight, Search } from 'lucide-react';
import blogPosts from '../data/blogPosts.json';

function timeAgo(iso) {
    const diff = Math.floor((Date.now() - new Date(iso)) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 30) return `${diff} days ago`;
    if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
    return `${Math.floor(diff / 365)} years ago`;
}

function BlogCard({ post }) {
    const date = post.publishedAt || post.generated_at || '';
    return (
        <Link to={`/blog/${post.slug}`} className="blog-card">
            <div className="blog-card-top">
                <span className="blog-card-category">{post.category || 'Tech'}</span>
                {date && (
                    <span className="blog-card-date">
                        <Calendar size={12} />
                        {timeAgo(date)}
                    </span>
                )}
            </div>
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-excerpt">{post.meta_description || post.metaDescription || ''}</p>
            <div className="blog-card-footer">
                {post.rating && (
                    <span className="blog-card-rating">⭐ {Number(post.rating).toFixed(1)}</span>
                )}
                {post.price > 0 && (
                    <span className="blog-card-price">${Number(post.price).toFixed(2)}</span>
                )}
                <span className="blog-card-read-more">
                    Read Review <ArrowRight size={14} />
                </span>
            </div>
        </Link>
    );
}

function EmptyState() {
    return (
        <div className="blog-empty">
            <BookOpen size={48} color="#8b5cf6" strokeWidth={1.5} />
            <h2>First articles coming soon</h2>
            <p>
                Our AI-powered review engine is generating in-depth product articles daily.<br />
                Check back shortly — new reviews publish automatically every 24 hours.
            </p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Browse Deals Now
            </Link>
        </div>
    );
}

export default function Blog() {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState(blogPosts);

    useEffect(() => {
        document.title = 'Tech Reviews & Deals Blog | TechPrism';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute('content', 'In-depth AI-powered tech product reviews, honest pros & cons, and Amazon deals updated daily.');
        }
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setFiltered(blogPosts);
            return;
        }
        const q = query.toLowerCase();
        setFiltered(
            blogPosts.filter(
                (p) =>
                    p.title?.toLowerCase().includes(q) ||
                    p.keyword?.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q)
            )
        );
    }, [query]);

    return (
        <div className="blog-page">
            {/* Hero */}
            <section className="blog-hero">
                <div className="section-container">
                    <div className="blog-hero-badge">
                        <BookOpen size={14} />
                        AI-Powered Reviews
                    </div>
                    <h1 className="blog-hero-title">
                        Tech Reviews &amp; Deals
                    </h1>
                    <p className="blog-hero-subtitle">
                        Honest, in-depth product reviews generated daily — so you never miss a great deal.
                    </p>

                    {/* Search */}
                    <div className="blog-search-wrap">
                        <Search size={16} className="blog-search-icon" />
                        <input
                            id="blog-search"
                            type="search"
                            className="blog-search-input"
                            placeholder="Search reviews…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="blog-grid-section">
                <div className="section-container">
                    {filtered.length === 0 ? (
                        blogPosts.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <p className="blog-no-results">No articles match "{query}". Try a different keyword.</p>
                        )
                    ) : (
                        <>
                            <p className="blog-count">
                                <Tag size={14} /> {filtered.length} review{filtered.length !== 1 ? 's' : ''}
                            </p>
                            <div className="blog-grid">
                                {filtered.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
