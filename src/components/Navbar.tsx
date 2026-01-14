'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            id="main-navbar"
            className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container">
                <div className={styles.wrapper}>
                    <Link href="/" onClick={() => window.scrollTo(0, 0)}>
                        <motion.span
                            className={styles.logo}
                            whileHover={{ opacity: 0.8 }}
                        >
                            Sreeraj
                        </motion.span>
                    </Link>

                    <div className={styles.links}>
                        {['Gallery', 'Pricing', 'Contact'].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase()}`} className={styles.link}>
                                <motion.span
                                    style={{ display: 'inline-block' }}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item}
                                </motion.span>
                            </Link>
                        ))}
                    </div>

                    <div className={styles.socials}>
                        <motion.a
                            href="https://instagram.com/beatscriptor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconLink}
                            whileHover={{ scale: 1.2, color: '#E1306C' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Instagram size={20} />
                        </motion.a>
                        <motion.a
                            href="https://wa.me/919567952537"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.iconLink}
                            whileHover={{ scale: 1.2, color: '#25D366' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Phone size={20} />
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
