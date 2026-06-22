'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#f8fafc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  }

  return (
    <section
      id="contact"
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
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background:
            'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            Get In Touch
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#f8fafc',
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            Let&apos;s Build Something<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Incredible
            </span>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 40px',
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: '16px',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
                  Message Sent!
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                  Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#64748b',
                      marginBottom: '8px',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#64748b',
                      marginBottom: '8px',
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#64748b',
                      marginBottom: '8px',
                    }}
                  >
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="" style={{ background: '#0a0a0a' }}>Select project type</option>
                    <option value="3d-webgl" style={{ background: '#0a0a0a' }}>3D / WebGL Experience</option>
                    <option value="web-design" style={{ background: '#0a0a0a' }}>Web Design & Development</option>
                    <option value="branding" style={{ background: '#0a0a0a' }}>Brand Identity</option>
                    <option value="ecommerce" style={{ background: '#0a0a0a' }}>E-commerce</option>
                    <option value="other" style={{ background: '#0a0a0a' }}>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#64748b',
                      marginBottom: '8px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1'
                      e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '15px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px rgba(99,102,241,0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    fontFamily: 'inherit',
                    letterSpacing: '0.02em',
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
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ paddingTop: '8px' }}
          >
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#f8fafc',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}
            >
              Start a Conversation
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: '#64748b',
                marginBottom: '40px',
              }}
            >
              Whether you have a fully formed idea or just a spark of inspiration, we&apos;d love to hear from you. Our team typically responds within 24 hours.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                {
                  icon: '✉',
                  label: 'Email',
                  value: 'hello@forte.agency',
                  color: '#6366f1',
                },
                {
                  icon: '◎',
                  label: 'Location',
                  value: 'Karachi, Pakistan',
                  color: '#22d3ee',
                },
                {
                  icon: '◉',
                  label: 'Available',
                  value: 'Monday – Friday, 9AM – 6PM PKT',
                  color: '#8b5cf6',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: item.color,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        color: '#f8fafc',
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div
              style={{
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginBottom: '16px',
                }}
              >
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                  <button
                    key={social}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      color: '#64748b',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#f8fafc'
                      e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                      e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#64748b'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '13px',
        }}
      >
        <p>© 2026 FORTE Agency. Crafted with precision.</p>
      </div>
    </section>
  )
}
