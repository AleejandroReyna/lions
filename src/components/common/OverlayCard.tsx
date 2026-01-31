import React from 'react';
import Image from 'next/image';

interface OverlayCardProps {
    title: string;
    content?: string;
    background: string;
    backgroundType: 'image' | 'video';
}

export default function OverlayCard({ title, background, backgroundType }: OverlayCardProps) {
    return (
        <article className="relative w-full h-[30vh] md:h-[45vh] overflow-hidden flex items-center justify-center text-center px-4 md:px-12 group cursor-pointer transition-all">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {backgroundType === 'image' ? (
                    <Image
                        src={background}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={background} type="video/mp4" />
                    </video>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-white">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[1] tracking-normal whitespace-pre-line">
                    {title}
                </h3>
            </div>
        </article>
    );
}
