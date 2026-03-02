import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
            <footer className="footer">
                <div className="container text-center">
                    <p className="text-secondary">© 2026 TechPrism. Built for the future.</p>
                </div>
            </footer>
        </div>
    )
}

export default App
