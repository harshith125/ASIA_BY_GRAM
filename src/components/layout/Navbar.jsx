import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, MapPin } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openReservation } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '#about' },
        { name: 'Menu', path: '#menu' },
        { name: 'Experience', path: '#experience' },
        { name: 'Gallery', path: '#gallery' },
        { name: 'Contact', path: '#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:px-12",
                    isScrolled ? "bg-white/80 backdrop-blur-md py-3 border-b border-black/5 shadow-sm" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}


                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="text-sm font-medium tracking-[0.15em] uppercase text-zinc-600 hover:text-black transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-primary transition-colors">
                            <Instagram size={20} />
                        </a>
                        <button
                            onClick={openReservation}
                            className="bg-primary hover:bg-gold-500 text-black px-8 py-3 rounded-none skew-x-[-10deg] font-asian font-bold uppercase tracking-widest text-xs transition-all transform hover:shadow-lg border border-black/5"
                        >
                            <span className="block skew-x-[10deg]">Book a Table</span>
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-asian font-bold text-white hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex gap-6 mt-8">
                            <Instagram size={32} />
                            <MapPin size={32} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
