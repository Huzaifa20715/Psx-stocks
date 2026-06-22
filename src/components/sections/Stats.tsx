'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

function Counter({ target, suffix = '', prefix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const startTime = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    startTime.current = null

    function animate(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  {
    prefix: '',
    number: 150,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'From startups to enterprise, each built to the highest standard.',
    color: '#6366f1',
  },
  {
    prefix: '',
    number: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'We don\'t just meet expectations — we exceed them, every time.',
    color: '#22d3ee',
  },
  {
    prefix: '',
    number: 5,
    suffix: '+',
    label: 'Years Experience',
    description: 'Half a decade crafting exceptional digital products.',
    color: '#8b5cf6',
  },
]

export default function Stats() {
  return (
    <section
      id="stats"
      style={{
        padding: '120px 24px',
        backgroundColor: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background:
            'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#22d3ee',
              marginBottom: '16px',
            }}
          >
            By The Numbers
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#f8fafc',
            }}
          >
            Results That Speak
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2px',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{
                padding: '60px 48px',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'center',
                position: 'relative',
                borderRight:
                  index < stats.length - 1
                    ? '1px solid rgba(255,255,255,0.06)'
                    : 'none',
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                }}
              />

              {/* Number */}
              <div
                style={{
                  fontSize: 'clamp(56px, 8vw, 88px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '12px',
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <Counter
                  target={stat.number}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#f8fafc',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {stat.label}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: '#64748b',
                  maxWidth: '240px',
                  margin: '0 auto',
                }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
