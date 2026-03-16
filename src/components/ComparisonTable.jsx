import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, ArrowRight, Check, X } from 'lucide-react';
import { aiTools, categories } from '../data/aiTools';
import { trackAffiliateClick } from '../utils/analytics';

function SortIcon({ col, sortCol, sortDir }) {
    if (sortCol !== col) return <ChevronUp size={12} style={{ opacity: 0.2 }} />;
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
}

function StarsMini({ rating }) {
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            <span style={{ color: '#fbbf24' }}>★</span>
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{rating.toFixed(1)}</span>
        </span>
    );
}

export default function ComparisonTable() {
    const [category, setCategory] = useState('all');
    const [sortCol, setSortCol] = useState('rating');
    const [sortDir, setSortDir] = useState('desc');

    const handleSort = (col) => {
        if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortCol(col); setSortDir('desc'); }
    };

    const tools = [...aiTools]
        .filter(t => category === 'all' || t.category === category)
        .sort((a, b) => {
            let av = a[sortCol], bv = b[sortCol];
            if (sortCol === 'commission') { av = parseFloat(a.commission); bv = parseFloat(b.commission); }
            if (typeof av === 'string') av = av.toLowerCase();
            if (typeof bv === 'string') bv = bv.toLowerCase();
            if (av < bv) return sortDir === 'asc' ? -1 : 1;
            if (av > bv) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });

    const cols = [
        { id: 'name', label: 'Outil' },
        { id: 'price', label: 'Prix' },
        { id: 'commission', label: 'Commission' },
        { id: 'rating', label: 'Note' },
        { id: 'hasFreeTrial', label: 'Essai gratuit' },
    ];

    return (
        <div className="comparison-wrapper">
            {/* Category filter pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`filter-btn${category === cat.id ? ' active' : ''}`}
                    >
                        {cat.label}
                        <span style={{
                            marginLeft: '0.25rem',
                            background: category === cat.id ? 'rgba(255,255,255,0.25)' : 'rgba(148,163,184,0.15)',
                            borderRadius: '999px', fontSize: '0.65rem', padding: '0 0.4rem', lineHeight: '1.5',
                        }}>
                            {cat.id === 'all' ? aiTools.length : aiTools.filter(t => t.category === cat.id).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="comparison-scroll">
                <table className="comparison-table">
                    <thead>
                        <tr>
                            {cols.map(col => (
                                <th
                                    key={col.id}
                                    onClick={() => col.id !== 'hasFreeTrial' && handleSort(col.id)}
                                    className={col.id !== 'hasFreeTrial' ? 'sortable' : ''}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                        {col.label}
                                        {col.id !== 'hasFreeTrial' && (
                                            <SortIcon col={col.id} sortCol={sortCol} sortDir={sortDir} />
                                        )}
                                    </span>
                                </th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.map((tool, idx) => (
                            <tr key={tool.slug} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                                {/* Tool */}
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="table-logo">{tool.logo}</span>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>{tool.name}</div>
                                            {tool.badge && (
                                                <span className={`recommended-badge recommended-badge--sm ${tool.badge === 'top-pick' ? 'recommended-badge--top' : ''}`}>
                                                    {tool.badge === 'top-pick' ? '🏆 Top Pick' : '⭐ Recommandé'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                {/* Price */}
                                <td>
                                    <span style={{ fontWeight: 700, color: '#a78bfa' }}>{tool.price}</span>
                                </td>
                                {/* Commission */}
                                <td>
                                    <span className={`commission-badge commission-badge--${tool.commissionType === 'recurring' ? 'recurring' : 'onetime'}`}>
                                        {tool.commission} {tool.commissionType === 'recurring' ? 'récurrent' : 'one-time'}
                                    </span>
                                </td>
                                {/* Rating */}
                                <td><StarsMini rating={tool.rating} /></td>
                                {/* Free trial */}
                                <td style={{ textAlign: 'center' }}>
                                    {tool.hasFreeTrial
                                        ? <Check size={16} color="#4ade80" />
                                        : <X size={16} color="#ef4444" />
                                    }
                                </td>
                                {/* CTA */}
                                <td>
                                    <Link
                                        to={`/go/${tool.slug}`}
                                        onClick={() => trackAffiliateClick(tool.slug, tool.name, 'comparison-table')}
                                        className="table-cta-btn"
                                    >
                                        Essayer <ArrowRight size={13} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {tools.length === 0 && (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#475569' }}>
                    Aucun outil dans cette catégorie pour le moment.
                </div>
            )}
        </div>
    );
}
