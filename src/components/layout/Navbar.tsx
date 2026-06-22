'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-black tracking-widest" style={{ color: '#f8fafc' }}>
          <span style={{ background: 'linear-gradient(135deg,#6366f1,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FORTE
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium"
              style={{ color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(99,102,241,0.4)',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.4)')}
          >
            Start a Project
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          style={{ color: '#f8fafc' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{ background: 'rgba(5,5,5,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ color: '#94a3b8' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-sm font-semibold text-center"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff' }}
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
