import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import GoRedirect from './pages/GoRedirect'
import Comparatifs from './pages/Comparatifs'
import ReviewDetail from './pages/ReviewDetail'
import TikTokIntegration from './pages/TikTokIntegration'
import ExitIntentPopup from './components/ExitIntentPopup'

function App() {
    return (
        <div className="app">
            <Header />
            <ExitIntentPopup />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/go/:slug" element={<GoRedirect />} />
                    <Route path="/comparatifs" element={<Comparatifs />} />
                    <Route path="/reviews/:slug" element={<ReviewDetail />} />
                    <Route path="/tiktok-integration" element={<TikTokIntegration />} />
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
