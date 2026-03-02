import { ExternalLink, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import links from '../data/affiliateLinks.json';

const LinkHub = () => {
    const highlightedLinks = links.filter(l => l.isHighlighted);

    return (
        <section className="py-12 container mx-auto px-6 relative z-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-violet-500/20 rounded-lg">
                    <Zap size={20} className="text-violet-400" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase">Tech Innovations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlightedLinks.map((link, idx) => (
                    <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/10 hover:border-violet-500/40 transition-all flex items-center justify-between"
                    >
                        <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-5 relative z-10">
                            <div className="text-3xl grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110">
                                {link.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-500 mb-1">
                                    {link.category}
                                </span>
                                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                                    {link.title}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-medium">
                                    {link.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-violet-500 text-slate-400 group-hover:text-white transition-all">
                            <ExternalLink size={18} />
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export default LinkHub;
