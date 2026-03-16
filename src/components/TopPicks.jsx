import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { aiTools } from '../data/aiTools';
import AffiliateProductCard from './AffiliateProductCard';

// Top 3 tools with a badge (recommended or top-pick)
const topTools = aiTools.filter(t => t.badge).slice(0, 3);

export default function TopPicks() {
    return (
        <section className="top-picks-section">
            {/* Ambient glow */}
            <div className="top-picks-glow" aria-hidden="true" />

            <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.35rem 1rem', borderRadius: '9999px',
                        background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)',
                        fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: '#a78bfa', marginBottom: '1.25rem',
                    }}>
                        <Sparkles size={13} />
                        Outils IA Recommandés
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                        fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #fff 40%, #a78bfa 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        Nos Top Picks IA
                    </h2>
                    <p style={{ color: '#94a3b8', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
                        Des outils sélectionnés pour leur qualité, leur commission récurrente,
                        et leur <span style={{ color: '#a78bfa', fontWeight: 500 }}>capacité à transformer votre workflow.</span>
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="top-picks-grid">
                    {topTools.map((tool, idx) => (
                        <AffiliateProductCard key={tool.slug} tool={tool} source="top-picks" idx={idx} />
                    ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{ textAlign: 'center', marginTop: '2.5rem' }}
                >
                    <Link
                        to="/comparatifs"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            color: '#a78bfa', fontWeight: 700, fontSize: '0.9rem',
                            textDecoration: 'none', transition: 'gap 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.gap = '0.75rem'}
                        onMouseLeave={e => e.currentTarget.style.gap = '0.5rem'}
                    >
                        Comparer tous les outils <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
