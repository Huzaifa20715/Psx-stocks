'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We dive deep into your business goals, target audience, and competitive landscape to form a clear strategy.',
    icon: '◉',
    color: '#6366f1',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our designers craft pixel-perfect wireframes and prototypes, refining every detail with your feedback.',
    icon: '◈',
    color: '#22d3ee',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'We build with cutting-edge technologies, ensuring performance, accessibility, and scalability from day one.',
    icon: '⬡',
    color: '#8b5cf6',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'Rigorous QA, optimized deployment, and post-launch support to ensure your product succeeds in the wild.',
    icon: '◎',
    color: '#22d3ee',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      style={{
        padding: '120px 24px',
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
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
              color: '#6366f1',
              marginBottom: '16px',
            }}
          >
            Our Process
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#f8fafc',
              marginBottom: '20px',
            }}
          >
            How We Work
          </h2>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #8b5cf6, #22d3ee)',
              borderRadius: '2px',
              margin: '0 auto',
            }}
          />
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0',
            position: 'relative',
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              style={{
                position: 'relative',
                padding: '40px 32px',
                borderLeft: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Connector line (horizontal) */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '52px',
                    right: '-1px',
                    width: '1px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), transparent)',
                    display: 'none',
                  }}
                />
              )}

              {/* Step number */}
              <div
                style={{
                  fontSize: '64px',
                  fontWeight: 900,
                  color: `${step.color}15`,
                  lineHeight: 1,
                  marginBottom: '24px',
                  letterSpacing: '-0.04em',
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: step.color,
                  marginBottom: '20px',
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#f8fafc',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: '#64748b',
                }}
              >
                {step.description}
              </p>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '32px',
                  right: '32px',
                  height: '2px',
                  background: `linear-gradient(90deg, ${step.color}, transparent)`,
                  borderRadius: '1px',
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
