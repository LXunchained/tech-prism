import { motion } from 'framer-motion';
import { Terminal, Shield, Zap, ArrowRight, Code, Cpu, Database } from 'lucide-react';
import ProductsGrid from '../components/ProductsGrid';

const fadeUp = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

const stats = [
    { label: 'Latency', value: '1.2ms', icon: Zap },
    { label: 'Efficiency', value: '99.9%', icon: Cpu },
    { label: 'Security', value: 'Level 4', icon: Shield },
    { label: 'Scaling', value: 'Infinite', icon: Database },
];

const capabilities = [
    { title: 'Core Automation', desc: 'Streamline your workflows with our advanced automation frameworks.', icon: Terminal },
    { title: 'Secure Infra', desc: 'Bulletproof security integration for your digital assets and data.', icon: Shield },
    { title: 'Neural Scaling', desc: 'Leverage AI and neural networks to scale your operations intelligently.', icon: Zap },
];

function Home() {
    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>

            {/* Ambient blobs */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <div className="animate-pulse-slow" style={{ position: 'absolute', top: '-15%', left: '-10%', width: '55%', height: '55%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
                <div className="animate-pulse-slow" style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '55%', height: '55%', background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
            </div>

            {/* Hero */}
            <motion.section initial="initial" animate="animate" variants={stagger} className="hero-section">
                <div className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div variants={fadeUp} className="animate-glow" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a78bfa' }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />
                        Accelerating Digital Evolution
                    </motion.div>

                    <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 40%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        TechPrism
                    </motion.h1>

                    <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: '#94a3b8', maxWidth: '40rem', marginBottom: '3rem', fontWeight: 300, lineHeight: 1.7, textAlign: 'center' }}>
                        Next-generation software solutions and digital automation designed to push the boundaries of what's possible.
                    </motion.p>

                    <motion.div variants={fadeUp} className="hero-actions">
                        <button className="hero-btn-primary">Explore Solutions <ArrowRight size={20} /></button>
                        <button className="hero-btn-secondary">Documentation <Code size={20} /></button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats bar */}
            <section style={{ padding: '3.5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)', position: 'relative', zIndex: 10 }}>
                <div className="section-container">
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <s.icon size={20} color="#8b5cf6" style={{ marginBottom: '0.25rem' }} />
                                <span style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{s.value}</span>
                                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#64748b' }}>{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <div style={{ position: 'relative', zIndex: 10 }}><ProductsGrid /></div>

            {/* Audible Affiliate Banner */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ padding: '3rem 0', position: 'relative', zIndex: 10 }}
            >
                <div className="section-container">
                    <a
                        href="https://amzn.to/4cqtHWZ"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', display: 'block' }}
                    >
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexWrap: 'wrap', gap: '1.5rem',
                            padding: '2rem 2.5rem',
                            borderRadius: '1.25rem',
                            background: 'linear-gradient(135deg, rgba(255,153,0,0.08) 0%, rgba(255,153,0,0.03) 100%)',
                            border: '1px solid rgba(255,153,0,0.25)',
                            backdropFilter: 'blur(12px)',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,153,0,0.55)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(255,153,0,0.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,153,0,0.25)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            {/* Left */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{
                                    padding: '0.6rem 1.2rem',
                                    background: '#FF9900',
                                    borderRadius: '0.5rem',
                                    fontWeight: 900,
                                    fontSize: '1.3rem',
                                    color: '#000',
                                    letterSpacing: '-0.02em',
                                    flexShrink: 0,
                                }}>audible</div>
                                <div>
                                    <div style={{
                                        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                                        fontWeight: 800,
                                        color: '#fff',
                                        marginBottom: '0.3rem',
                                    }}>
                                        🎧 Try Audible Standard — FREE for 30 days
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 300 }}>
                                        1 audiobook/month + unlimited ad-free listening. Auto-renews at $8.99/mo. Cancel anytime.
                                    </div>
                                </div>
                            </div>
                            {/* Right CTA */}
                            <div style={{
                                padding: '0.75rem 1.75rem',
                                background: '#FF9900',
                                borderRadius: '0.6rem',
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                color: '#000',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                            }}>
                                Start Free Trial →
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#475569', marginTop: '0.5rem' }}>
                            Affiliate link — As an Amazon Associate we earn from qualifying purchases.
                        </div>
                    </a>
                </div>
            </motion.section>

            {/* Core Capabilities */}
            <section style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
                <div className="section-container">
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Core Capabilities</h2>
                        <p style={{ color: '#94a3b8', maxWidth: '32rem', margin: '0 auto', fontSize: '1.05rem', fontWeight: 300 }}>
                            Architecting the future through precision engineering and <span style={{ color: '#a78bfa', fontWeight: 500 }}>neural-driven automation.</span>
                        </p>
                    </div>
                    <div className="capabilities-grid">
                        {capabilities.map((cap, idx) => (
                            <motion.div key={cap.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="capability-card">
                                <div className="capability-icon-wrap"><cap.icon size={26} color="#8b5cf6" /></div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>{cap.title}</h3>
                                <p style={{ color: '#94a3b8', fontWeight: 300, lineHeight: 1.7 }}>{cap.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '6rem 0 8rem', position: 'relative', zIndex: 10 }}>
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="cta-card">
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '16rem', height: '16rem', background: 'rgba(139,92,246,0.08)', filter: 'blur(80px)', borderRadius: '50%', transform: 'translate(30%, -30%)', pointerEvents: 'none' }} />
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                            Ready to evolve<br />your stack?
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2.5rem', fontWeight: 300, maxWidth: '30rem', margin: '0 auto 2.5rem', position: 'relative', zIndex: 1 }}>
                            Join the next generation of digital pioneers scaling their infrastructure with precision tools.
                        </p>
                        <button className="hero-btn-primary" style={{ position: 'relative', zIndex: 1 }}>
                            Initialise System <Zap size={18} />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Home;
