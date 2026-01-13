'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <section id="contact" className={`${styles.contact} section`}>
            <div className="container">
                <div className={styles.wrapper}>
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className={styles.heading}>Get in Touch</h2>
                        <p className={styles.text}>
                            Ready to commission a portrait? Have a question?
                            Fill out the form or reach out directly on WhatsApp.
                        </p>
                        <div className={styles.details}>
                            <p className={styles.detailItem}>sreerajofficial2@gmail.com</p>
                            <p className={styles.detailItem}>+91 95679 52537</p>
                        </div>
                    </motion.div>

                    <motion.form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {status === 'success' ? (
                            <motion.div
                                className={styles.successMessage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <CheckCircle size={48} color="#22c55e" style={{ marginBottom: 16 }} />
                                <h3>Message Sent!</h3>
                                <p>Thank you for your inquiry. I will get back to you within 24 hours.</p>
                                <button
                                    className="btn-outline"
                                    onClick={() => setStatus('idle')}
                                    style={{ marginTop: 24, fontSize: '0.8rem' }}
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <div className={styles.group}>
                                    <input type="text" placeholder="Name" className={styles.input} required />
                                </div>
                                <div className={styles.group}>
                                    <input type="email" placeholder="Email" className={styles.input} required />
                                </div>
                                <div className={styles.group}>
                                    <select className={styles.input}>
                                        <option value="">Select Commission Type</option>
                                        <option value="single">Single Portrait</option>
                                        <option value="couple">Couple Portrait</option>
                                        <option value="custom">Custom Request</option>
                                    </select>
                                </div>
                                <div className={styles.group}>
                                    <textarea placeholder="Message" rows={5} className={styles.textarea} required></textarea>
                                </div>
                                <motion.button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ width: '100%', display: 'flex', gap: '8px' }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Sending...' : (
                                        <>
                                            Send Message <Send size={16} />
                                        </>
                                    )}
                                </motion.button>
                            </>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
