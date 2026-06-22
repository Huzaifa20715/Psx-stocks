'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span
            style={{
              fontSize: '22px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #f8fafc 40%, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            FORTE
          </span>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#6366f1',
              marginLeft: '3px',
              marginBottom: '12px',
              boxShadow: '0 0 8px #6366f1',
            }}
          />
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: '8px 16px',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '8px',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f8fafc'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              marginLeft: '8px',
              padding: '9px 20px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(99,102,241,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.3)'
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#f8fafc',
            padding: '8px',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <div style={{ width: '24px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span
              style={{
                display: 'block',
                height: '2px',
                background: '#f8fafc',
                borderRadius: '1px',
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                height: '2px',
                background: '#f8fafc',
                borderRadius: '1px',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s',
              }}
            />
            <span
              style={{
                display: 'block',
                height: '2px',
                background: '#f8fafc',
                borderRadius: '1px',
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: 'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '8px',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '8px',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Get in Touch
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
