import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowLeft, DollarSign, Percent, Target, TrendingUp, Shield, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
}

function formatUnits(value) {
    if (value >= 1) return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(value);
    return value.toFixed(6);
}

export default function TradingCalculator() {
    // Position Size Calculator
    const [balance, setBalance] = useState(5000);
    const [riskPct, setRiskPct] = useState(2);
    const [entry, setEntry] = useState(87000);
    const [stopLoss, setStopLoss] = useState(86500);

    const riskAmount = balance * (riskPct / 100);
    const slDistance = Math.abs(entry - stopLoss);
    const positionSize = slDistance > 0 ? riskAmount / slDistance : 0;
    const positionValue = positionSize * entry;
    const capitalPct = balance > 0 ? (positionValue / balance) * 100 : 0;
    const leverage = capitalPct / 100;

    // Risk/Reward Calculator
    const [rrEntry, setRrEntry] = useState(87000);
    const [rrSl, setRrSl] = useState(86500);
    const [rrTp, setRrTp] = useState(88000);

    const rrRisk = Math.abs(rrEntry - rrSl);
    const rrReward = Math.abs(rrTp - rrEntry);
    const rrRatio = rrRisk > 0 ? rrReward / rrRisk : 0;
    const rrBreakeven = rrRatio > 0 ? (1 / (1 + rrRatio)) * 100 : 0;
    const rrRiskPct = rrEntry > 0 ? (rrRisk / rrEntry) * 100 : 0;
    const rrRewardPct = rrEntry > 0 ? (rrReward / rrEntry) * 100 : 0;
    const rrTotal = rrRisk + rrReward;

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
                            <Calculator size={14} /> Free Tool
                        </span>
                    </motion.div>
                    <motion.h1 className="trading-hero-title" initial="hidden" animate="visible" variants={fadeUp} custom={1} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                        Trading Calculator
                    </motion.h1>
                    <motion.p className="trading-hero-subtitle" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        Calculate your position size and risk/reward ratio before every trade. Never guess — always calculate.
                    </motion.p>
                </div>
            </section>

            <div className="section-container" style={{ paddingBottom: '6rem' }}>
                <div className="trading-calc-grid">
                    {/* Position Size Calculator */}
                    <motion.div className="trading-calc-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                        <div className="trading-calc-header">
                            <div className="trading-calc-icon"><DollarSign size={20} /></div>
                            <h2>Position Size Calculator</h2>
                        </div>
                        <p className="trading-calc-desc">Determine the optimal position size based on your risk tolerance.</p>

                        <div className="trading-calc-inputs">
                            <div className="trading-input-group">
                                <label>Account Balance ($)</label>
                                <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} className="trading-input" id="calc-balance" />
                            </div>
                            <div className="trading-input-group">
                                <label>Risk per Trade (%)</label>
                                <div className="trading-slider-group">
                                    <input
                                        type="range" min="0.1" max="10" step="0.1"
                                        value={riskPct}
                                        onChange={e => setRiskPct(Number(e.target.value))}
                                        className="trading-slider"
                                        id="calc-risk-slider"
                                    />
                                    <input
                                        type="number" value={riskPct} min="0.1" max="10" step="0.1"
                                        onChange={e => setRiskPct(Number(e.target.value))}
                                        className="trading-input trading-input-small"
                                        id="calc-risk-pct"
                                    />
                                </div>
                            </div>
                            <div className="trading-input-row">
                                <div className="trading-input-group">
                                    <label>Entry Price ($)</label>
                                    <input type="number" value={entry} onChange={e => setEntry(Number(e.target.value))} className="trading-input" id="calc-entry" />
                                </div>
                                <div className="trading-input-group">
                                    <label>Stop Loss ($)</label>
                                    <input type="number" value={stopLoss} onChange={e => setStopLoss(Number(e.target.value))} className="trading-input" id="calc-stoploss" />
                                </div>
                            </div>
                        </div>

                        <div className="trading-calc-results">
                            <div className="trading-result-row">
                                <span className="trading-result-label"><Shield size={14} /> Risk Amount</span>
                                <span className="trading-result-value">{formatCurrency(riskAmount)}</span>
                            </div>
                            <div className="trading-result-row">
                                <span className="trading-result-label"><Target size={14} /> Position Size</span>
                                <span className="trading-result-value">{slDistance > 0 ? formatUnits(positionSize) + ' units' : '—'}</span>
                            </div>
                            <div className="trading-result-row">
                                <span className="trading-result-label"><DollarSign size={14} /> Position Value</span>
                                <span className="trading-result-value">{slDistance > 0 ? formatCurrency(positionValue) : '—'}</span>
                            </div>
                            <div className="trading-result-row">
                                <span className="trading-result-label"><Percent size={14} /> Capital Used</span>
                                <span className={`trading-result-value ${capitalPct > 100 ? 'text-loss' : capitalPct > 50 ? 'text-warning' : ''}`}>
                                    {slDistance > 0 ? capitalPct.toFixed(2) + '%' : '—'}
                                    {leverage > 1 && slDistance > 0 && <span className="trading-leverage-badge">{leverage.toFixed(1)}x</span>}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Risk/Reward Calculator */}
                    <motion.div className="trading-calc-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        <div className="trading-calc-header">
                            <div className="trading-calc-icon"><TrendingUp size={20} /></div>
                            <h2>Risk / Reward Calculator</h2>
                        </div>
                        <p className="trading-calc-desc">Visualize your risk-to-reward ratio and breakeven win rate.</p>

                        <div className="trading-calc-inputs">
                            <div className="trading-input-group">
                                <label>Entry Price ($)</label>
                                <input type="number" value={rrEntry} onChange={e => setRrEntry(Number(e.target.value))} className="trading-input" id="rr-entry" />
                            </div>
                            <div className="trading-input-row">
                                <div className="trading-input-group">
                                    <label>Stop Loss ($)</label>
                                    <input type="number" value={rrSl} onChange={e => setRrSl(Number(e.target.value))} className="trading-input input-loss" id="rr-stoploss" />
                                </div>
                                <div className="trading-input-group">
                                    <label>Take Profit ($)</label>
                                    <input type="number" value={rrTp} onChange={e => setRrTp(Number(e.target.value))} className="trading-input input-profit" id="rr-takeprofit" />
                                </div>
                            </div>
                        </div>

                        {/* Visual R:R Bar */}
                        <div className="trading-rr-bar">
                            <div className="trading-rr-risk" style={{ flex: rrTotal > 0 ? rrRisk / rrTotal : 1 }}>
                                SL
                            </div>
                            <div className="trading-rr-reward" style={{ flex: rrTotal > 0 ? rrReward / rrTotal : 1 }}>
                                TP
                            </div>
                        </div>

                        <div className="trading-calc-results">
                            <div className="trading-result-row">
                                <span className="trading-result-label text-loss">Risk</span>
                                <span className="trading-result-value text-loss">${rrRisk.toFixed(2)} ({rrRiskPct.toFixed(2)}%)</span>
                            </div>
                            <div className="trading-result-row">
                                <span className="trading-result-label text-profit">Reward</span>
                                <span className="trading-result-value text-profit">${rrReward.toFixed(2)} ({rrRewardPct.toFixed(2)}%)</span>
                            </div>
                            <div className="trading-result-row">
                                <span className="trading-result-label">R:R Ratio</span>
                                <span className={`trading-result-value ${rrRatio >= 2 ? 'text-profit' : rrRatio >= 1 ? 'text-warning' : 'text-loss'}`}>
                                    1 : {rrRatio.toFixed(2)}
                                </span>
                            </div>
                            <div className="trading-result-row">
                                <span className="trading-result-label">Breakeven Win Rate</span>
                                <span className="trading-result-value">{rrRatio > 0 ? rrBreakeven.toFixed(1) + '%' : '—'}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tip Box */}
                <motion.div className="trading-tip-box" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <h3>💡 Pro Tips</h3>
                    <ul>
                        <li><strong>Never risk more than 2%</strong> of your account on a single trade. This ensures survival even during losing streaks.</li>
                        <li><strong>Aim for 1:2 R:R minimum.</strong> With a 2:1 reward-to-risk, you only need to win 33% of trades to be profitable.</li>
                        <li><strong>Set your stop loss first</strong>, then calculate position size. Never adjust your stop to fit a desired position size.</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
