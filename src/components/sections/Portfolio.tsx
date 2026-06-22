'use client'

import { motion } from 'framer-motion'
import TiltCard from '@/components/ui/TiltCard'

const projects = [
  {
    title: 'KSE Trading Platform',
    description: 'Real-time stock trading dashboard with live charts and portfolio analytics.',
    tags: ['Next.js', 'WebSockets', 'D3.js'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%)',
    accent: '#6366f1',
    number: '01',
  },
  {
    title: 'Dubai Real Estate',
    description: 'Luxury property showcase with 3D virtual tours and immersive visuals.',
    tags: ['Three.js', 'GSAP', 'React'],
    gradient: 'linear-gradient(135deg, #0c1a2e 0%, #1a3a4c 50%, #0e2436 100%)',
    accent: '#22d3ee',
    number: '02',
  },
  {
    title: 'Crypto Dashboard',
    description: 'Advanced cryptocurrency analytics with real-time market data and alerts.',
    tags: ['React', 'WebGL', 'Node.js'],
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a1a3a 100%)',
    accent: '#8b5cf6',
    number: '03',
  },
  {
    title: 'Fashion E-commerce',
    description: 'High-end fashion store with 3D product visualization and AR try-on.',
    tags: ['Next.js', 'Three.js', 'Stripe'],
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3d1515 50%, #1a1a0a 100%)',
    accent: '#f59e0b',
    number: '04',
  },
  {
    title: 'Hotel Booking',
    description: 'Luxury hotel booking platform with immersive room previews and smooth UX.',
    tags: ['React', 'Framer Motion', 'Prisma'],
    gradient: 'linear-gradient(135deg, #0a1a15 0%, #0d3320 50%, #0a1525 100%)',
    accent: '#10b981',
    number: '05',
  },
  {
    title: 'Fitness App',
    description: 'Premium fitness tracking app with 3D body visualization and workout plans.',
    tags: ['React Native', 'Three.js', 'GraphQL'],
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d0a4c 50%, #0a1a3a 100%)',
    accent: '#ec4899',
    number: '06',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      style={{
        padding: '120px 24px',
        backgroundColor: '#0a0a0a',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
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
          style={{ marginBottom: '80px' }}
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
            Portfolio
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#f8fafc',
              }}
            >
              Selected Work
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '300px', lineHeight: 1.6 }}>
              A curated selection of projects that showcase our capabilities across industries.
            </p>
          </div>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #22d3ee, #6366f1)',
              borderRadius: '2px',
              marginTop: '24px',
            }}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={cardVariants}>
              <TiltCard
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Project visual */}
                <div
                  style={{
                    height: '200px',
                    background: project.gradient,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Grid lines decoration */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `linear-gradient(${project.accent}15 1px, transparent 1px), linear-gradient(90deg, ${project.accent}15 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Project number */}
                  <span
                    style={{
                      fontSize: '80px',
                      fontWeight: 900,
                      color: `${project.accent}20`,
                      letterSpacing: '-0.05em',
                      lineHeight: 1,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {project.number}
                  </span>

                  {/* Corner accent */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: project.accent,
                      boxShadow: `0 0 12px ${project.accent}`,
                    }}
                  />
                </div>

                {/* Project info */}
                <div style={{ padding: '24px' }}>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#f8fafc',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: '#64748b',
                      marginBottom: '16px',
                    }}
                  >
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '100px',
                          background: `${project.accent}12`,
                          color: project.accent,
                          border: `1px solid ${project.accent}25`,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
