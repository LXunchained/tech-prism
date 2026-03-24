import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Calculator, BookOpen, ArrowUpRight, ArrowDownRight, Activity, Shield, Target, Zap, ChevronRight } from 'lucide-react';
import { botStats, equityCurve, monthlyPnl, tradeHistory, affiliateLinks } from '../data/tradingData';

// Mini equity chart drawn on canvas
function EquityChart({ data }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const padding = { top: 20, right: 20, bottom: 30, left: 60 };

        const balances = data.map(d => d.balance);
        const minBal = Math.min(...balances) * 0.98;
        const maxBal = Math.max(...balances) * 1.02;

        const xScale = (i) => padding.left + (i / (data.length - 1)) * (w - padding.left - padding.right);
        const yScale = (val) => h - padding.bottom - ((val - minBal) / (maxBal - minBal)) * (h - padding.top - padding.bottom);

        // Background
        ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        const gridSteps = 4;
        for (let i = 0; i <= gridSteps; i++) {
            const val = minBal + (maxBal - minBal) * (i / gridSteps);
            const y = yScale(val);
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(w - padding.right, y);
            ctx.stroke();

            // Y-axis labels
            ctx.fillStyle = '#64748b';
            ctx.font = '11px Inter, system-ui, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('$' + Math.round(val).toLocaleString(), padding.left - 8, y + 4);
        }

        // Gradient fill under the line
        const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

        ctx.beginPath();
        ctx.moveTo(xScale(0), h - padding.bottom);
        data.forEach((_, i) => ctx.lineTo(xScale(i), yScale(data[i].balance)));
        ctx.lineTo(xScale(data.length - 1), h - padding.bottom);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Line
        ctx.beginPath();
        data.forEach((_, i) => {
            const x = xScale(i);
            const y = yScale(data[i].balance);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();

        // Dots
        data.forEach((d, i) => {
            const x = xScale(i);
            const y = yScale(d.balance);
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981';
            ctx.fill();
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // X-axis labels (show a few dates)
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        const labelStep = Math.max(1, Math.floor(data.length / 5));
        data.forEach((d, i) => {
            if (i % labelStep === 0 || i === data.length - 1) {
                const dateStr = new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                ctx.fillText(dateStr, xScale(i), h - 8);
            }
        });

    }, [data]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '300px', borderRadius: '1rem' }}
        />
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function TradingHub() {
    const recentTrades = tradeHistory.slice(0, 5);

    return (
        <div className="trading-page">
            {/* Hero */}
            <section className="trading-hero">
                <div className="section-container">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                        <span className="trading-hero-badge">
                            <Activity size={14} /> Live Trading Bot
                        </span>
                    </motion.div>
                    <motion.h1 className="trading-hero-title" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Algorithmic Crypto Trading
                    </motion.h1>
                    <motion.p className="trading-hero-subtitle" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        Our bot trades BTC & ETH 24/7 using proven strategies. Track performance, explore our tools, and learn our approach.
                    </motion.p>
                    <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
                        <Link to="/trading/calculator" className="hero-btn-primary">
                            <Calculator size={18} /> Position Calculator
                        </Link>
                        <Link to="/trading/guides" className="hero-btn-secondary">
                            <BookOpen size={18} /> Trading Guides
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats Grid */}
            <section style={{ padding: '0 0 4rem' }}>
                <div className="section-container">
                    <div className="trading-stats-grid">
                        <motion.div className="trading-stat-card trading-stat-profit" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                            <div className="trading-stat-icon"><TrendingUp size={20} /></div>
                            <div className="trading-stat-value">${botStats.totalPnl.toLocaleString()}</div>
                            <div className="trading-stat-label">Total P&L</div>
                            <div className="trading-stat-change positive">+{botStats.totalPnlPct}%</div>
                        </motion.div>
                        <motion.div className="trading-stat-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                            <div className="trading-stat-icon"><Target size={20} /></div>
                            <div className="trading-stat-value">{botStats.winRate}%</div>
                            <div className="trading-stat-label">Win Rate</div>
                            <div className="trading-stat-change positive">{botStats.totalTrades} trades</div>
                        </motion.div>
                        <motion.div className="trading-stat-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                            <div className="trading-stat-icon"><Shield size={20} /></div>
                            <div className="trading-stat-value">{botStats.maxDrawdown}%</div>
                            <div className="trading-stat-label">Max Drawdown</div>
                            <div className="trading-stat-change neutral">Controlled risk</div>
                        </motion.div>
                        <motion.div className="trading-stat-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
                            <div className="trading-stat-icon"><Zap size={20} /></div>
                            <div className="trading-stat-value">{botStats.profitFactor}</div>
                            <div className="trading-stat-label">Profit Factor</div>
                            <div className="trading-stat-change positive">Sharpe {botStats.sharpeRatio}</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Equity Curve */}
            <section style={{ padding: '0 0 4rem' }}>
                <div className="section-container">
                    <motion.div className="trading-chart-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <div className="trading-chart-header">
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.3rem' }}>Equity Curve</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    ${botStats.startingBalance.toLocaleString()} → ${botStats.currentBalance.toLocaleString()} since {new Date(botStats.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="trading-chart-badges">
                                <span className="trading-badge-strategy">{botStats.strategy}</span>
                                <span className="trading-badge-live"><span className="live-dot"></span> {botStats.mode}</span>
                            </div>
                        </div>
                        <EquityChart data={equityCurve} />
                    </motion.div>
                </div>
            </section>

             {/* Monthly Performance */}
            <section style={{ padding: '0 0 4rem' }}>
                <div className="section-container">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Monthly Performance</h2>
                    <div className="trading-monthly-grid">
                        {monthlyPnl.map((m, i) => (
                            <motion.div key={m.month} className="trading-monthly-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                                <div className="trading-monthly-header">
                                    <span className="trading-monthly-name">{m.month}</span>
                                    <span className={`trading-monthly-pnl ${m.pnl >= 0 ? 'positive' : 'negative'}`}>
                                        {m.pnl >= 0 ? '+' : ''}{m.pnlPct}%
                                    </span>
                                </div>
                                <div className="trading-monthly-value">{m.pnl >= 0 ? '+' : ''}${m.pnl.toLocaleString()}</div>
                                <div className="trading-monthly-meta">{m.trades} trades · {m.winRate}% win rate</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Trades */}
            <section style={{ padding: '0 0 4rem' }}>
                <div className="section-container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Recent Trades</h2>
                        <Link to="/trading/journal" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-light)', textDecoration: 'none' }}>
                            View all <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="trading-trades-table-wrap">
                        <table className="trading-trades-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Pair</th>
                                    <th>Direction</th>
                                    <th>Entry</th>
                                    <th>Exit</th>
                                    <th>P&L</th>
                                    <th>R Multiple</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTrades.map(t => (
                                    <tr key={t.id}>
                                        <td>{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                        <td><strong>{t.pair}</strong></td>
                                        <td>
                                            <span className={`trading-dir-badge ${t.direction === 'LONG' ? 'long' : 'short'}`}>
                                                {t.direction === 'LONG' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                {t.direction}
                                            </span>
                                        </td>
                                        <td>${t.entry.toLocaleString()}</td>
                                        <td>${t.exit.toLocaleString()}</td>
                                        <td className={t.pnl >= 0 ? 'pnl-positive' : 'pnl-negative'}>
                                            {t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)}
                                        </td>
                                        <td className={t.rMultiple >= 0 ? 'pnl-positive' : 'pnl-negative'}>
                                            {t.rMultiple >= 0 ? '+' : ''}{t.rMultiple.toFixed(2)}R
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section style={{ padding: '0 0 5rem' }}>
                <div className="section-container">
                    <div className="trading-quicklinks">
                        <Link to="/trading/calculator" className="trading-quicklink-card">
                            <div className="trading-quicklink-icon"><Calculator size={24} /></div>
                            <h3>Position Calculator</h3>
                            <p>Calculate your position size and risk/reward ratio before every trade.</p>
                            <span className="trading-quicklink-arrow"><ChevronRight size={18} /></span>
                        </Link>
                        <Link to="/trading/journal" className="trading-quicklink-card">
                            <div className="trading-quicklink-icon"><BarChart3 size={24} /></div>
                            <h3>Trade Journal</h3>
                            <p>Browse our complete public trade log with filters and P&L breakdown.</p>
                            <span className="trading-quicklink-arrow"><ChevronRight size={18} /></span>
                        </Link>
                        <Link to="/trading/guides" className="trading-quicklink-card">
                            <div className="trading-quicklink-icon"><BookOpen size={24} /></div>
                            <h3>Trading Guides</h3>
                            <p>Learn our strategies, risk management rules, and the tools we use.</p>
                            <span className="trading-quicklink-arrow"><ChevronRight size={18} /></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '0 0 6rem' }}>
                <div className="section-container">
                    <div className="cta-card">
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff 40%, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Start Trading on OKX
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                            Join the exchange we use for our bot. Low fees, deep liquidity, and a powerful API. Get up to $10,000 welcome bonus.
                        </p>
                        <a href={affiliateLinks.okx.url} target="_blank" rel="noopener noreferrer" className="hero-btn-primary" style={{ textDecoration: 'none' }}>
                            Open OKX Account <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
