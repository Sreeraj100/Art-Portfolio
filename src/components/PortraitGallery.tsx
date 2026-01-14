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
        id: '1',
        src: '/images/gallery/img-main.png',
        details: [
            '/images/gallery/img-1.jpeg',
            '/images/gallery/img-2.jpeg'
        ]
    },
    {
        id: '2',
        src: '/images/gallery/img-1-main.png',
        details: [
            '/images/gallery/img-1-(2).jpg',
            '/images/gallery/img-1-(3).jpg'
        ]
    },
    {
        id: '3',
        src: '/images/gallery/img-2-main.png',
        details: [
            '/images/gallery/img-2-(2).jpg',
            '/images/gallery/img-2-(3).jpg'
        ]
    },
    {
        id: '4',
        src: '/images/gallery/img-3-main.png',
        details: [
            '/images/gallery/img-3-(2).jpg'
        ]
    },
    {
        id: '5',
        src: '/images/gallery/img-4-main.jpg',
        details: [
            '/images/gallery/img-4-(2).jpg',
            '/images/gallery/img-4-(3).jpg'
        ]
    },
    {
        id: '6',
        src: '/images/gallery/img-5-main.png',
        details: [
            '/images/gallery/img-5-(2).jpg',
            '/images/gallery/img-5-(3).jpg'
        ]
    },
    {
        id: '7',
        src: '/images/gallery/img-6-main.png',
        details: [
            '/images/gallery/img-6-(2).jpg'
        ]
    },
    {
        id: '8',
        src: '/images/gallery/img-7-main.png',
        details: [
            '/images/gallery/img-7-(2).jpg'
        ]
    },
    {
        id: '9',
        src: '/images/gallery/img-8-main.png',
        details: [
            '/images/gallery/img-8-(2).png'
        ]
    },
    {
        id: '10',
        src: '/images/gallery/img-9-main.jpg',
        details: []
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

    // Lock body scroll and hide navbar via class when modal is open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.classList.add('gallery-open'); // Hide navbar via CSS

            // Set initial active image
            const item = PORTFOLIO_ITEMS.find(i => i.id === selectedId);
            if (item) setActiveImage(item.src);
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            document.body.classList.remove('gallery-open');

            setActiveImage(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            document.body.classList.remove('gallery-open');
        };
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
                                        alt={item.id}
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
