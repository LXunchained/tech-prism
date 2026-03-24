import { Link, useLocation } from 'react-router-dom';
import { Cpu, TrendingUp } from 'lucide-react';
import VaultSwitcher from './VaultSwitcher';

function Header() {
    const location = useLocation();
    const isTrading = location.pathname.startsWith('/trading');

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">
                        <Cpu size={18} color="#a78bfa" />
                    </div>
                    <span className="navbar-logo-text">TechPrism</span>
                </Link>

                <nav className="navbar-nav">
                    <Link to="/">Deals</Link>
                    <Link to="/comparatifs">AI Tools</Link>
                    <Link to="/trading" style={isTrading ? { color: '#34d399' } : {}}>
                        Trading
                    </Link>
                    <Link to="/blog">Guides</Link>
                </nav>

                <div className="navbar-actions">
                    <VaultSwitcher />
                    <Link to="/trading" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <TrendingUp size={14} /> Live Bot
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
