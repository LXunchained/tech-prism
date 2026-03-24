import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ArrowLeft, ArrowUpRight, ArrowDownRight, Filter, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tradeHistory, botStats } from '../data/tradingData';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function TradingJournal() {
    const [filterPair, setFilterPair] = useState('all');
    const [filterDirection, setFilterDirection] = useState('all');
    const [filterResult, setFilterResult] = useState('all');

    const pairs = [...new Set(tradeHistory.map(t => t.pair))];

    const filtered = tradeHistory.filter(t => {
        if (filterPair !== 'all' && t.pair !== filterPair) return false;
        if (filterDirection !== 'all' && t.direction !== filterDirection) return false;
        if (filterResult === 'win' && t.pnl <= 0) return false;
        if (filterResult === 'loss' && t.pnl > 0) return false;
        return true;
    });

    const totalPnl = filtered.reduce((sum, t) => sum + t.pnl, 0);
    const wins = filtered.filter(t => t.pnl > 0).length;
    const filteredWinRate = filtered.length > 0 ? (wins / filtered.length) * 100 : 0;

    return (
        <div className="trading-page">
            {/* Hero */}
            <section className="trading-hero" style={{ paddingBottom: '3rem' }}>
                <div className="section-container">
                    <Link to="/trading" className="trading-back-link">
                        <ArrowLeft size={16} /> Back to Trading Hub
                    </Link>
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                        <span className="trading-hero-badge">
                            <BarChart3 size={14} /> Public Trade Log
                        </span>
                    </motion.div>
                    <motion.h1 className="trading-hero-title" initial="hidden" animate="visible" variants={fadeUp} custom={1} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                        Trade Journal
                    </motion.h1>
                    <motion.p className="trading-hero-subtitle" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        Every trade our bot takes is logged publicly. Full transparency — no cherry-picking.
                    </motion.p>
                </div>
            </section>

            <div className="section-container" style={{ paddingBottom: '6rem' }}>
                {/* Summary stats */}
                <motion.div className="trading-journal-summary" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <div className="trading-journal-stat">
                        <TrendingUp size={16} className="text-profit" />
                        <span className="trading-journal-stat-label">Filtered P&L</span>
                        <span className={`trading-journal-stat-value ${totalPnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                            {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
                        </span>
                    </div>
                    <div className="trading-journal-stat">
                        <BarChart3 size={16} />
                        <span className="trading-journal-stat-label">Trades</span>
                        <span className="trading-journal-stat-value">{filtered.length}</span>
                    </div>
                    <div className="trading-journal-stat">
                        <TrendingUp size={16} />
                        <span className="trading-journal-stat-label">Win Rate</span>
                        <span className="trading-journal-stat-value">{filteredWinRate.toFixed(1)}%</span>
                    </div>
                    <div className="trading-journal-stat">
                        <Clock size={16} />
                        <span className="trading-journal-stat-label">Strategy</span>
                        <span className="trading-journal-stat-value">{botStats.strategy}</span>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div className="trading-journal-filters" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <div className="trading-journal-filter-group">
                        <Filter size={14} />
                        <span>Filters:</span>
                    </div>
                    <select value={filterPair} onChange={e => setFilterPair(e.target.value)} className="trading-select" id="filter-pair">
                        <option value="all">All Pairs</option>
                        {pairs.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select value={filterDirection} onChange={e => setFilterDirection(e.target.value)} className="trading-select" id="filter-direction">
                        <option value="all">All Directions</option>
                        <option value="LONG">Long</option>
                        <option value="SHORT">Short</option>
                    </select>
                    <select value={filterResult} onChange={e => setFilterResult(e.target.value)} className="trading-select" id="filter-result">
                        <option value="all">All Results</option>
                        <option value="win">Winners</option>
                        <option value="loss">Losers</option>
                    </select>
                </motion.div>

                {/* Table */}
                <motion.div className="trading-trades-table-wrap" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <table className="trading-trades-table" id="journal-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Pair</th>
                                <th>Direction</th>
                                <th>Entry</th>
                                <th>Exit</th>
                                <th>Size</th>
                                <th>P&L</th>
                                <th>R Multiple</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(t => (
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
                                    <td>{t.size}</td>
                                    <td className={t.pnl >= 0 ? 'pnl-positive' : 'pnl-negative'}>
                                        {t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)}
                                    </td>
                                    <td className={t.rMultiple >= 0 ? 'pnl-positive' : 'pnl-negative'}>
                                        {t.rMultiple >= 0 ? '+' : ''}{t.rMultiple.toFixed(2)}R
                                    </td>
                                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="trading-journal-empty">
                            <TrendingDown size={32} />
                            <p>No trades match your filters.</p>
                        </div>
                    )}
                </motion.div>

                {/* Disclaimer */}
                <div className="trading-disclaimer">
                    <p>
                        <strong>Disclaimer:</strong> Past performance does not guarantee future results. Trading involves substantial risk of loss.
                        This journal is provided for educational and transparency purposes only — it is not financial advice.
                    </p>
                </div>
            </div>
        </div>
    );
}
