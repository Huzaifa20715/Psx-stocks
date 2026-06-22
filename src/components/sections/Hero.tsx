'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

const words = ['Immersive Websites', '3D Experiences', 'Digital Worlds', 'WebGL Magic'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = words[wordIndex];
    if (typing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, wordIndex]);

  return (
    <section
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      {/* 3D Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene />
      </div>

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #050505, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Award-Winning Web Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            color: '#f8fafc',
            marginBottom: '0.5rem',
          }}
        >
          We Build
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            minHeight: '1.2em',
            marginBottom: '1.5rem',
          }}
        >
          {displayed}
          <span style={{ opacity: 0.7, animation: 'blink 1s step-end infinite' }}>|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#64748b',
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          Your vision, rendered in three dimensions. We craft immersive digital experiences that captivate and convert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#work"
            className="px-8 py-4 rounded-full font-semibold text-base"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
              transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 50px rgba(99,102,241,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.4)';
            }}
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold text-base"
            style={{
              background: 'transparent',
              color: '#f8fafc',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
              e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#475569',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
        }}
      >
        <span style={{ textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
