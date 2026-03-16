import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sparkles } from 'lucide-react';
import ComparisonTable from '../components/ComparisonTable';
import { aiTools } from '../data/aiTools';

export default function Comparatifs() {
    useEffect(() => {
        document.title = 'Comparatif Outils IA 2026 — TechPrism';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', 'Comparatif complet des meilleurs outils IA : Jasper, Writesonic, Synthesia, Surfer SEO, HubSpot. Commissions affiliées, essais gratuits, notes et avis.');
    }, []);

    return (
        <div className="blog-page" style={{ minHeight: '100vh' }}>
            {/* Hero */}
            <section className="blog-hero" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div className="blog-hero-badge">
                            <BarChart3 size={14} />
                            Comparatif 2026
                        </div>
                        <h1 className="blog-hero-title">
                            Meilleurs Outils IA
                        </h1>
                        <p className="blog-hero-subtitle" style={{ maxWidth: '46rem' }}>
                            Trouvez l'outil parfait pour votre workflow — tous les prix, commissions et essais gratuits réunis en un seul tableau interactif.
                        </p>

                        {/* Quick stats */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                            {[
                                { label: 'Outils testés', value: String(aiTools.length) },
                                { label: 'Commission max', value: Math.max(...aiTools.map(t => parseFloat(t.commission))) + '%' },
                                { label: 'Essais gratuits', value: aiTools.filter(t => t.hasFreeTrial).length + '/' + aiTools.length },
                            ].map(s => (
                                <div key={s.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: '#a78bfa' }}>{s.value}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Table section */}
            <section style={{ padding: '1rem 0 6rem' }}>
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ComparisonTable />
                    </motion.div>
                </div>
            </section>

            {/* Disclaimer */}
            <div style={{ textAlign: 'center', paddingBottom: '4rem', color: '#334155', fontSize: '0.72rem' }}>
                <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                Liens affiliés — Nous percevons une commission si vous souscrivez via nos liens. Cela ne change pas votre prix.
            </div>
        </div>
    );
}
