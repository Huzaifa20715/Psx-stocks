'use client';

import { motion } from 'framer-motion';
import TiltCard from '@/components/ui/TiltCard';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'KSE Trading Platform',
    category: 'Web App · 3D Dashboard',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #0f172a 100%)',
    tags: ['Three.js', 'Next.js', 'Real-time'],
    year: '2025',
  },
  {
    title: 'Dubai Real Estate',
    category: 'Luxury · Immersive UI',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #0f172a 100%)',
    tags: ['WebGL', 'GSAP', '3D Tours'],
    year: '2025',
  },
  {
    title: 'Crypto Dashboard',
    category: 'FinTech · Data Viz',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #0f172a 100%)',
    tags: ['React', 'D3.js', 'WebSockets'],
    year: '2024',
  },
  {
    title: 'Fashion E-Commerce',
    category: 'Retail · Premium UX',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #0f172a 100%)',
    tags: ['Next.js', 'Framer', 'Shopify'],
    year: '2024',
  },
  {
    title: 'Hotel Booking',
    category: 'Hospitality · 3D Rooms',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0f172a 100%)',
    tags: ['Three.js', 'TypeScript', 'AR'],
    year: '2024',
  },
  {
    title: 'Fitness App',
    category: 'Health · Motion Design',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #0f172a 100%)',
    tags: ['React Native', 'GSAP', '3D'],
    year: '2024',
  },
];

export default function Portfolio() {
  return (
    <section id="work" style={{ padding: '8rem 1.5rem', background: '#080808' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: '1rem' }}>
              Our Work
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#f8fafc', lineHeight: 1.15 }}>
              Selected
              <br />
              <span style={{ background: 'linear-gradient(135deg,#22d3ee,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Projects
              </span>
            </h2>
          </div>
          <p style={{ color: '#64748b', maxWidth: '280px', lineHeight: 1.7, fontSize: '0.9rem' }}>
            A curated selection of our most impactful digital experiences.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <TiltCard>
                <div
                  style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {/* Image area */}
                  <div
                    style={{
                      height: '220px',
                      background: project.gradient,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <ArrowUpRight size={24} color="white" />
                      </div>
                    </div>
                    <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                      {project.category}
                    </p>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>
                      {project.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.15rem 0.6rem',
                            borderRadius: '999px',
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            background: 'rgba(255,255,255,0.05)',
                            color: '#94a3b8',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
