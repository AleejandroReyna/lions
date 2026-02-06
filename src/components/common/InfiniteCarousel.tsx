import React from 'react';
import Image from 'next/image';

export interface CarouselItem {
    url: string;
    name?: string;
}

interface InfiniteCarouselProps {
    items: CarouselItem[];
    direction?: 'default' | 'reverse';
}

export default function InfiniteCarousel({ items, direction = 'default' }: InfiniteCarouselProps) {
    if (!items || items.length === 0) return null;

    // Repetimos los items hasta tener al menos 16 para asegurar un scroll fluido
    let baseItems = [...items];
    while (baseItems.length < 16) {
        baseItems = [...baseItems, ...items];
    }

    // Duplicamos el set final para el loop infinito
    const duplicatedItems = [...baseItems, ...baseItems];

    const animationClass = direction === 'default' ? 'animate-scroll-left' : 'animate-scroll-right';

    return (
        <div className="relative z-0 w-full overflow-hidden py-2 pause-on-hover">
            {/* Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-1/6 md:w-1/4 z-10 bg-gradient-to-r from-white via-white/20 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1/6 md:w-1/4 z-10 bg-gradient-to-l from-white via-white/20 to-transparent pointer-events-none" />

            <div className={`relative flex w-max gap-6 ${animationClass}`}>
                {duplicatedItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex-none"
                    >
                        <div className="relative w-40 h-40 md:w-60 md:h-60 overflow-hidden rounded-xl group/item">
                            <Image
                                src={item.url}
                                alt={`Carousel item ${index}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all duration-500 flex items-center justify-center p-4 text-center">
                                <span className="text-white font-bold uppercase tracking-widest text-sm border-b border-white pb-1">
                                    {item.name || 'Ver Detalles'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
