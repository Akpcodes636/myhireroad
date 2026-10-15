import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    desc: "We discuss your career goals, current challenges, and the services best suited to your next move.",
    detail: "Understand your goals",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Payment & Enrollment",
    desc: "Once you select your package, you complete your payment to get started.",
    detail: "Choose your package",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Onboarding & Scheduling",
    desc: "We send your invoice and a detailed questionnaire to understand your experience, achievements, and career goals.",
    detail: "Build your career profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Weekly Progress Reviews",
    desc: "We meet weekly to review deliverables, discuss feedback, make adjustments, and keep your career development on track.",
    detail: "Move forward with clarity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#F4F8FF] py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 h-96 w-96 rounded-full bg-[#0866E8]/5 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 bottom-0 h-96 w-96 rounded-full bg-[#0866E8]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <SectionLabel>Our Process</SectionLabel>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#061B55] sm:text-4xl lg:text-5xl">
            A clear path from{" "}
            <span className="text-[#0866E8]">where you are</span> to where you want to be.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#475569] sm:text-lg sm:leading-8">
            A structured, collaborative process designed to help you present your value,
            strengthen your career story, and pursue your next opportunity with confidence.
          </p>
        </div>

        {/* Process cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCEBFF] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0866E8]/30 hover:shadow-[0_16px_40px_rgba(8,102,232,0.1)] xl:p-7"
            >
              {/* Top accent gradient bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0866E8] to-[#60A5FA] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Step header */}
              <div className="mb-6 flex items-center justify-between">
                {/* Number badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#061B55] text-sm font-extrabold tracking-wide text-white transition-colors duration-300 group-hover:bg-[#0866E8]">
                  {step.number}
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                  Step {index + 1}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4F8FF] text-[#0866E8] transition-colors duration-300 group-hover:bg-[#0866E8]/10">
                {step.icon}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-bold leading-snug tracking-tight text-[#061B55]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#475569] sm:text-base">
                  {step.desc}
                </p>

                <div className="mt-auto pt-6 border-t border-[#DCEBFF]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866E8]/10">
                      <svg viewBox="0 0 10 10" fill="none" className="h-3 w-3">
                        <path d="m2 5 2 2 4-4" stroke="#0866E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-xs font-semibold text-[#061B55] sm:text-sm">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-[#061B55] shadow-[0_20px_60px_rgba(6,27,85,0.25)] sm:mt-16 lg:mt-20">
          <div className="relative flex flex-col gap-7 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-11">
            {/* Decorative orbs */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0866E8]/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-[#0866E8]/10 blur-2xl" />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0866E8]/40 bg-[#0866E8]/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#93C5FD]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
                YOUR NEXT CHAPTER STARTS HERE
              </span>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ready to move your career forward?
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#94A3B8] sm:text-base">
                Let&apos;s identify your goals and build a practical plan for your next career move.
              </p>
            </div>

            <div className="relative shrink-0">
              <Button href="#start" variant="primary" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
