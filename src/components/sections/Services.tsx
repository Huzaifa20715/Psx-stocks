'use client'

import { motion } from 'framer-motion'
import TiltCard from '@/components/ui/TiltCard'

const services = [
  {
    icon: '⬡',
    title: '3D & WebGL',
    description:
      'Stunning three-dimensional experiences built with Three.js and WebGL. We push the boundaries of what browsers can render.',
    tags: ['Three.js', 'WebGL', 'R3F', 'Blender'],
    color: '#6366f1',
  },
  {
    icon: '◈',
    title: 'UI/UX Design',
    description:
      'Pixel-perfect interfaces with motion and depth. Every interaction is crafted to feel intuitive and delightful.',
    tags: ['Figma', 'Motion', 'Prototyping', 'Design Systems'],
    color: '#22d3ee',
  },
  {
    icon: '⬟',
    title: 'Web Development',
    description:
      'Full-stack applications built for performance. From Next.js frontends to scalable backend APIs.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    color: '#8b5cf6',
  },
  {
    icon: '◇',
    title: 'Brand Identity',
    description:
      'Complete brand systems that communicate your values. Logo, typography, color palette, and guidelines.',
    tags: ['Branding', 'Typography', 'Strategy', 'Guidelines'],
    color: '#f59e0b',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        padding: '120px 24px',
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
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
            What We Do
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
            Our Services
          </h2>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
              borderRadius: '2px',
              margin: '0 auto',
            }}
          />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <TiltCard
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '36px 28px',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Hover glow overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 0%, ${service.color}10 0%, transparent 60%)`,
                    pointerEvents: 'none',
                    borderRadius: '16px',
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    fontSize: '32px',
                    marginBottom: '20px',
                    color: service.color,
                  }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#f8fafc',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: '#64748b',
                    marginBottom: '24px',
                  }}
                >
                  {service.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '100px',
                        background: `${service.color}15`,
                        color: service.color,
                        border: `1px solid ${service.color}30`,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
