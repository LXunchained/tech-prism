import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import products from '../data/affiliateLinks.json';

export default function VIPCampaignBanner({ brandFilter = 'tech' }) {
    // Find the latest VIP campaign natively for the selected brand
    const vipCampaign = products.find(p => {
        if (!p.isVIP) return false;
        const id = p.id || '';
        if (brandFilter === 'aura' && id.startsWith('aura-')) return true;
        if (brandFilter === 'core' && id.startsWith('core-')) return true;
        if (brandFilter === 'tech' && !id.startsWith('aura-') && !id.startsWith('core-')) return true;
        return false;
    });
    
    // If no active VIP campaigns exist, component collapses gracefully
    if (!vipCampaign) return null;

    // A beautiful luxury gradient: Gold/Amber to represent extreme high-value
    const bgGradient = 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(217,119,6,0.03) 100%)';
    const borderColor = 'rgba(234,179,8,0.25)';
    const hoverBorder = 'rgba(234,179,8,0.55)';
    const hoverShadow = '0 0 40px rgba(234,179,8,0.1)';
    const tagBg = 'linear-gradient(135deg, #EAB308, #D97706)';

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ padding: '2rem 0 1rem', position: 'relative', zIndex: 10 }}
        >
            <div className="section-container">
                <a
                    href={vipCampaign.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                >
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: '1.5rem',
                        padding: '2rem 2.5rem',
                        borderRadius: '1.25rem',
                        background: bgGradient,
                        border: `1px solid ${borderColor}`,
                        backdropFilter: 'blur(12px)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = hoverBorder; e.currentTarget.style.boxShadow = hoverShadow; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        {/* Left Side */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                padding: '0.6rem 1.2rem',
                                background: tagBg,
                                borderRadius: '0.5rem',
                                fontWeight: 900,
                                fontSize: '1.1rem',
                                color: '#000',
                                letterSpacing: '-0.02em',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                <Crown size={18} />
                                Spotlight
                            </div>
                            <div>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                    fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em',
                                    textTransform: 'uppercase', color: '#eab308', marginBottom: '0.4rem',
                                }}>
                                    <Sparkles size={11} /> Sponsored Deal
                                </div>
                                <div style={{
                                    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                                    fontWeight: 800,
                                    color: '#fff',
                                    marginBottom: '0.3rem',
                                }}>
                                    {vipCampaign.title.split(' — ')[0] || vipCampaign.title}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 300 }}>
                                    {vipCampaign.subtitle} — Limited time promotion available now.
                                </div>
                            </div>
                        </div>
                        {/* Right CTA */}
                        <div style={{
                            padding: '0.75rem 1.75rem',
                            background: tagBg,
                            borderRadius: '0.6rem',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            color: '#000',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            boxShadow: '0 4px 14px rgba(217,119,6,0.3)'
                        }}>
                            Claim Offer →
                        </div>
                    </div>
                </a>
            </div>
        </motion.section>
    );
}
