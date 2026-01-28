import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import QuatrefoilBackground from '../ui/QuatrefoilBackground';

const Hero = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const titleVariants = {
        hidden: { opacity: 0, y: 100, rotateX: -20 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 1.5
            }
        }
    };

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-transparent perspective-1000">
            <QuatrefoilBackground />

            {/* Content Overlay - Centered and elegant */}
            <motion.div
                style={{ y: y1, opacity }}
                className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-16 md:pt-20"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.1
                            }
                        }
                    }}
                    className="space-y-8 max-w-5xl"
                >
                    {/* Top Tagline */}
                    <motion.div
                        variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-black/60"></div>
                        <h2 className="text-black/80 font-serif tracking-[0.3em] uppercase text-sm font-semibold">
                            Est. 2026
                        </h2>
                        <div className="w-12 h-[1px] bg-black/60"></div>
                    </motion.div>

                    {/* Main Heading - The "Wow" Factor with 3D Reveal */}
                    <div className="relative perspective-1000">
                        <motion.h1
                            variants={titleVariants}
                            className="flex justify-center pb-4"
                        >
                            <img src="/logo.png" alt="Asia By Gram" className="w-[250px] md:w-[400px] lg:w-[480px] h-auto object-contain mx-auto drop-shadow-2xl" />
                        </motion.h1>
                    </div>

                    {/* Subheading / Description */}
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0)" } }}
                        className="text-zinc-600 text-lg md:text-2xl font-serif italic max-w-2xl mx-auto leading-relaxed"
                    >
                        "A culinary journey through the soul of Asia, crafted with passion and served with elegance in the heart of Hyderabad."
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/menu')}
                            className="px-12 py-5 bg-black text-white hover:bg-zinc-900 font-sans font-medium uppercase tracking-widest text-sm transition-all rounded-sm flex items-center gap-3 group shadow-xl relative overflow-hidden"
                        >
                            <span className="relative z-10">Explore Menu</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform relative z-10" />
                            <div className="absolute inset-0 bg-zinc-800 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-12 py-5 border border-black/20 hover:border-black text-black font-sans font-medium uppercase tracking-widest text-sm transition-all rounded-sm backdrop-blur-sm bg-white/5"
                        >
                            Book a Table
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator - Minimal */}
            <motion.div
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/40 flex flex-col items-center gap-2 cursor-pointer z-20"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="text-[10px] uppercase tracking-widest mb-2 rotating-text">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-black/0 via-black/40 to-black/0"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
