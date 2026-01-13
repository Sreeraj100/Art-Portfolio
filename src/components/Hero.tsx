'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import BackgroundCanvas from './BackgroundCanvas';
import styles from './Hero.module.css';

/**
 * WORLD-CLASS HERO SECTION
 * 
 * Features:
 * - Cinematic text reveal animations
 * - Parallax scroll effects
 * - Smooth micro-interactions
 * - Fully responsive
 */

export default function Hero() {
    const name = "Sreeraj".split("");
    const { scrollY } = useScroll();

    // Parallax effect on scroll
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className={styles.hero}>
            {/* Enhanced Three.js Background */}
            <BackgroundCanvas />

            {/* Gradient Overlay for depth */}
            <div className={styles.gradientOverlay} />

            <motion.div
                className="container"
                style={{ y, opacity }}
            >
                <div className={styles.content}>
                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={styles.greeting}
                    >
                        Hello, I'm
                    </motion.p>

                    {/* Name - Letter by letter reveal */}
                    <h1 className={styles.title}>
                        {name.map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{
                                    y: 100,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    delay: index * 0.05 + 0.5,
                                    duration: 0.8,
                                    ease: [0.2, 0.65, 0.3, 0.9],
                                }}
                                style={{
                                    display: 'inline-block',
                                    whiteSpace: 'pre',
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: '10px' }}
                        animate={{ opacity: 1, letterSpacing: '4px' }}
                        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                        className={styles.subtitle}
                    >
                        Pencil Portrait Artist
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 0.8,
                            y: 0,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 1.5,
                        }}
                        className={styles.description}
                    >
                        Capturing the essence of the soul in timeless black and white.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 1.8,
                            staggerChildren: 0.2,
                        }}
                    >
                        <motion.a
                            href="#gallery"
                            className="btn-primary"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 2,
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                                boxShadow: "0 10px 40px rgba(255,255,255,0.2)",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Portraits
                        </motion.a>
                        <motion.a
                            href="#pricing"
                            className="btn-outline"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 2.2,
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                                backgroundColor: "#fff",
                                color: "#000",
                                boxShadow: "0 10px 40px rgba(255,255,255,0.2)",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Order Commission
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
