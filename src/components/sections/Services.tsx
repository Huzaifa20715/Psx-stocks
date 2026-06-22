'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Box, Palette, Code2, Sparkles } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';

const services = [
  {
    icon: Box,
    title: '3D & WebGL',
    description: 'Immersive Three.js experiences, WebGL shaders, and interactive 3D environments that push the boundaries of the web.',
    accent: '#6366f1',
    tags: ['Three.js', 'WebGL', 'GLSL'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Pixel-perfect interfaces with fluid animations, crafted with obsessive attention to detail and user psychology.',
    accent: '#22d3ee',
    tags: ['Figma', 'Motion', 'Systems'],
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'High-performance applications built with modern frameworks. Lightning-fast, scalable, and flawlessly engineered.',
    accent: '#8b5cf6',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    icon: Sparkles,
    title: 'Brand Identity',
    description: 'Strategic visual identities that tell your story. From logo to full brand systems that stand out and endure.',
    accent: '#f59e0b',
    tags: ['Logo', 'Strategy', 'Guidelines'],
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '8rem 1.5rem', background: '#050505' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#6366f1',
              marginBottom: '1rem',
            }}
          >
            What We Do
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#f8fafc',
              lineHeight: 1.15,
            }}
          >
            Services Built for
            <br />
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              the Next Web
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '1rem',
                      padding: '2rem',
                      height: '100%',
                      transition: 'all 0.3s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = `${service.accent}40`;
                      e.currentTarget.style.boxShadow = `0 0 30px ${service.accent}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `${service.accent}15`,
                        border: `1px solid ${service.accent}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <Icon size={22} color={service.accent} />
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem' }}>
                      {service.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.2rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            background: `${service.accent}10`,
                            color: service.accent,
                            border: `1px solid ${service.accent}25`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
