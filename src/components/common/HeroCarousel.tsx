'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000); // Cambia cada 5 segundos
        return () => clearInterval(interval);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative w-full h-full flex items-center justify-center text-center text-white px-6">
            {/* Slides */}
            {slides.map((slide, index) => {
                const isActive = index === current;

                return (
                    <div
                        key={index}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${isActive ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 z-0'
                            }`}
                    >
                        <div className="max-w-5xl">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
                                {slide.title}
                            </h2>
                        </div>
                    </div>
                );
            })}

            {/* Indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${index === current ? 'bg-white w-4' : 'bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
