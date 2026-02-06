'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

export interface CarouselItem {
    url: string;
    name?: string;
}

interface InfiniteCarouselProps {
    items: CarouselItem[];
    direction?: 'default' | 'reverse';
    speed?: number;
}

export default function InfiniteCarousel({
    items,
    direction = 'default',
    speed = 40
}: InfiniteCarouselProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [baseWidth, setBaseWidth] = useState(0);

    // Aseguramos al menos 16 items para llenar el ancho de pantalla sin huecos
    let baseItems = [...items];
    if (items.length > 0) {
        while (baseItems.length < 16) {
            baseItems = [...baseItems, ...items];
        }
    }

    // Duplicamos para el loop infinito (A + B)
    const displayItems = [...baseItems, ...baseItems];

    const calculateWidth = () => {
        if (contentRef.current) {
            setBaseWidth(contentRef.current.scrollWidth / 2);
        }
    };

    useEffect(() => {
        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, [items]);

    useAnimationFrame((_, delta) => {
        if (!baseWidth) return;

        const currentSpeed = isHovered ? speed * 0.15 : speed;
        const moveBy = (delta / 1000) * currentSpeed;

        let newX = x.get();
        if (direction === 'default') {
            newX -= moveBy;
            if (newX <= -baseWidth) newX += baseWidth;
        } else {
            newX += moveBy;
            if (newX >= 0) newX -= baseWidth;
        }
        x.set(newX);
    });

    if (!items || items.length === 0) return null;

    return (
        <div
            className="relative z-0 w-full overflow-hidden py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sombras laterales para profundidad */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 z-10 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 z-10 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none" />

            <motion.div
                ref={contentRef}
                style={{ x }}
                className="flex w-max gap-4"
            >
                {displayItems.map((item, index) => (
                    <div key={index} className="flex-none">
                        <motion.div
                            className="relative w-40 h-40 md:w-60 md:h-60 overflow-hidden rounded-xl group/item"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <Image
                                src={item.url}
                                alt={item.name || `Product ${index}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                                sizes="(max-width: 768px) 160px, 240px"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex items-center justify-center p-6 text-center">
                                <span className="text-white font-black uppercase tracking-widest text-xs md:text-sm leading-tight border-b-2 border-white/30 pb-2">
                                    {item.name || 'Ver Catálogo'}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
