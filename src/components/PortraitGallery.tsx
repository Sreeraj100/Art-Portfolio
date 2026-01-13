'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn, Layers } from 'lucide-react';
import styles from './PortraitGallery.module.css';

// Extended Data Structure with Multiple Images aka "Details"
const PORTFOLIO_ITEMS = [
    {
        id: 'soul-gaze',
        title: 'The Soul Gaze',
        category: 'Hyper-Realism',
        year: '2025',
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
        details: [
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A study of intense emotion and human connection through the eyes. Graphite on Bristol vellum.',
    },
    {
        id: 'faded-memories',
        title: 'Faded Memories',
        category: 'Surrealism',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
        details: [
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Exploring the erosion of time on identity. Charcoal and graphite blend.',
    },
    {
        id: 'silent-voice',
        title: 'Silent Voice',
        category: 'Portraiture',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        details: [
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Capturing the unspoken words in a single expression. 4B and 8B pencils.',
    },
    {
        id: 'eternal-bond',
        title: 'Eternal Bond',
        category: 'Commission',
        year: '2024',
        src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
        details: [
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A commissioned piece celebrating a lifelong bond. Detailed texture work on fabric and skin.',
    },
    {
        id: 'serenity',
        title: 'Serenity',
        category: 'Realism',
        year: '2023',
        src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
        details: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Capturing a moment of pure peace. Soft shading techniques used throughout.',
    },
    {
        id: 'urban-solitude',
        title: 'Urban Solitude',
        category: 'Sketch',
        year: '2023',
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
        details: [
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A rougher, sketch-orientated style capturing modern isolation.',
    }
];

export default function PortraitGallery() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // ... (keep useEffects same)

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
            // Set initial active image
            const item = PORTFOLIO_ITEMS.find(i => i.id === selectedId);
            if (item) setActiveImage(item.src);
        } else {
            document.body.style.overflow = 'unset';
            setActiveImage(null);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

    // Handle Escape Key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedId(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const selectedItem = PORTFOLIO_ITEMS.find(item => item.id === selectedId);

    // Combine main image and details for the gallery strip
    const galleryImages = selectedItem ? [selectedItem.src, ...selectedItem.details] : [];

    return (
        <section id="gallery" className={`${styles.gallery} section`}>
            <div className="container">

                {/* Header */}
                <div className={styles.header}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={styles.heading}
                    >
                        Sample Works
                    </motion.h2>
                    <div className={styles.line}></div>
                </div>

                {/* Horizontal Scroll Layout */}
                <div className={styles.scrollWrapper}>
                    <div className={styles.scrollContainer} ref={scrollRef}>
                        {PORTFOLIO_ITEMS.map((item) => (
                            <motion.div
                                key={item.id}
                                layoutId={`card-${item.id}`}
                                className={styles.card}
                                onClick={() => setSelectedId(item.id)}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className={styles.image}
                                        sizes="(max-width: 768px) 80vw, 400px"
                                    />
                                    <div className={styles.cardOverlay}>
                                        <span className={styles.viewBtn}>+ View</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Full Screen Modal */}
                <AnimatePresence>
                    {selectedId && selectedItem && (
                        <div className={styles.modalOverlay} onClick={() => setSelectedId(null)}>
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                className={styles.modalCard}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button className={styles.closeBtn} onClick={() => setSelectedId(null)}>
                                    <X size={24} />
                                </button>

                                {/* Main Image View */}
                                <div className={styles.modalMainImageWrapper}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeImage}
                                            className={styles.modalImageContainer}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {activeImage && (
                                                <Image
                                                    src={activeImage}
                                                    alt="Active View"
                                                    fill
                                                    className={styles.modalImage}
                                                    priority
                                                    unoptimized
                                                />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Thumbnail Strip */}
                                <div className={styles.thumbnailStrip}>
                                    {galleryImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`${styles.thumbnailItem} ${activeImage === img ? styles.thumbnailActive : ''}`}
                                            onClick={() => setActiveImage(img)}
                                        >
                                            <Image
                                                src={img}
                                                alt={`Thumbnail ${idx}`}
                                                fill
                                                className={styles.thumbnailImage}
                                                sizes="100px"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>

                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
