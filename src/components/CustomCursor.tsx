'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Faster, snappier spring configuration
    const springConfig = { damping: 20, stiffness: 1000, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent | TouchEvent) => {
            let clientX, clientY;
            if (e instanceof MouseEvent) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                return;
            }
            cursorX.set(clientX);
            cursorY.set(clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('touchmove', moveCursor, { passive: true });
        window.addEventListener('touchstart', moveCursor, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('touchmove', moveCursor as EventListener);
            window.removeEventListener('touchstart', moveCursor as EventListener);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className={styles.cursor}
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            />
            <motion.div
                className={styles.cursorDot}
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
            />
        </>
    );
}
