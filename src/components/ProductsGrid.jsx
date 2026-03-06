import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShoppingBag, Laptop, Headphones, Home, Camera, Car, Zap, Search } from 'lucide-react';
import products from '../data/affiliateLinks.json';

const categories = [
    { id: 'all',         label: 'All Deals',    icon: ShoppingBag },
    { id: 'computers',   label: 'Computers',    icon: Laptop      },
    { id: 'audio',       label: 'Audio',        icon: Headphones  },
    { id: 'accessories', label: 'Accessories',  icon: Zap         },
    { id: 'smart-home',  label: 'Smart Home',   icon: Home        },
    { id: 'photography', label: 'Photography',  icon: Camera      },
    { id: 'car-tech',    label: 'Car Tech',     icon: Car         },
];

function ProductCard({ product, idx }) {
    return (
        <motion.div layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.25) }}>
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-card-tech">
                <div className="product-card-ext"><ExternalLink size={14} /></div>
                <div className="product-card-icon-wrap">{product.icon || '🛍️'}</div>
                <div>
                    <span className="product-card-badge">{
                        categories.find(c => c.id === product.category)?.label || product.category
                    }</span>
                    <h3 className="product-card-title">{product.title}</h3>
                    <p className="product-card-sub">{product.subtitle}</p>
                </div>
            </a>
        </motion.div>
    );
}

const ProductsGrid = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = products.filter(p => {
        const matchCat = filter === 'all' || p.category === filter;
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            (p.subtitle || '').toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    // Count per category for badges
    const counts = {};
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });

    return (
        <section style={{ padding: '5rem 0', position: 'relative', zIndex: 10 }}>
            <div className="section-container">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Today's Best Deals</h2>
                        <p style={{ color: '#94a3b8', fontWeight: 300 }}>
                            Hand-picked Amazon deals across <span style={{ color: '#a78bfa', fontWeight: 500 }}>every tech category.</span>
                        </p>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
                        <input type="text" placeholder="Search deals..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" />
                    </div>
                </div>

                {/* Category filter pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
                    {categories.map(cat => {
                        const count = cat.id === 'all' ? products.length : (counts[cat.id] || 0);
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`filter-btn${filter === cat.id ? ' active' : ''}`}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                            >
                                <cat.icon size={13} />
                                {cat.label}
                                <span style={{
                                    marginLeft: '0.2rem',
                                    background: filter === cat.id ? 'rgba(255,255,255,0.25)' : 'rgba(148,163,184,0.15)',
                                    borderRadius: '999px',
                                    fontSize: '0.7rem',
                                    padding: '0 0.45rem',
                                    lineHeight: '1.5',
                                }}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <motion.div layout className="products-grid">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, idx) => <ProductCard key={p.id} product={p} idx={idx} />)}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <div style={{ padding: '4rem 0', textAlign: 'center', color: '#475569' }}>
                        No deals found in this category.
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsGrid;
