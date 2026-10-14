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

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Questions professionals ask before getting started.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#5F6061] sm:text-lg sm:leading-8 lg:mt-7 lg:text-xl lg:leading-9 xl:text-2xl">
              Find answers to common questions about our services, the process,
              and what to expect before taking the next step in your career.
            </p>
          </div>

          {/* Right: Accordion */}
          <div className="min-w-0 lg:col-span-1">
            <div className="divide-y divide-[#E8EEFE] border-t border-[#E8EEFE]">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const answerId = `faq-answer-${i}`;

                return (
                  <div key={i} className="min-w-0">
                    <button
                      type="button"
                      className="group flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6 md:py-7 lg:gap-8 lg:py-8 xl:py-9"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="min-w-0 flex-1 text-sm font-semibold leading-6 text-[#0F1430] transition-colors group-hover:text-[#1450F5] sm:text-base sm:leading-7 md:text-lg md:leading-8 lg:text-xl lg:leading-9 xl:text-2xl xl:leading-10">
                        {faq.q}
                      </span>

                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-200 sm:h-8 sm:w-8 lg:mt-1 lg:h-10 lg:w-10 xl:h-11 xl:w-11 ${
                          isOpen
                            ? 'rotate-45 border-[#1450F5] bg-[#1450F5]'
                            : 'border-[#1450F5] bg-white group-hover:bg-[#E8EEFE]'
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
                            stroke={isOpen ? 'white' : '#1450F5'}
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
                        <p className="max-w-3xl text-sm leading-7 text-[#5F6061] sm:text-base sm:leading-8 md:text-lg lg:text-lg lg:leading-9 xl:text-xl xl:leading-10">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
