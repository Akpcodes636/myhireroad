
'use client';

import { useState } from 'react';
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import { services } from '../../utils/content';

export default function Services() {
  const [active, setActive] = useState(0);
  const svc = services[active];

  return (
    <section
      id="services"
      className="bg-white py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section introduction */}
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-16">
          <SectionLabel>Our Services</SectionLabel>

          <h2
            className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430]
              sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
          >
            Career support built around the move you want to make.
          </h2>

          <p
            className="max-w-3xl text-base leading-7 text-[#5F6061]
              sm:text-lg sm:leading-8 lg:text-xl lg:leading-9 xl:text-2xl xl:leading-10"
          >
            No generic one-size-fits-all advice. We focus on your experience, your goals and the
            roles you&apos;re targeting.
          </p>
        </div>

        {/* Services selector and details */}
        <div className="flex flex-col overflow-hidden border border-[#E8EEFE] lg:flex-row">
          {/* Service tab list */}
          <div
            role="tablist"
            aria-label="Career services"
            className="w-full border-b border-[#E8EEFE] lg:w-2/5 lg:flex-shrink-0 lg:border-b-0 lg:border-r"
          >
            {services.map((s, i) => {
              const isActive = active === i;

              return (
                <button
                  key={s.number}
                  id={`service-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="service-panel"
                  onClick={() => setActive(i)}
                  className={`flex min-h-16 w-full cursor-pointer items-center gap-3 border-b border-[#E8EEFE] px-4 py-4 text-left transition-colors last:border-b-0
                    focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1450F5]
                    sm:gap-4 sm:px-6 sm:py-5
                    lg:px-7 xl:px-8
                    ${
                      isActive
                        ? 'bg-[#1450F5] text-white'
                        : 'bg-white text-[#0F1430] hover:bg-[#F3F6FF]'
                    }`}
                >
                  <span
                    className={`flex-shrink-0 text-xs font-bold tracking-widest sm:text-sm ${
                      isActive ? 'text-white/70' : 'text-[#A1A2A4]'
                    }`}
                  >
                    {s.number}
                  </span>

                  <span className="min-w-0 flex-1 text-sm font-semibold leading-snug sm:text-base lg:text-lg xl:text-xl">
                    {s.title}
                  </span>

                  <span className="flex-shrink-0" aria-hidden="true">
                    <svg
                      className={`h-4 w-4 transition-transform sm:h-5 sm:w-5 ${
                        isActive ? 'translate-x-0' : 'text-[#A1A2A4]'
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isActive ? 'rgba(255,255,255,0.8)' : 'currentColor'}
                      strokeWidth="2"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active service detail */}
          {svc && (
            <div
              id="service-panel"
              role="tabpanel"
              aria-labelledby={`service-tab-${active}`}
              className="min-w-0 w-full p-5 sm:p-7 md:p-9 lg:w-3/5 lg:p-10 xl:p-14 2xl:p-16"
            >
              <span
                aria-hidden="true"
                className="block text-4xl font-extrabold leading-none text-[#E8EEFE]
                  sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {svc.number}
              </span>

              <h3
                className="mt-4 text-2xl font-bold leading-tight text-[#0F1430]
                  sm:text-3xl lg:mt-5 lg:text-4xl xl:text-5xl"
              >
                {svc.title}
              </h3>

              <p
                className="mb-4 mt-2 text-sm font-semibold leading-relaxed text-[#1450F5]
                  sm:text-base lg:mb-5 lg:text-lg xl:text-xl"
              >
                {svc.tagline}
              </p>

              <p
                className="mb-6 text-base leading-7 text-[#5F6061]
                  sm:text-lg sm:leading-8 lg:mb-8 lg:text-xl lg:leading-9 xl:text-2xl xl:leading-10"
              >
                {svc.description}
              </p>

              <ul className="mb-7 space-y-3 sm:mb-8 sm:space-y-4 lg:mb-10">
                {svc.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex min-w-0 items-start gap-3 text-sm leading-6 text-[#0F1430]
                      sm:text-base sm:leading-7 lg:gap-4 lg:text-lg lg:leading-8 xl:text-xl"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-[#1450F5] sm:mt-1.5 sm:h-6 sm:w-6"
                    >
                      <svg
                        className="h-2 w-2 sm:h-2.5 sm:w-2.5"
                        viewBox="0 0 8 6"
                        fill="none"
                      >
                        <path
                          d="M1 3l2 2 4-4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span className="min-w-0">{b}</span>
                  </li>
                ))}
              </ul>

              <Button href="#start" variant="primary" size="md">
                {svc.cta}
              </Button>
            </div>
          )}
        </div>

        {/* Not sure CTA */}
        <div
          className="mt-6 flex flex-col items-start gap-5 bg-[#E8EEFE] p-5
            sm:mt-8 sm:gap-6 sm:p-7
            md:p-8
            lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:p-10
            xl:p-12"
        >
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1450F5] sm:text-sm">
              Not Sure Where to Start?
            </p>

            <p className="text-lg font-semibold leading-snug text-[#0F1430] sm:text-xl lg:text-2xl xl:text-3xl">
              Let&apos;s identify the right service for your goal.
            </p>

            <p className="mt-2 text-sm leading-6 text-[#5F6061] sm:text-base sm:leading-7 lg:text-lg">
              Tell us where you are in your career and what you&apos;re trying to achieve.
            </p>
          </div>

          <div className="w-full sm:w-auto lg:flex-shrink-0">
            <Button href="#start" variant="primary" size="md" className="w-full sm:w-auto">
              Find My Best Option →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
