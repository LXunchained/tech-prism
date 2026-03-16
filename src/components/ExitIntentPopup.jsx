import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, Zap, ArrowRight } from 'lucide-react';
import { aiTools } from '../data/aiTools';
import { trackAffiliateClick } from '../utils/analytics';

const SESSION_KEY = 'tp_popup_shown';

// Feature the tool with a real affiliate link — ClickFunnels
const featuredTool = aiTools.find(t => t.slug === 'clickfunnels') || aiTools[0];

export default function ExitIntentPopup() {
    const [visible, setVisible] = useState(false);

    const dismiss = useCallback(() => {
        setVisible(false);
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (_) {}
    }, []);

    useEffect(() => {
        // Don't show again this session
        try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch (_) {}

        let fired = false;

        const fire = () => {
            if (fired) return;
            fired = true;
            setVisible(true);
        };

        // Scroll depth trigger: 80% of page
        const onScroll = () => {
            const doc = document.documentElement;
            const scrolled = doc.scrollTop + doc.clientHeight;
            const total = doc.scrollHeight;
            if (total > 0 && scrolled / total >= 0.80) fire();
        };

        // Exit intent: mouse moves to top 10px on desktop
        const onMouseOut = (e) => {
            if (e.clientY <= 10 && e.relatedTarget === null) fire();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('mouseleave', onMouseOut);

        return () => {
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('mouseleave', onMouseOut);
        };
    }, []);

    // ESC to close
    useEffect(() => {
        if (!visible) return;
        const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [visible, dismiss]);

    if (!visible) return null;

    return (
        <div
            className="exit-popup-overlay"
            onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
            role="dialog"
            aria-modal="true"
            aria-label={`Offre spéciale — ${featuredTool.name}`}
        >
            <div className="exit-popup-card">
                {/* Close */}
                <button
                    className="exit-popup-close"
                    onClick={dismiss}
                    aria-label="Fermer"
                >
                    <X size={18} />
                </button>

                {/* Badge */}
                <div className="exit-popup-badge">
                    <Zap size={13} />
                    Offre Exclusive
                </div>

                {/* Logo + name */}
                <div className="exit-popup-logo">{featuredTool.logo}</div>
                <h2 className="exit-popup-title">Essayez {featuredTool.name} gratuitement</h2>
                <p className="exit-popup-sub">
                    {featuredTool.tagline}
                </p>

                {/* Stats row */}
                <div className="exit-popup-stats">
                    <div className="exit-popup-stat">
                        <span className="exit-popup-stat-val">{featuredTool.commission}</span>
                        <span className="exit-popup-stat-label">commission récurrente</span>
                    </div>
                    <div className="exit-popup-stat-sep" />
                    <div className="exit-popup-stat">
                        <span className="exit-popup-stat-val">{featuredTool.price}</span>
                        <span className="exit-popup-stat-label">à partir de</span>
                    </div>
                    <div className="exit-popup-stat-sep" />
                    <div className="exit-popup-stat">
                        <span className="exit-popup-stat-val">14j</span>
                        <span className="exit-popup-stat-label">essai gratuit</span>
                    </div>
                </div>

                {/* CTA */}
                <Link
                    to={`/go/${featuredTool.slug}`}
                    className="exit-popup-cta"
                    onClick={() => {
                        trackAffiliateClick(featuredTool.slug, featuredTool.name, 'exit-popup');
                        dismiss();
                    }}
                >
                    Commencer l'essai gratuit <ArrowRight size={16} />
                </Link>

                <button className="exit-popup-skip" onClick={dismiss}>
                    Non merci, je préfère continuer sans →
                </button>

                <p className="exit-popup-disclaimer">
                    Lien affilié — commission {featuredTool.commission} récurrente sur vente
                </p>
            </div>
        </div>
    );
}
