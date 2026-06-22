'use client';

import { motion } from 'framer-motion';
import { Search, Pen, Terminal, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We dive deep into your brand, audience, and goals. Strategy first — every pixel has a purpose.',
    accent: '#6366f1',
  },
  {
    number: '02',
    icon: Pen,
    title: 'Design',
    description: 'From wireframes to high-fidelity prototypes. We design in motion, not static frames.',
    accent: '#22d3ee',
  },
  {
    number: '03',
    icon: Terminal,
    title: 'Development',
    description: 'Production-ready code with obsessive performance optimization and 3D magic baked in.',
    accent: '#8b5cf6',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description: 'Deploy with confidence. We handle everything from staging to go-live, and beyond.',
    accent: '#f59e0b',
  },
];

export default function Process() {
  return (
    <section id="process" style={{ padding: '8rem 1.5rem', background: '#050505' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8b5cf6', marginBottom: '1rem' }}>
            How We Work
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#f8fafc' }}>
            Our{' '}
            <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Process
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', position: 'relative' }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{ position: 'relative' }}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      display: 'none',
                    }}
                    className="hidden md:block"
                  />
                )}

                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    height: '100%',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = `${step.accent}40`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontSize: '3rem',
                      fontWeight: 900,
                      lineHeight: 1,
                      display: 'block',
                      marginBottom: '1.5rem',
                      background: `linear-gradient(135deg, ${step.accent}60, ${step.accent}20)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: 'monospace',
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: `${step.accent}15`,
                      border: `1px solid ${step.accent}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Icon size={20} color={step.accent} />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
