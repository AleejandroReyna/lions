'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlide {
    title: string;
}

interface HeroCarouselProps {
    slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev: number) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative w-full h-full flex items-center justify-center text-center text-white px-6 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    className="max-w-5xl"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight drop-shadow-2xl">
                        {slides[current].title}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60px" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-1 bg-white mx-auto mt-6 rounded-full opacity-50"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className="relative h-1.5 focus:outline-none group"
                        >
                            <div className={`h-full rounded-full bg-white/20 transition-all duration-300 ${index === current ? 'w-8' : 'w-2 group-hover:bg-white/40'
                                }`} />

                            {index === current && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute inset-0 bg-white rounded-full origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 5, ease: "linear" }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
