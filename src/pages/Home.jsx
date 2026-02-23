import { motion } from 'framer-motion';
import { Terminal, Shield, Zap, ArrowRight, Code, Cpu, LAYERS, Database } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

function Home() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans antialiased overflow-hidden selection:bg-violet-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-500/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow delay-700" />
            </div>

            {/* Hero Section */}
            <motion.section
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="relative pt-32 pb-24 px-6 container mx-auto text-center flex flex-col items-center z-10"
            >
                <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 font-bold uppercase tracking-widest animate-glow">
                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                    Accelerating Digital Evolution
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-violet-500 leading-[1.1]">
                    TechPrism
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                    Next-generation software solutions and digital automation designed to push the boundaries of what's possible in the digital age.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="btn btn-primary bg-violet-600 hover:bg-violet-500 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-violet-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 text-lg">
                        Explore Solutions <ArrowRight size={22} />
                    </button>
                    <button className="btn btn-secondary bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 text-lg backdrop-blur-md">
                        Documentation <Code size={22} />
                    </button>
                </motion.div>
            </motion.section>

            {/* Features / Capabilities */}
            <section className="py-20 relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: 'Latency', value: '1.2ms', icon: Zap },
                        { label: 'Efficiency', value: '99.9%', icon: Cpu },
                        { label: 'Security', value: 'Level 4', icon: Shield },
                        { label: 'Scaling', value: 'Infinite', icon: Database },
                    ].map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            key={i}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <stat.icon size={20} className="text-violet-500 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-4xl font-black text-white tracking-tighter">{stat.value}</span>
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Main Capabilities Grid */}
            <section className="py-32 container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Core Capabilities</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
                        Architecting the future through precision engineering and <span className="text-violet-400 font-medium">neural-driven automation.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Core Automation', desc: 'Streamline your workflows with our advanced automation frameworks.', icon: Terminal },
                        { title: 'Secure Infra', desc: 'Bulletproof security integration for your digital assets and data.', icon: Shield },
                        { title: 'Neural Scaling', desc: 'Leverage AI and neural networks to scale your operations intelligently.', icon: Zap }
                    ].map((feat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            key={feat.title}
                            className="glass-card p-10 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-violet-500/50 transition-all group"
                        >
                            <div className="w-14 h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-violet-500/20 transition-all group-hover:scale-110">
                                <feat.icon className="text-violet-500" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{feat.title}</h3>
                            <p className="text-slate-400 leading-relaxed font-light">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 relative z-10 overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto bg-gradient-to-br from-violet-600/20 via-slate-900/40 to-slate-900/60 border border-violet-500/20 rounded-[3rem] p-16 text-center relative overflow-hidden group hover:border-violet-500/40 transition-all duration-500 shadow-3xl"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/20 transition-all" />

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight relative z-10">
                            Ready to evolve <br /> your stack?
                        </h2>
                        <p className="text-slate-300 text-xl mb-12 relative z-10 font-light max-w-2xl mx-auto">
                            Join the next generation of digital pioneers scaling their infrastructure with precision tools.
                        </p>
                        <button className="relative z-10 btn btn-primary bg-violet-500 hover:bg-violet-400 text-slate-950 px-12 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-violet-500/20 text-lg uppercase tracking-tight">
                            Initialise System <Zap size={20} className="ml-2 inline-block" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Home;
