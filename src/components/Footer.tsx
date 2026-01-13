'use client';

import { Instagram, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3>Sreeraj</h3>
                        <p>Pencil Portrait Artist</p>
                    </div>

                    <div className={styles.socials}>
                        <a href="https://instagram.com/beatscriptor" target="_blank" rel="noopener noreferrer" className={styles.icon}><Instagram size={20} /></a>
                        <a href="https://wa.me/919567952537" target="_blank" rel="noopener noreferrer" className={styles.icon}><Phone size={20} /></a>
                        <a href="mailto:sreerajofficial2@gmail.com" className={styles.icon}><Mail size={20} /></a>
                    </div>

                    <div className={styles.copy}>
                        &copy; {new Date().getFullYear()} Sreeraj. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
