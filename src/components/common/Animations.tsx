'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    className?: string;
    staggerChildren?: number;
}

export function FadeIn({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.8,
    className = "",
    staggerChildren = 0
}: FadeInProps) {
    const directions = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 },
        none: { x: 0, y: 0 }
    };

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
                staggerChildren: staggerChildren
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChildren({
    children,
    stagger = 0.1,
    className = ""
}: {
    children: ReactNode,
    stagger?: number,
    className?: string
}) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: stagger
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children }: { children: ReactNode }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
        >
            {children}
        </motion.div>
    );
}
