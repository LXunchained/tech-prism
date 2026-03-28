import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import VaultSwitcher from './VaultSwitcher';

function Header() {
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
                    <Link to="/blog">Guides</Link>
                </nav>

                <div className="navbar-actions">
                    <VaultSwitcher />
                </div>
            </div>
        </header>
    );
}

export default Header;
