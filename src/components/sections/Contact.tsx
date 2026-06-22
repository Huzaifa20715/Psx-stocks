'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, ArrowUpRight } from 'lucide-react';

const projectTypes = [
  '3D / WebGL Website',
  'E-Commerce',
  'Web Application',
  'Brand Identity',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" style={{ padding: '8rem 1.5rem', background: '#050505' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6366f1', marginBottom: '1rem' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>
            Let&apos;s Build Something
            <br />
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Incredible
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {sent ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: '1rem',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                  Message Received!
                </h3>
                <p style={{ color: '#64748b' }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { key: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text' },
                  { key: 'email', label: 'Email Address', placeholder: 'john@company.com', type: 'email' },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 500 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0.625rem',
                        color: '#f8fafc',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>
                ))}

                {/* Project type */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Project Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.625rem',
                      color: form.type ? '#f8fafc' : '#64748b',
                      fontSize: '0.9rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" disabled style={{ background: '#0f172a' }}>Select project type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} style={{ background: '#0f172a', color: '#f8fafc' }}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Tell Us About Your Project
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your vision, goals, and any specific requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.625rem',
                      color: '#f8fafc',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: '1rem 2rem',
                    background: sending ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.625rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 0 25px rgba(99,102,241,0.3)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => { if (!sending) e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.5)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(99,102,241,0.3)'; }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem' }}>
                Ready to transform your digital presence?
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                We&apos;re a passionate team of designers and developers who live at the intersection of art and technology. Let&apos;s create something unforgettable.
              </p>
            </div>

            {/* Email card */}
            <a
              href="mailto:connectwithforte@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={20} color="#6366f1" />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem' }}>Email us at</p>
                <p style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.9rem' }}>connectwithforte@gmail.com</p>
              </div>
              <ArrowUpRight size={18} color="#64748b" style={{ marginLeft: 'auto' }} />
            </a>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['24h Response', 'Free Consultation', 'NDA Available'].map((badge) => (
                <span
                  key={badge}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    background: 'rgba(255,255,255,0.04)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
