import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Shield, Coins, LayoutGrid } from 'lucide-react';

const brands = [
    {
        name: "Richesse Souveraine",
        domain: "https://richesse-souveraine.com",
        color: "text-emerald-400",
        icon: Coins,
        desc: "Liberté financière"
    },
    {
        name: "Héritage & Sagesse",
        domain: "https://heritage-sagesse.com",
        color: "text-amber-400",
        icon: Shield,
        desc: "Croissance personnelle"
    },
    {
        name: "TechPrism HQ",
        domain: "https://techprismhq.com",
        color: "text-violet-400",
        icon: Zap,
        desc: "Innovation tech"
    }
];

const VaultSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
                <LayoutGrid size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">The Vault</span>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-72 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                        >
                            <div className="px-3 py-2 mb-2">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Select Universe</span>
                            </div>

                            <div className="space-y-1">
                                {brands.map((brand) => (
                                    <a
                                        key={brand.name}
                                        href={brand.domain}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group"
                                    >
                                        <div className={`p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform ${brand.color}`}>
                                            <brand.icon size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{brand.name}</span>
                                            <span className="text-[10px] text-slate-500 font-medium">{brand.desc}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-2 pt-2 border-t border-white/5 px-2">
                                <div className="p-3 bg-gradient-to-r from-violet-600/20 to-emerald-600/20 rounded-xl border border-white/5">
                                    <p className="text-[10px] text-slate-300 font-medium text-center italic">Nexus link established</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VaultSwitcher;
