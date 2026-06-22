'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', accent: '#6366f1' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', accent: '#22d3ee' },
  { value: 5, suffix: '+', label: 'Years Experience', accent: '#8b5cf6' },
  { value: 40, suffix: '+', label: 'Team Members', accent: '#f59e0b' },
];

export default function Stats() {
  return (
    <section
      style={{
        padding: '8rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(34,211,238,0.05) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, color: '#f8fafc' }}>
            Numbers That{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Speak
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                padding: '2.5rem 1.5rem',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  background: `linear-gradient(135deg, ${stat.accent}, ${stat.accent}80)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
