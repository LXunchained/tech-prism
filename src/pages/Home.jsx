import { Terminal, Shield, Zap, ArrowRight, Code } from 'lucide-react'

function Home() {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans antialiased overflow-hidden selection:bg-violet-500/30">
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
                <div className="container relative z-10 text-center">
                    <div className="mb-6 flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 font-medium animate-fade-in w-fit mx-auto">
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                        Accelerating Digital Evolution
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-violet-500 animate-fade-in delay-100 drop-shadow-sm">
                        TechPrism
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in delay-200">
                        Next-generation software solutions and digital automation designed to push the boundaries of what's possible in the digital age.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
                        <button className="btn btn-primary bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                            Explore Solutions <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-secondary px-8 py-4 rounded-xl font-semibold border border-slate-700 hover:bg-slate-800 transition-all">
                            Documentation
                        </button>
                    </div>
                </div>

                {/* Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-slate-900/50">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:border-violet-500/50 transition-all group">
                            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                                <Terminal className="text-violet-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Core Automation</h3>
                            <p className="text-slate-400">Streamline your workflows with our advanced automation frameworks.</p>
                        </div>

                        <div className="card p-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:border-violet-500/50 transition-all group">
                            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                                <Shield className="text-violet-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Secure Infra</h3>
                            <p className="text-slate-400">Bulletproof security integration for your digital assets and data.</p>
                        </div>

                        <div className="card p-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:border-violet-500/50 transition-all group">
                            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                                <Zap className="text-violet-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Neural Scaling</h3>
                            <p className="text-slate-400">Leverage AI and neural networks to scale your operations intelligently.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
