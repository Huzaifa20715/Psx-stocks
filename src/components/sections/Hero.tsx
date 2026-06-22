'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

const TYPEWRITER_WORDS = [
  'Immersive Websites',
  '3D Experiences',
  'Digital Worlds',
  'Brand Identities',
]

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1))
      }, 80)
    } else if (!isDeleting && displayed.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1))
      }, 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#050505',
      }}
    >
      {/* Three.js canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene />
      </div>

      {/* Radial gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, transparent 30%, #050505 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '900px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#6366f1',
              marginBottom: '24px',
            }}
          >
            Premium Digital Agency
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <h1
            style={{
              fontSize: 'clamp(42px, 7vw, 96px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#f8fafc',
              marginBottom: '8px',
            }}
          >
            We Build
          </h1>
          <div
            style={{
              fontSize: 'clamp(42px, 7vw, 96px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              minHeight: 'clamp(50px, 8.5vw, 110px)',
              background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {displayed}
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: 'clamp(42px, 6.5vw, 88px)',
                backgroundColor: '#22d3ee',
                marginLeft: '4px',
                animation: 'blink 1s step-end infinite',
                WebkitTextFillColor: '#22d3ee',
              }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: '#64748b',
            marginTop: '32px',
            marginBottom: '48px',
            lineHeight: 1.6,
          }}
        >
          Your vision, rendered in three dimensions.
          <br />
          We craft digital experiences that leave lasting impressions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#portfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 50px rgba(99,102,241,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.4)'
            }}
          >
            View Our Work
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 36px',
              background: 'transparent',
              color: '#f8fafc',
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: '8px',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6366f1'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.boxShadow = 'none'
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
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#64748b', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #6366f1, transparent)',
          }}
        />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
