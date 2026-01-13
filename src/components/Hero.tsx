'use client';

import { motion } from 'framer-motion';
import BackgroundCanvas from './BackgroundCanvas';
import styles from './Hero.module.css';

const letterAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: i * 0.05 + 0.5,
            duration: 1,
            ease: [0.22, 1, 0.36, 1] as const, // Custom cubic bezier
        },
    }),
};

export default function Hero() {
    const name = "Sreeraj".split("");

    return (
        <section className={styles.hero}>
            <BackgroundCanvas />

            <div className="container">
                <div className={styles.content}>
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: '10px' }}
                        animate={{ opacity: 1, letterSpacing: '4px' }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        className={styles.subtitle}
                    >
                        Pencil Portrait Artist
                    </motion.p>

                    <h1 className={styles.title} style={{ overflow: 'hidden', display: 'flex', gap: '2px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {name.map((char, index) => (
                            <motion.span
                                key={index}
                                custom={index}
                                variants={letterAnimation}
                                initial="hidden"
                                animate="visible"
                                style={{ display: 'inline-block', whiteSpace: 'pre' }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ duration: 1.2, delay: 1.5 }}
                        className={styles.description}
                    >
                        Capturing the essence of the soul in timeless black and white.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
                    >
                        <motion.a
                            href="#gallery"
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Portraits
                        </motion.a>
                        <motion.a
                            href="#pricing"
                            className="btn-outline"
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Order Commission
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
