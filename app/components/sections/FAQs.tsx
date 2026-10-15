
'use client';

import { useState } from 'react';
import SectionLabel from '../ui/SectionLabel';
import { faqs } from '../../utils/content';

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="overflow-hidden bg-white py-14 sm:py-20 lg:py-28 xl:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-20 2xl:gap-24">

          {/* Left: Heading */}
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>FAQs</SectionLabel>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0E1C49] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Questions professionals ask before getting started.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8 lg:mt-7 lg:text-xl lg:leading-9 xl:text-2xl">
              Find answers to common questions about our services, the process,
              and what to expect before taking the next step in your career.
            </p>

            <div className="mt-7 h-1 w-16 rounded-full bg-[#38BDF8] sm:mt-9" />
          </div>

          {/* Right: Accordion */}
          <div className="min-w-0 lg:col-span-1">
            <div className="divide-y divide-[#E0F2FE] border-t border-[#E0F2FE]">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const answerId = `faq-answer-${i}`;

                return (
                  <div key={i} className="min-w-0">
                    <button
                      type="button"
                      className="group flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left transition-colors sm:gap-6 sm:py-6 md:py-7 lg:gap-8 lg:py-8 xl:py-9"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span
                        className={`min-w-0 flex-1 text-sm font-semibold leading-6 transition-colors sm:text-base sm:leading-7 md:text-lg md:leading-8 lg:text-xl lg:leading-9 xl:text-2xl xl:leading-10 ${
                          isOpen
                            ? 'text-[#0284C7]'
                            : 'text-[#0E1C49] group-hover:text-[#0284C7]'
                        }`}
                      >
                        {faq.q}
                      </span>

                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 sm:h-8 sm:w-8 lg:mt-1 lg:h-10 lg:w-10 xl:h-11 xl:w-11 ${
                          isOpen
                            ? 'rotate-45 border-[#38BDF8] bg-[#38BDF8]'
                            : 'border-[#BAE6FD] bg-white group-hover:border-[#38BDF8] group-hover:bg-[#E0F2FE]'
                        }`}
                      >
                        <svg
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4"
                          fill="none"
                          viewBox="0 0 10 10"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 1v8M1 5h8"
                            stroke={isOpen ? '#0E1C49' : '#0284C7'}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={answerId}
                        className="pb-5 pr-2 sm:pb-6 sm:pr-10 md:pb-7 lg:pb-8 lg:pr-14 xl:pb-9"
                      >
                        <p className="max-w-3xl text-sm leading-7 text-[#64748B] sm:text-base sm:leading-8 md:text-lg lg:text-lg lg:leading-9 xl:text-xl xl:leading-10">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Subtle closing note */}
            <div className="mt-8 rounded-2xl border border-[#E0F2FE] bg-[#F8FAFC] p-5 sm:mt-10 sm:p-7">
              <p className="text-base font-bold text-[#0E1C49]">
                Still have questions?
              </p>
              <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base">
                Every career journey is different. We can help you understand
                which service best fits your goals and next career move.
              </p>
              <a
                href="#start-here"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0284C7] transition-colors hover:text-[#0E1C49] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-4 sm:text-base"
              >
                Let&apos;s talk about your goals
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10h12m-5-5 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
