import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { getToolBySlug } from '../data/aiTools';
import { trackAffiliateClick } from '../utils/analytics';

export default function GoRedirect() {
    const { slug } = useParams();
    const tool = getToolBySlug(slug);

    useEffect(() => {
        if (!tool) return;
        trackAffiliateClick(slug, tool.name, 'go-redirect');
        const timer = setTimeout(() => {
            window.location.href = tool.affiliateUrl;
        }, 1000);
        return () => clearTimeout(timer);
    }, [slug, tool]);

    if (!tool) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', maxWidth: 420 }}
                >
                    <div style={{
                        width: '4.5rem', height: '4.5rem', borderRadius: '1.25rem',
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <AlertCircle size={28} color="#ef4444" />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                        Lien introuvable
                    </h1>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
                        L'outil <strong style={{ color: '#fff' }}>/{slug}</strong> n'existe pas dans notre catalogue.
                    </p>
                    <Link to="/comparatifs" className="hero-btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                        Voir tous les outils
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center', maxWidth: 420 }}
            >
                {/* Logo */}
                <motion.div
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        width: '5rem', height: '5rem', borderRadius: '1.5rem',
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))',
                        border: '1px solid rgba(139,92,246,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.5rem', margin: '0 auto 2rem',
                        boxShadow: '0 0 40px rgba(139,92,246,0.15)',
                    }}
                >
                    {tool.logo}
                </motion.div>

                {/* Spinner */}
                <div style={{ position: 'relative', width: '2.5rem', height: '2.5rem', margin: '0 auto 1.5rem' }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{
                            width: '100%', height: '100%', borderRadius: '50%',
                            border: '3px solid rgba(139,92,246,0.15)',
                            borderTopColor: '#8b5cf6',
                        }}
                    />
                </div>

                <h1 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                    Redirection vers {tool.name}
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Vous allez être redirigé automatiquement...
                </p>

                <a
                    href={tool.affiliateUrl}
                    onClick={() => trackAffiliateClick(slug, tool.name, 'go-redirect-manual')}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        color: '#a78bfa', fontSize: '0.82rem', fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <ExternalLink size={14} />
                    Cliquez ici si la redirection ne démarre pas
                </a>

                <p style={{ marginTop: '2rem', fontSize: '0.7rem', color: '#475569' }}>
                    Lien affilié — cette page vous redirige vers {tool.name}.
                </p>
            </motion.div>
        </div>
    );
}
