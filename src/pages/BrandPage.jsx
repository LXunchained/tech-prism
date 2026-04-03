import { motion } from 'framer-motion';
import ProductsGrid from '../components/ProductsGrid';
import VIPCampaignBanner from '../components/VIPCampaignBanner';

const fadeUp = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

function BrandPage({ brand, title, subtitle, color, glowStart, glowEnd }) {
    // Generate hex color array for gradients
    const c1 = glowStart || 'rgba(139,92,246,0.06)';
    const c2 = glowEnd || 'rgba(96,165,250,0.05)';
    const hexColor = color || '#a78bfa';

    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            {/* Ambient blobs */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <div className="animate-pulse-slow" style={{ position: 'absolute', top: '-15%', left: '-10%', width: '55%', height: '55%', background: `radial-gradient(circle, ${c1} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(60px)' }} />
                <div className="animate-pulse-slow" style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '55%', height: '55%', background: `radial-gradient(circle, ${c2} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(60px)' }} />
            </div>

            {/* Hero */}
            <motion.section initial="initial" animate="animate" variants={stagger} className="hero-section" style={{ paddingBottom: '3rem' }}>
                <div className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div variants={fadeUp} className="animate-glow" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: `${hexColor}15`, border: `1px solid ${hexColor}40`, fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: hexColor }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: hexColor, display: 'inline-block' }} />
                        The Vault Connection
                    </motion.div>

                    <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.5rem', background: `linear-gradient(135deg, #fff 40%, ${hexColor} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {title}
                    </motion.h1>

                    <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: '#94a3b8', maxWidth: '40rem', marginBottom: '1rem', fontWeight: 300, lineHeight: 1.7, textAlign: 'center' }}>
                        {subtitle}
                    </motion.p>
                </div>
            </motion.section>

            {/* VIP Promoted Deal */}
            <VIPCampaignBanner brandFilter={brand} />

            {/* Products grid filtered to brand */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <ProductsGrid brandFilter={brand} />
            </div>
            
            <div style={{ paddingBottom: '6rem' }}></div>
        </div>
    );
}

export default BrandPage;
