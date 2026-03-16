import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, TrendingUp } from 'lucide-react';
import { trackAffiliateClick, trackAffiliateView } from '../utils/analytics';

function StarRating({ rating }) {
    return (
        <div className="star-rating" aria-label={`Note: ${rating}/5`}>
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ color: i <= Math.round(rating) ? '#fbbf24' : '#334155', fontSize: '0.9rem' }}>★</span>
            ))}
            <span className="star-label">{rating.toFixed(1)}</span>
        </div>
    );
}

function CommissionBadge({ commission, type }) {
    return (
        <span className={`commission-badge commission-badge--${type === 'recurring' ? 'recurring' : 'onetime'}`}>
            <TrendingUp size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
            {commission} {type === 'recurring' ? 'récurrent' : 'one-time'}
        </span>
    );
}

function RecommendedBadge({ badge }) {
    if (!badge) return null;
    const isTop = badge === 'top-pick';
    return (
        <span className={`recommended-badge ${isTop ? 'recommended-badge--top' : ''}`}>
            {isTop ? '🏆 Top Pick' : '⭐ Recommandé'}
        </span>
    );
}

export default function AffiliateProductCard({ tool, source = 'card', idx = 0 }) {
    const cardRef = useRef(null);
    const viewed = useRef(false);

    // IntersectionObserver — fire affiliate_view once
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !viewed.current) {
                    viewed.current = true;
                    trackAffiliateView(tool.slug, tool.name);
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [tool.slug, tool.name]);

    const handleClick = () => trackAffiliateClick(tool.slug, tool.name, source);

    return (
        <motion.article
            ref={cardRef}
            className="affiliate-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(idx * 0.06, 0.3) }}
        >
            {/* Top badges row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="affiliate-card-logo">{tool.logo}</div>
                <RecommendedBadge badge={tool.badge} />
            </div>

            {/* Name + tagline */}
            <h3 className="affiliate-card-name">{tool.name}</h3>
            <p className="affiliate-card-tagline">{tool.tagline}</p>

            {/* Rating */}
            <div style={{ margin: '1rem 0 0.75rem' }}>
                <StarRating rating={tool.rating} />
            </div>

            {/* Price + free trial */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#f8fafc' }}>
                    {tool.price}
                </span>
                {tool.hasFreeTrial && (
                    <span style={{
                        fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.6rem',
                        borderRadius: '0.45rem', background: 'rgba(34,197,94,0.12)',
                        color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)',
                    }}>
                        ✓ Essai gratuit
                    </span>
                )}
            </div>

            {/* Commission badge */}
            <CommissionBadge commission={tool.commission} type={tool.commissionType} />

            {/* CTA */}
            <Link
                to={`/go/${tool.slug}`}
                onClick={handleClick}
                className="affiliate-cta-btn"
                style={{ marginTop: '1.5rem' }}
            >
                Essayer gratuitement <ArrowRight size={16} />
            </Link>

            {/* Review link */}
            <Link
                to={`/reviews/${tool.slug}`}
                style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}
            >
                Lire la review complète →
            </Link>
        </motion.article>
    );
}
