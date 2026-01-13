'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, MessageCircle } from 'lucide-react';
import styles from './Pricing.module.css';

type Size = 'A4' | 'A3' | 'A2';
type PortraitType = 'Single' | 'Couple' | 'Family';

// Pricing Matrix (in INR)
const BASE_PRICES: Record<Size, Record<PortraitType, number>> = {
    'A4': { 'Single': 2999, 'Couple': 3999, 'Family': 4999 },
    'A3': { 'Single': 4999, 'Couple': 6499, 'Family': 7999 },
    'A2': { 'Single': 8999, 'Couple': 11999, 'Family': 14999 },
};

const FRAME_PRICES: Record<Size, number> = {
    'A4': 999,
    'A3': 1499,
    'A2': 2499,
};

const WHATSAPP_NUMBER = '919567952537'; // Replace with actual number

export default function Pricing() {
    const [size, setSize] = useState<Size>('A3');
    const [type, setType] = useState<PortraitType>('Single');
    const [withFrame, setWithFrame] = useState(false);

    // Calculate Total
    const basePrice = BASE_PRICES[size][type];
    const framePrice = withFrame ? FRAME_PRICES[size] : 0;
    const totalPrice = basePrice + framePrice;

    // Generate WhatsApp Link
    const handleOrder = () => {
        const text = `Hello Elias! I'd like to commission a portrait.%0A%0A*Order Details:*%0A• Size: ${size}%0A• Type: ${type} Portrait%0A• Framing: ${withFrame ? 'Yes (Premium Frame)' : 'No (Artwork Only)'}%0A%0A*Estimated Price: ₹${totalPrice.toLocaleString()}*%0A%0APlease let me know the next steps.`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    };

    return (
        <section id="pricing" className={`${styles.pricing} section`}>
            <div className="container">

                <div className={styles.header}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={styles.heading}
                    >
                        Commission Rates
                    </motion.h2>
                    <p className={styles.subtext}>Customize your artwork options below.</p>
                </div>

                <div className={styles.calculatorWrapper}>
                    {/* Options Column */}
                    <motion.div
                        className={styles.optionsPanel}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Paper Size */}
                        <div className={styles.optionGroup}>
                            <h3 className={styles.groupTitle}>1. Choose Size</h3>
                            <div className={styles.toggles}>
                                {(['A4', 'A3', 'A2'] as Size[]).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`${styles.toggleBtn} ${size === s ? styles.active : ''}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <p className={styles.helperText}>
                                {size === 'A4' && 'Small (21 x 30 cm) - Ideal for desk frames.'}
                                {size === 'A3' && 'Medium (30 x 42 cm) - Best for detailed single/couple portraits.'}
                                {size === 'A2' && 'Large (42 x 60 cm) - Museum quality integration for walls.'}
                            </p>
                        </div>

                        {/* Portrait Type */}
                        <div className={styles.optionGroup}>
                            <h3 className={styles.groupTitle}>2. Number of Subjects</h3>
                            <div className={styles.toggles}>
                                {(['Single', 'Couple', 'Family'] as PortraitType[]).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={`${styles.toggleBtn} ${type === t ? styles.active : ''}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Framing */}
                        <div className={styles.optionGroup}>
                            <h3 className={styles.groupTitle}>3. Finishing</h3>
                            <div
                                className={`${styles.frameOption} ${withFrame ? styles.frameActive : ''}`}
                                onClick={() => setWithFrame(!withFrame)}
                            >
                                <div className={styles.checkbox}>
                                    {withFrame && <Check size={14} color="#000" />}
                                </div>
                                <div className={styles.frameInfo}>
                                    <span className={styles.frameTitle}>Add Premium Frame</span>
                                    <span className={styles.framePrice}>+ ₹{FRAME_PRICES[size]}</span>
                                </div>
                            </div>
                            <p className={styles.helperText}>High-quality matte black wooden frame with acrylic glass.</p>
                        </div>

                    </motion.div>

                    {/* Summary Column */}
                    <motion.div
                        className={styles.summaryPanel}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>Order Summary</h3>

                            <div className={styles.summaryRow}>
                                <span>{size} Portrait ({type})</span>
                                <span>₹{basePrice.toLocaleString()}</span>
                            </div>

                            {withFrame && (
                                <div className={styles.summaryRow}>
                                    <span>Premium Frame</span>
                                    <span>₹{framePrice.toLocaleString()}</span>
                                </div>
                            )}

                            <div className={styles.divider}></div>

                            <div className={styles.totalRow}>
                                <span>Total Estimate</span>
                                <span className={styles.totalPrice}>₹{totalPrice.toLocaleString()}</span>
                            </div>

                            <p className={styles.note}>
                                <Info size={14} style={{ display: 'inline', marginRight: 4 }} />
                                Delivery charges are not included and calculated at shipping.
                            </p>

                            <motion.button
                                className={styles.whatsappBtn}
                                onClick={handleOrder}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <MessageCircle size={20} />
                                Order via WhatsApp
                            </motion.button>

                            <p className={styles.secureNote}>
                                No payment required now. Layout details discussed directly.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
