import { useState, useEffect, useCallback } from 'react';
import { X, Zap, ArrowRight, TrendingUp } from 'lucide-react';

const SESSION_KEY = 'tp_popup_shown';

export default function ExitIntentPopup() {
    const [visible, setVisible] = useState(false);

    const dismiss = useCallback(() => {
        setVisible(false);
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (_) {}
    }, []);

    useEffect(() => {
        try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch (_) {}
        let fired = false;
        const fire = () => { if (fired) return; fired = true; setVisible(true); };

        const onScroll = () => {
            const doc = document.documentElement;
            const scrolled = doc.scrollTop + doc.clientHeight;
            const total = doc.scrollHeight;
            if (total > 0 && scrolled / total >= 0.80) fire();
        };
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
            aria-label="Special offer — OKX Trading"
        >
            <div className="exit-popup-card">
                <button className="exit-popup-close" onClick={dismiss} aria-label="Close">
                    <X size={18} />
                </button>

                <div className="exit-popup-badge">
                    <TrendingUp size={13} />
                    Exclusive Offer
                </div>

                <div className="exit-popup-logo" style={{ fontSize: '2.5rem' }}>📈</div>
                <h2 className="exit-popup-title">Start Trading on OKX</h2>
                <p className="exit-popup-sub">
                    Join 50M+ traders on the world's leading crypto exchange — low fees, deep liquidity, and a powerful API.
                </p>

                <div className="exit-popup-stats">
                    <div className="exit-popup-stat">
                        <span className="exit-popup-stat-val">$10K</span>
                        <span className="exit-popup-stat-label">welcome bonus</span>
                    </div>
                    <div className="exit-popup-stat-sep" />
                    <div className="exit-popup-stat">
                        <span className="exit-popup-stat-val">0.08%</span>
                        <span className="exit-popup-stat-label">maker fees</span>
                    </div>
                    <div className="exit-popup-stat-sep" />
                    <div className="exit-popup-stat">
                        <span className="exit-popup-stat-val">24/7</span>
                        <span className="exit-popup-stat-label">live trading</span>
                    </div>
                </div>

                <a
                    href="https://okx.com/join/80076755"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exit-popup-cta"
                    onClick={dismiss}
                    style={{ textDecoration: 'none' }}
                >
                    Open an OKX Account <ArrowRight size={16} />
                </a>

                <button className="exit-popup-skip" onClick={dismiss}>
                    No thanks, I'll keep browsing →
                </button>

                <p className="exit-popup-disclaimer">
                    Affiliate link — we may earn a commission at no extra cost to you
                </p>
            </div>
        </div>
    );
}
