import React from 'react';
import { motion } from 'framer-motion';

const QuatrefoilBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-white">
            {/* Milk White Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] via-[#E8E8E8] to-[#FAFAFA]" />

            {/* Quatrefoil Pattern Layer - Asanoha (Silver) */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 52 L30 104 L0 52 Z M30 0 L30 104 M0 52 L60 52 M0 52 L30 0 M60 52 L30 0 M60 52 L30 104 M0 52 L30 104' fill='none' stroke='%23A0A0A0' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 104px'
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
