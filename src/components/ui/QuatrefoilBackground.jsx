import React from 'react';
import { motion } from 'framer-motion';

const QuatrefoilBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-100">
            {/* Metallic Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E0E0E0] via-[#C0C0C0] to-[#E0E0E0]" />

            {/* Quatrefoil Pattern Layer */}
            <div
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 Q 30 10 40 20 Q 50 10 60 20 Q 70 30 60 40 Q 70 50 60 60 Q 50 70 40 60 Q 30 70 20 60 Q 10 50 20 40 Q 10 30 20 20 Z' fill='none' stroke='%23505050' stroke-width='1.5'/%3E%3Cpath d='M40 20 A 10 10 0 0 0 20 20 A 10 10 0 0 0 20 40 A 10 10 0 0 0 40 40 Z M40 20 A 10 10 0 0 1 60 20 A 10 10 0 0 1 60 40 A 10 10 0 0 1 40 40 Z M40 60 A 10 10 0 0 1 20 60 A 10 10 0 0 1 20 40 A 10 10 0 0 1 40 40 Z M40 60 A 10 10 0 0 0 60 60 A 10 10 0 0 0 60 40 A 10 10 0 0 0 40 40 Z' fill='none' stroke='%23505050' stroke-width='1.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Live Animation: Slowly moving pattern */}
            <motion.div
                initial={{ transform: "translate(0, 0)" }}
                animate={{ transform: "translate(40px, 40px)" }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='30' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Metallic Sheen/Shimmer Overlay */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                style={{ backgroundSize: "200% 200%" }}
            />

            {/* Vignette for depth */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20 pointer-events-none" />
        </div>
    );
};

export default QuatrefoilBackground;
