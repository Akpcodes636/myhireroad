
import Link from 'next/link';
import {
  footerServiceLinks as serviceLinks,
  footerCompanyLinks as companyLinks,
} from '../../utils/content';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#061B55] text-white">
      {/* Top gradient accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#0866E8] to-transparent opacity-40" />

      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 h-96 w-96 rounded-full bg-[#0866E8]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#0866E8]/8 blur-3xl" />

      {/* Main footer */}
      <div className="relative mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16 xl:py-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-16">

          {/* Brand column */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              aria-label="My Hire Roads home"
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                MyHireRoads
              </span>
            </Link>

            <p className="mb-6 max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8 lg:text-lg">
              Strategic career support for professionals ready for their next move.
            </p>

            <a
              href="mailto:myhireroads@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0866E8]/30 bg-[#0866E8]/10 px-4 py-2.5 text-sm text-[#60A5FA] transition-all hover:border-[#0866E8]/60 hover:bg-[#0866E8]/20 hover:text-white sm:text-base"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              myhireroads@gmail.com, <br />
              kathyfasanella12@gmail.com
            </a>
          </div>

          {/* Services */}
          <div className="min-w-0">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40 sm:mb-6 sm:text-sm">
              Services
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm leading-6 text-white/60 transition-colors hover:text-white sm:text-base"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#0866E8] opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-0">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40 sm:mb-6 sm:text-sm">
              Company
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm leading-6 text-white/60 transition-colors hover:text-white sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-4 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-16">
          <p className="text-xs leading-6 text-white/30 sm:text-sm">
            © 2026 My Hire Roads · myhireroads@gmail.com
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6">
            <Link href="/terms" className="text-xs text-white/40 transition-colors hover:text-white/80 sm:text-sm">
              Terms of Service
            </Link>
            {/* <Link href="#privacy" className="text-xs text-white/40 transition-colors hover:text-white/80 sm:text-sm">
              Privacy Policy
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
