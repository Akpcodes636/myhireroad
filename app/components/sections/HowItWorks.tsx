import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    desc: "We discuss your career goals, current challenges, and the services best suited to your next move.",
    detail: "Understand your goals",
  },
  {
    number: "02",
    title: "Payment & Enrollment",
    desc: "Choose the right service package, review the agreed scope, and complete your enrollment.",
    detail: "Choose your package",
  },
  {
    number: "03",
    title: "Onboarding & Scheduling",
    desc: "Receive your invoice and questionnaire, share your experience and achievements, and schedule your sessions.",
    detail: "Build your career profile",
  },
  {
    number: "04",
    title: "Weekly Progress Reviews",
    desc: "Review deliverables together, share feedback, refine your materials, and keep your career goals on track.",
    detail: "Move forward with clarity",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#E0F2FE]/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#C4B5FD]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <SectionLabel>Our Process</SectionLabel>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0E1C49] sm:text-4xl lg:text-5xl">
            A clear path from{" "}
            <span className="text-[#0284C7]">where you are</span> to where you
            want to be.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            A structured, collaborative process designed to help you present
            your value, strengthen your career story, and pursue your next
            opportunity with confidence.
          </p>
        </div>

        {/* Process cards */}
        <div className="relative">
          {/* Desktop timeline */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-[#BAE6FD] via-[#38BDF8] to-[#BAE6FD] lg:block"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="group relative flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(14,28,73,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BAE6FD] hover:shadow-[0_16px_40px_rgba(14,28,73,0.08)] sm:p-7 lg:p-6 xl:p-7"
              >
                {/* Step number and indicator */}
                <div className="relative z-10 mb-7 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#BAE6FD] bg-[#F0F9FF] text-base font-extrabold tracking-wide text-[#0284C7] transition-colors duration-300 group-hover:border-[#38BDF8] group-hover:bg-[#E0F2FE]">
                    {step.number}
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                    Step {index + 1}
                  </span>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-[#0E1C49]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#64748B] sm:text-base">
                    {step.desc}
                  </p>

                  <div className="mt-7 border-t border-[#E2E8F0] pt-5">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0F2FE] text-[#0284C7]"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="h-3 w-3"
                        >
                          <path
                            d="m5 10 3.2 3.2L15 6.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      <span className="text-xs font-semibold leading-5 text-[#334155] sm:text-sm">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-[#0E1C49] shadow-[0_16px_40px_rgba(14,28,73,0.12)] sm:mt-16 lg:mt-20">
          <div className="relative flex flex-col gap-7 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-11">
            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/10"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-16 h-48 w-48 rounded-full border border-white/10"
            />

            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#BAE6FD]">
                YOUR NEXT CHAPTER STARTS HERE
              </span>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ready to move your career forward?
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#CBD5E1] sm:text-base">
                Let&apos;s identify your goals and build a practical plan for
                your next career move.
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
