import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Check, X, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { getToolBySlug, aiTools } from '../data/aiTools';
import { trackAffiliateClick } from '../utils/analytics';

function StarsFull({ rating }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {[1, 2, 3, 4, 5].map(i => (
                <Star
                    key={i}
                    size={20}
                    fill={i <= Math.round(rating) ? '#fbbf24' : 'none'}
                    color={i <= Math.round(rating) ? '#fbbf24' : '#334155'}
                    strokeWidth={1.5}
                />
            ))}
            <span style={{ marginLeft: '0.5rem', fontWeight: 800, fontSize: '1.1rem', color: '#fbbf24' }}>
                {rating.toFixed(1)}/5
            </span>
        </div>
    );
}

function StickyCtaBar({ tool }) {
    const handleClick = () => trackAffiliateClick(tool.slug, tool.name, 'review-sticky');
    return (
        <aside className="review-sidebar">
            <div className="sidebar-card">
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{tool.logo}</div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>{tool.name}</div>
                    <StarsFull rating={tool.rating} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span style={{ color: '#94a3b8' }}>Prix de départ</span>
                        <span style={{ fontWeight: 700 }}>{tool.price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span style={{ color: '#94a3b8' }}>Commission</span>
                        <span className={`commission-badge commission-badge--${tool.commissionType === 'recurring' ? 'recurring' : 'onetime'}`}>
                            {tool.commission} {tool.commissionType === 'recurring' ? 'récurrent' : ''}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', alignItems: 'center' }}>
                        <span style={{ color: '#94a3b8' }}>Essai gratuit</span>
                        {tool.hasFreeTrial
                            ? <Check size={14} color="#4ade80" />
                            : <X size={14} color="#ef4444" />
                        }
                    </div>
                </div>

                <Link
                    to={`/go/${tool.slug}`}
                    onClick={handleClick}
                    className="affiliate-cta-btn"
                    style={{ textAlign: 'center', width: '100%' }}
                >
                    {tool.hasFreeTrial ? 'Essai gratuit →' : 'Voir les prix →'}
                </Link>
                <p style={{ textAlign: 'center', fontSize: '0.67rem', color: '#475569', marginTop: '0.75rem' }}>
                    Lien affilié — commission sur vente
                </p>
            </div>
        </aside>
    );
}

function RelatedReviews({ current }) {
    // Same category first, then fallback to other tools, always exclude current
    const sameCat = aiTools.filter(t => t.slug !== current.slug && t.category === current.category);
    const others = aiTools.filter(t => t.slug !== current.slug && t.category !== current.category);
    const related = [...sameCat, ...others].slice(0, 3);
    if (related.length === 0) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                Vous aimerez aussi
            </h2>
            <div className="related-reviews-grid">
                {related.map(tool => (
                    <div key={tool.slug} className="related-review-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>{tool.logo}</span>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{tool.name}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                    <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>★</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{tool.rating.toFixed(1)}</span>
                                    <span className={`commission-badge commission-badge--${tool.commissionType === 'recurring' ? 'recurring' : 'onetime'}`} style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                                        {tool.commission}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem', fontWeight: 300 }}>
                            {tool.tagline}
                        </p>
                        <Link to={`/reviews/${tool.slug}`} className="related-review-btn">
                            Voir la review <ArrowRight size={13} />
                        </Link>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function ReviewDetail() {
    const { slug } = useParams();
    const tool = getToolBySlug(slug);

    useEffect(() => {
        if (!tool) return;
        document.title = `Review ${tool.name} 2026 — TechPrism`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', `Notre avis complet sur ${tool.name} : pros, cons, prix, et verdict. Est-ce le bon outil pour vous ?`);
    }, [tool]);

    if (!tool) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>Outil introuvable</h1>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Cette review n'existe pas encore.</p>
                    <Link to="/comparatifs" className="hero-btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                        Voir le comparatif
                    </Link>
                </div>
            </div>
        );
    }

    const handleCtaClick = (src) => trackAffiliateClick(tool.slug, tool.name, src);

    return (
        <div className="review-page" style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
            <div className="section-container">
                {/* Review layout */}
                <div className="review-layout">
                    {/* Main content */}
                    <main className="review-main">
                        {/* Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Link to="/comparatifs" style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: '1.5rem' }}>
                                ← Tous les comparatifs
                            </Link>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <div style={{
                                    width: '4rem', height: '4rem', borderRadius: '1.25rem',
                                    background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                                }}>
                                    {tool.logo}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                                        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
                                            {tool.name}
                                        </h1>
                                        {tool.badge && (
                                            <span className={`recommended-badge ${tool.badge === 'top-pick' ? 'recommended-badge--top' : ''}`}>
                                                {tool.badge === 'top-pick' ? '🏆 Top Pick' : '⭐ Recommandé'}
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ color: '#94a3b8', fontWeight: 300, margin: 0 }}>{tool.tagline}</p>
                                </div>
                            </div>

                            <StarsFull rating={tool.rating} />
                            <p style={{ color: '#475569', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                                Basé sur {tool.reviewCount?.toLocaleString()} avis vérifiés
                            </p>
                        </motion.div>

                        {/* Pros / Cons */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                            style={{ marginTop: '2.5rem' }}
                        >
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Avantages & Inconvénients</h2>
                            <div className="pros-cons-grid">
                                <div className="pros-col">
                                    <div className="pros-cons-header pros-header">✅ Avantages</div>
                                    {tool.pros.map((p, i) => (
                                        <div key={i} className="pros-item">
                                            <Check size={14} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
                                            {p}
                                        </div>
                                    ))}
                                </div>
                                <div className="cons-col">
                                    <div className="pros-cons-header cons-header">❌ Inconvénients</div>
                                    {tool.cons.map((c, i) => (
                                        <div key={i} className="cons-item">
                                            <X size={14} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Pricing */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                            style={{ marginTop: '2.5rem' }}
                        >
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Tarifs</h2>
                            <div className="pricing-grid">
                                {tool.pricingTiers.map((tier, i) => (
                                    <div key={i} className={`pricing-card ${i === 1 ? 'pricing-card--highlight' : ''}`}>
                                        <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>{tier.name}</div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#a78bfa', marginBottom: '0.75rem' }}>{tier.price}</div>
                                        <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6 }}>{tier.features}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Verdict */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            style={{ marginTop: '2.5rem' }}
                        >
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>Notre Verdict</h2>
                            <div className="verdict-card">
                                <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontWeight: 300 }}>{tool.verdict}</p>
                            </div>
                        </motion.div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                            style={{ marginTop: '2.5rem', padding: '2.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(15,23,42,0.6))', border: '1px solid rgba(139,92,246,0.2)', textAlign: 'center' }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{tool.logo}</div>
                            <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                Prêt à essayer {tool.name} ?
                            </h3>
                            <p style={{ color: '#94a3b8', fontWeight: 300, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                {tool.hasFreeTrial
                                    ? 'Commencez avec un essai gratuit — aucune carte bancaire requise.'
                                    : `Démarrez dès aujourd'hui à partir de ${tool.price}.`
                                }
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link
                                    to={`/go/${tool.slug}`}
                                    onClick={() => handleCtaClick('review-bottom')}
                                    className="affiliate-cta-btn"
                                >
                                    {tool.hasFreeTrial ? 'Commencer gratuitement' : 'Voir les offres'} <ArrowRight size={16} />
                                </Link>
                                <Link to="/comparatifs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', borderRadius: '0.875rem', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                                    Voir le comparatif complet
                                </Link>
                            </div>
                            <p style={{ marginTop: '1rem', fontSize: '0.67rem', color: '#334155' }}>
                                <TrendingUp size={11} style={{ display: 'inline', marginRight: 3 }} />
                                Lien affilié — commission {tool.commission} {tool.commissionType === 'recurring' ? 'récurrente' : ''} sur vente
                            </p>
                        </motion.div>
                    </main>

                    {/* Sticky sidebar */}
                    <StickyCtaBar tool={tool} />
                </div>

                {/* Related Reviews */}
                <RelatedReviews current={tool} />
            </div>
        </div>
    );
}
