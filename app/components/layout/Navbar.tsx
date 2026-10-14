'use client';
import { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { navLinks } from '../../utils/content';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E8EEFE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">

            <span className="font-bold text-[#0F1430] text-lg lg:text-2xl tracking-tight" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              My Hire Roads
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm lg:text-base font-medium text-[#5F6061] hover:text-[#1450F5] transition-colors"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <Button href="#start" variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-[#0F1430]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-[#E8EEFE] flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#0F1430] hover:text-[#1450F5] transition-colors"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="#start" variant="primary" size="sm" className="self-start mt-2">
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
