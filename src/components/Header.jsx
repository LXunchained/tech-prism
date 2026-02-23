import { Link } from 'react-router-dom'
import { Cpu, Terminal, Shield } from 'lucide-react'

function Header() {
    return (
        <header className="navbar">
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 transition-colors">
                        <Cpu className="text-violet-500 w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">
                        TechPrism
                    </span>
                </Link>
                <nav className="flex items-center gap-8 hidden md:flex">
                    <Link to="/" className="nav-link">Solutions</Link>
                    <Link to="/" className="nav-link">Innovation</Link>
                    <Link to="/" className="nav-link">About</Link>
                </nav>
                <button className="btn btn-primary text-sm px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors">
                    Get Started
                </button>
            </div>
        </header>
    )
}

export default Header
