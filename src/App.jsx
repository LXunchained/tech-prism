import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import GoRedirect from './pages/GoRedirect'
import Comparatifs from './pages/Comparatifs'
import ReviewDetail from './pages/ReviewDetail'
import ExitIntentPopup from './components/ExitIntentPopup'
import BrandPage from './pages/BrandPage'

function App() {
    return (
        <div className="app">
            <Header />
            <ExitIntentPopup />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aura" element={<BrandPage brand="aura" title="AuraPrism" subtitle="Curated Beauty & Lifestyle Essentials." color="#f472b6" glowStart="rgba(244,114,182,0.06)" glowEnd="rgba(244,114,182,0.03)" />} />
                    <Route path="/core" element={<BrandPage brand="core" title="CorePrism" subtitle="General Finds & Home Essentials." color="#fbbf24" glowStart="rgba(251,191,36,0.06)" glowEnd="rgba(251,191,36,0.03)" />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/go/:slug" element={<GoRedirect />} />
                    <Route path="/comparatifs" element={<Comparatifs />} />
                    <Route path="/reviews/:slug" element={<ReviewDetail />} />
                </Routes>
            </main>
            <footer className="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)', padding: '4rem 0 2rem' }}>
                <div className="section-container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                        {/* Brand */}
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(90deg, #fff 40%, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TechPrism</h3>
                            <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.7 }}>
                                Your trusted source for tech deals, AI tool reviews, and digital innovation guides. We test every tool we recommend.
                            </p>
                        </div>
                        {/* Articles */}
                        <div>
                            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', marginBottom: '1rem' }}>Latest Guides</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <a href="/blog/best-web-hosting-2026" style={{ color: '#64748b', fontSize: '0.82rem', textDecoration: 'none' }}>Best Web Hosting 2026</a>
                                <a href="/blog/vps-hosting-guide-beginners" style={{ color: '#64748b', fontSize: '0.82rem', textDecoration: 'none' }}>VPS Hosting Guide</a>
                                <a href="/blog/best-ai-tools-content-creators-2026" style={{ color: '#64748b', fontSize: '0.82rem', textDecoration: 'none' }}>Best AI Tools for Creators</a>
                                <a href="/blog/developer-toolkit-2026" style={{ color: '#64748b', fontSize: '0.82rem', textDecoration: 'none' }}>Developer Toolkit 2026</a>
                            </div>
                        </div>
                        {/* Tools */}
                        <div>
                            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', marginBottom: '1rem' }}>Top Tools</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <a href="/go/hostinger" style={{ color: '#64748b', fontSize: '0.82rem', textDecoration: 'none' }}>Hostinger — from $2.99/mo</a>
                                <a href="/go/digitalocean" style={{ color: '#64748b', fontSize: '0.82rem', textDecoration: 'none' }}>DigitalOcean — $200 free</a>
                                <a href="/go/semrush" style={{ color: '#64748b', fontSize: '0.82rem', textDecoration: 'none' }}>Semrush — 40% commission</a>
                                <a href="/comparatifs" style={{ color: '#a78bfa', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 600 }}>View All Tools →</a>
                            </div>
                        </div>
                    </div>
                    {/* Affiliate Disclosure */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ color: '#475569', fontSize: '0.72rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 0.75rem' }}>
                            <strong>Affiliate Disclosure:</strong> TechPrism participates in affiliate programs from Hostinger, DigitalOcean, and other companies. Some links on this site are affiliate links — purchases made through these links support our work at no extra cost to you.
                        </p>
                        <p style={{ fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                            <a href="/terms.html" style={{ color: '#94a3b8', textDecoration: 'none', marginRight: '1.5rem' }}>Terms of Service</a>
                            <a href="/privacy.html" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
                        </p>
                        <p className="text-secondary" style={{ fontSize: '0.8rem' }}>© 2026 TechPrism. Built for the future.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
