import React from 'react';
import Image from 'next/image';

interface CarouselItem {
    url: string;
}

interface InfiniteCarouselProps {
    items: CarouselItem[];
    direction?: 'default' | 'reverse';
}

export default function InfiniteCarousel({ items, direction = 'default' }: InfiniteCarouselProps) {
    // Duplicamos los items para crear el efecto infinito sin saltos
    const duplicatedItems = [...items, ...items];

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
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <span className="text-white font-bold uppercase tracking-widest text-xs border-b border-white pb-1">Ver Detalles</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
