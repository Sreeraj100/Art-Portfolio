'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronRight } from 'lucide-react';
import styles from './PortraitGallery.module.css';

// Extended Data Structure with Multiple Images aka "Details"
// To use your own images:
// 1. Place images in 'public/images/gallery'
// 2. Change src to '/images/gallery/your-file-name.jpg'
const PORTFOLIO_ITEMS = [
    {
        id: 'soul-gaze',
        title: 'The Soul Gaze',
        category: 'Hyper-Realism',
        year: '2025',
        src: '/images/gallery/img-1-main.png',
        details: [
            '/images/gallery/img-1-(2).jpg',
            '/images/gallery/img-1-(3).jpg'
        ],
        description: 'A study of intense emotion and human connection through the eyes. Graphite on Bristol vellum.',
    },
    {
        id: 'faded-memories',
        title: 'Faded Memories',
        category: 'Surrealism',
        year: '2024',
        src: '/images/gallery/img-2-main.png',
        details: [
            '/images/gallery/img-2-(2).jpg',
            '/images/gallery/img-2-(3).jpg'
        ],
        description: 'Exploring the erosion of time on identity. Charcoal and graphite blend.',
    },
    {
        id: 'silent-voice',
        title: 'Silent Voice',
        category: 'Portraiture',
        year: '2024',
        src: '/images/gallery/img-3-main.png',
        details: [
            '/images/gallery/img-3-(2).jpg'
        ],
        description: 'Capturing the unspoken words in a single expression. 4B and 8B pencils.',
    },
    {
        id: 'eternal-bond',
        title: 'Eternal Bond',
        category: 'Commission',
        year: '2024',
        src: '/images/gallery/img-4-main.jpg',
        details: [
            '/images/gallery/img-4-(2).jpg',
            '/images/gallery/img-4-(3).jpg'
        ],
        description: 'A commissioned piece celebrating a lifelong bond. Detailed texture work on fabric and skin.',
    },
    {
        id: 'serenity',
        title: 'Serenity',
        category: 'Realism',
        year: '2023',
        src: '/images/gallery/img-5-main.png',
        details: [
            '/images/gallery/img-5-(2).jpg',
            '/images/gallery/img-5-(3).jpg'
        ],
        description: 'Capturing a moment of pure peace. Soft shading techniques used throughout.',
    },
    {
        id: 'urban-solitude',
        title: 'Urban Solitude',
        category: 'Sketch',
        year: '2023',
        src: '/images/gallery/img-6-main.png',
        details: [
            '/images/gallery/img-6-(2).jpg'
        ],
        description: 'A rougher, sketch-orientated style capturing modern isolation.',
    },
    {
        id: 'classic-elegance',
        title: 'Classic Elegance',
        category: 'Classical',
        year: '2023',
        src: '/images/gallery/img-7-main.png',
        details: [
            '/images/gallery/img-7-(2).jpg'
        ],
        description: 'A tribute to classical portraiture techniques with a modern touch.',
    },
    {
        id: 'modern-gaze',
        title: 'Modern Gaze',
        category: 'Contemporary',
        year: '2023',
        src: '/images/gallery/img-8-main.png',
        details: [
            '/images/gallery/img-8-(2).png'
        ],
        description: 'Contemporary style focusing on sharp contrasts and bold lines.',
    },
    {
        id: 'modern',
        title: 'Modern Gaze',
        category: 'Contemporary',
        year: '2023',
        src: '/images/gallery/img-9-main.jpg',
        details: [
           
        ],
        description: 'Contemporary style focusing on sharp contrasts and bold lines.',
    }
];

export default function PortraitGallery() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Add horizontal scroll with mouse wheel
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) === 0) return;

            const isAtStart = scrollContainer.scrollLeft <= 0;
            const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;

            // If scrolling DOWN (deltaY > 0) and NOT at end -> Scroll Right
            if (e.deltaY > 0 && !isAtEnd) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
            }
            // If scrolling UP (deltaY < 0) and NOT at start -> Scroll Left
            else if (e.deltaY < 0 && !isAtStart) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
            }
            // Otherwise, let the page scroll vertically
        };

        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
        return () => scrollContainer.removeEventListener('wheel', handleWheel);
    }, []);

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

                    {/* Scroll Indicator */}
                    <motion.div
                        className={styles.scrollIndicator}
                        initial={{ opacity: 0.5, x: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5], x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span>{isMobile ? 'Swipe' : 'Scroll'}</span> <ChevronRight size={16} />
                    </motion.div>
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
