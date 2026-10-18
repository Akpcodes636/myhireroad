"use client";

import { useState } from "react";
import SectionLabel from "../ui/SectionLabel";
import { faqs } from "../../utils/content";

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="scroll-mt-20 overflow-hidden bg-white py-14 sm:py-20 lg:py-28 xl:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-20 2xl:gap-24">

          {/* Left: Heading */}
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <SectionLabel align="left">FAQs</SectionLabel>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#061B55] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Questions professionals ask before getting started.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#475569] sm:text-lg sm:leading-8 lg:mt-7 lg:text-xl lg:leading-9">
              Find answers to common questions about our services, the process,
              and what to expect before taking the next step in your career.
            </p>

           
          </div>

          {/* Right: Accordion */}
          <div className="min-w-0 space-y-3 lg:col-span-1">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const answerId = `faq-answer-${i}`;

              return (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-[#0866E8]/30 bg-[#F4F8FF] shadow-sm"
                      : "border-[#DCEBFF] bg-white hover:border-[#0866E8]/20 hover:bg-[#F4F8FF]/50"
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-5 text-left sm:gap-6 sm:px-6 sm:py-5"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span
                      className={`min-w-0 flex-1 text-sm font-semibold leading-6 transition-colors sm:text-base md:text-lg lg:text-lg xl:text-xl ${
                        isOpen ? "text-[#0866E8]" : "text-[#061B55]"
                      }`}
                    >
                      {faq.q}
                    </span>

                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-8 sm:w-8 ${
                        isOpen
                          ? "rotate-45 bg-[#0866E8]"
                          : "border border-[#DCEBFF] bg-white"
                      }`}
                    >
                      <svg
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                        fill="none"
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 1v8M1 5h8"
                          stroke={isOpen ? "#fff" : "#0866E8"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={answerId}
                      className="px-5 pb-5 sm:px-6 sm:pb-6"
                    >
                      <div className="border-t border-[#DCEBFF] pt-4">
                        <p className="text-sm leading-7 text-[#475569] sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
