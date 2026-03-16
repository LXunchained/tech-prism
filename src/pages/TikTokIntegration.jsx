import { motion } from 'framer-motion';
import { Video, User, Upload, Check, Shield, ArrowRight, Lock } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

const scopes = [
    {
        icon: Upload,
        scope: 'video.upload',
        label: 'Video Upload',
        desc: 'Allows TechPrism to upload your video file to TikTok\'s servers in preparation for publishing. The video is only uploaded when you schedule a post.',
        color: '#60a5fa',
    },
    {
        icon: Video,
        scope: 'video.publish',
        label: 'Video Publish',
        desc: 'Allows TechPrism to publish an uploaded video to your TikTok feed on your behalf, at the time you have scheduled it. You remain in full control of what gets posted.',
        color: '#f472b6',
    },
    {
        icon: User,
        scope: 'user.info.basic',
        label: 'Basic Profile',
        desc: 'Retrieves your TikTok display name and profile picture to confirm your account identity within the TechPrism dashboard. No sensitive personal data is accessed.',
        color: '#a78bfa',
    },
];

const steps = [
    { step: '01', title: 'Connect Your TikTok', desc: 'Click "Connect TikTok Account" and you\'ll be redirected to TikTok\'s official OAuth page. TechPrism never sees your password.' },
    { step: '02', title: 'Authorize Permissions', desc: 'Review and approve the three permissions TechPrism requests: video upload, video publish, and basic profile info.' },
    { step: '03', title: 'Schedule Your Content', desc: 'Upload your video to TechPrism and set a publish date & time. TechPrism handles the rest automatically.' },
    { step: '04', title: 'Published to Your Account', desc: 'At the scheduled time, TechPrism publishes the video directly to your TikTok account. You can monitor status in your dashboard.' },
];

export default function TikTokIntegration() {
    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>

            {/* Ambient blobs */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
            </div>

            {/* Hero */}
            <motion.section initial="initial" animate="animate" variants={stagger} style={{ padding: 'clamp(5rem, 12vw, 9rem) 0 4rem', position: 'relative', zIndex: 10 }}>
                <div className="section-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.3)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f472b6' }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f472b6', display: 'inline-block' }} />
                        TikTok Content Posting API
                    </motion.div>

                    <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #fff 40%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Publish to TikTok,<br />on your schedule
                    </motion.h1>

                    <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#94a3b8', maxWidth: '38rem', marginBottom: '3rem', fontWeight: 300, lineHeight: 1.7, textAlign: 'center' }}>
                        TechPrism connects to your TikTok account via TikTok's official Content Posting API — letting you schedule and automate video publishing without ever sharing your password.
                    </motion.p>

                    <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 2rem', background: 'linear-gradient(135deg, #f472b6, #ec4899)', borderRadius: '0.75rem', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', letterSpacing: '-0.01em' }}
                            onClick={() => alert('TikTok OAuth coming soon! Contact us at legal@techprismhq.com to get early access.')}
                        >
                            Connect TikTok Account <ArrowRight size={18} />
                        </button>
                        <a href="/tiktok-integration#how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
                            How it works
                        </a>
                    </motion.div>
                </div>
            </motion.section>

            {/* Trust bar */}
            <section style={{ padding: '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)', position: 'relative', zIndex: 10 }}>
                <div className="section-container">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 4vw, 4rem)', flexWrap: 'wrap', alignItems: 'center' }}>
                        {[
                            { icon: Lock, text: 'OAuth 2.0 + PKCE' },
                            { icon: Shield, text: 'No Password Required' },
                            { icon: Check, text: 'Official TikTok API' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                                <Icon size={16} color="#10b981" />
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Permissions section */}
            <section style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
                <div className="section-container">
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            Permissions We Request
                        </h2>
                        <p style={{ color: '#94a3b8', maxWidth: '32rem', margin: '0 auto', fontSize: '1.05rem', fontWeight: 300 }}>
                            TechPrism requests only the minimum scopes required. Here's exactly what each permission does and why we need it.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {scopes.map((s, i) => (
                            <motion.div key={s.scope} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '0.75rem', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <s.icon size={24} color={s.color} />
                                </div>
                                <div>
                                    <code style={{ fontSize: '0.8rem', color: s.color, fontFamily: 'monospace', background: `${s.color}15`, padding: '0.2rem 0.5rem', borderRadius: '0.3rem' }}>{s.scope}</code>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.6rem', marginBottom: '0.5rem' }}>{s.label}</h3>
                                    <p style={{ color: '#94a3b8', fontWeight: 300, lineHeight: 1.7, fontSize: '0.95rem' }}>{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 10 }}>
                <div className="section-container">
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            How It Works
                        </h2>
                        <p style={{ color: '#94a3b8', maxWidth: '30rem', margin: '0 auto', fontSize: '1.05rem', fontWeight: 300 }}>
                            Four simple steps from connecting your account to publishing your content.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {steps.map((s, i) => (
                            <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1.25rem', padding: '2rem', position: 'relative' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(244,114,182,0.15)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1rem' }}>{s.step}</div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.6rem' }}>{s.title}</h3>
                                <p style={{ color: '#94a3b8', fontWeight: 300, lineHeight: 1.6, fontSize: '0.95rem' }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security section */}
            <section style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.07) 0%, rgba(96,165,250,0.05) 100%)', border: '1px solid rgba(244,114,182,0.15)', borderRadius: '1.5rem', padding: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, borderRadius: '1rem', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Shield size={32} color="#10b981" />
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            Your security is our priority
                        </h2>
                        <p style={{ color: '#94a3b8', maxWidth: '36rem', margin: '0 auto 2rem', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7 }}>
                            TechPrism uses TikTok's official <strong style={{ color: '#e2e8f0' }}>OAuth 2.0 with PKCE</strong> — the same standard used by enterprise software. Your TikTok password is never shared with TechPrism. You can revoke access at any time from TikTok's own settings.
                        </p>
                        <a href="https://www.tiktok.com/setting" target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                            Manage connected apps on TikTok <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '4rem 0 8rem', position: 'relative', zIndex: 10 }}>
                <div className="section-container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                        Ready to automate your TikTok presence?
                    </h2>
                    <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontWeight: 300 }}>Connect your TikTok account and start scheduling content today.</p>
                    <button
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 2.5rem', background: 'linear-gradient(135deg, #f472b6, #ec4899)', borderRadius: '0.75rem', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer' }}
                        onClick={() => alert('TikTok OAuth coming soon! Contact us at legal@techprismhq.com to get early access.')}
                    >
                        Connect TikTok Account <ArrowRight size={18} />
                    </button>
                    <p style={{ color: '#475569', fontSize: '0.82rem', marginTop: '1rem' }}>
                        By connecting, you agree to our <a href="/terms.html" style={{ color: '#64748b' }}>Terms of Service</a> and <a href="/privacy.html" style={{ color: '#64748b' }}>Privacy Policy</a>.
                    </p>
                </div>
            </section>

        </div>
    );
}
