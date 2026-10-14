
import Link from 'next/link';
import {
  footerServiceLinks as serviceLinks,
  footerCompanyLinks as companyLinks,
} from '../../utils/content';

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0a0d1e] text-white">
      {/* Main footer */}
      <div className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16 xl:py-24 2xl:px-20 2xl:py-28">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-10 xl:gap-16 2xl:gap-20">

          {/* Brand column */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              aria-label="My Hire Roads home"
              className="mb-5 inline-flex items-center gap-3 sm:mb-6 lg:mb-7"
            >
              

              <span className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl xl:text-3xl">
                My Hire Roads
              </span>
            </Link>

            <p className="mb-5 max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8 lg:mb-6 lg:text-lg lg:leading-9 xl:text-xl xl:leading-9">
              Strategic career support for professionals ready for their next move.
            </p>

            <a
              href="mailto:hello@myhireroads.com"
              className="break-words text-sm text-[#93aafa] transition-colors hover:text-white sm:text-base lg:text-lg xl:text-xl"
            >
              hello@myhireroads.com
            </a>
          </div>

          {/* Services */}
          <div className="min-w-0">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40 sm:mb-6 sm:text-sm lg:mb-7 lg:text-base">
              Services
            </h3>

            <ul className="space-y-3 sm:space-y-4 lg:space-y-5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block break-words text-sm leading-6 text-white/60 transition-colors hover:text-white sm:text-base sm:leading-7 lg:text-lg lg:leading-8"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-0">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40 sm:mb-6 sm:text-sm lg:mb-7 lg:text-base">
              Company
            </h3>

            <ul className="space-y-3 sm:space-y-4 lg:space-y-5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block break-words text-sm leading-6 text-white/60 transition-colors hover:text-white sm:text-base sm:leading-7 lg:text-lg lg:leading-8"
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
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start gap-4 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between lg:px-10 lg:py-7 xl:px-16 2xl:px-20">
          <p className="text-xs leading-6 text-white/30 sm:text-sm lg:text-base">
            © 2026 My Hire Roads · hello@myhireroads.com
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6 lg:gap-x-8">
            <Link
              href="#terms"
              className="text-xs text-white/40 transition-colors hover:text-white/80 sm:text-sm lg:text-base"
            >
              Terms of Service
            </Link>

            <Link
              href="#privacy"
              className="text-xs text-white/40 transition-colors hover:text-white/80 sm:text-sm lg:text-base"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
