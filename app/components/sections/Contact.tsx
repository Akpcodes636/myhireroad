
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';

export default function Contact() {
  return (
    <section
      id="contact"
      className="overflow-hidden bg-[#F8FAFC] py-14 sm:py-20 lg:py-28 xl:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-12 xl:gap-20 2xl:gap-24">

          {/* Left: Contact details */}
          <div className="min-w-0">
            <SectionLabel>Contact</SectionLabel>

            <h2 className="mb-5 mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0E1C49] sm:text-4xl md:text-5xl lg:mb-7 lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Have a question before choosing a service?
            </h2>

            <p className="mb-8 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8 lg:mb-10 lg:text-xl lg:leading-9 xl:text-2xl">
              Reach out with your question or start with the qualification
              form. We&apos;ll use the information you share to understand the
              next step that may fit your career goal.
            </p>

            <div className="space-y-7 sm:space-y-8 lg:space-y-10">

              {/* Email */}
              <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0E1C49] shadow-sm sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-[72px] xl:w-[72px]">
                  <svg
                    className="h-[18px] w-[18px] sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0 pt-0.5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#64748B] sm:text-sm lg:mb-2 lg:text-base">
                    Email
                  </p>

                  <a
                    href="mailto:hello@myhireroads.com"
                    className="break-words text-sm font-semibold text-[#0E1C49] transition-colors hover:text-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] sm:text-base lg:text-lg xl:text-xl"
                  >
                    hello@myhireroads.com
                  </a>
                </div>
              </div>

              {/* Career services */}
              <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0E1C49] shadow-sm sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-[72px] xl:w-[72px]">
                  <svg
                    className="h-[18px] w-[18px] sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0 pt-0.5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#64748B] sm:text-sm lg:mb-2 lg:text-base">
                    Career services
                  </p>

                  <p className="max-w-xl text-sm leading-7 text-[#0E1C49] sm:text-base sm:leading-8 lg:text-lg lg:leading-9 xl:text-xl xl:leading-10">
                    Resume writing, LinkedIn optimization, interview coaching,
                    career transition and salary negotiation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Call-to-action card */}
          <div className="relative min-w-0 overflow-hidden rounded-2xl border border-[#1E3268] bg-[#0E1C49] p-5 shadow-xl shadow-[#0E1C49]/10 sm:p-8 md:p-10 lg:p-8 xl:rounded-3xl xl:p-12 2xl:p-14">
            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[28px] border-[#38BDF8]/10 sm:h-64 sm:w-64"
            />

            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-1 w-8 rounded-full bg-[#38BDF8]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#7DD3FC] sm:text-sm lg:text-base">
                  Next step
                </p>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                Ready to get started?
              </h3>

              <p className="mb-7 text-sm leading-7 text-[#CBD5E1] sm:text-base sm:leading-8 lg:mb-9 lg:text-lg lg:leading-9 xl:text-xl xl:leading-10">
                Complete the qualification form and we&apos;ll review your goals
                before recommending the right service for where you are.
              </p>

              <Button
                href="#start"
                size="lg"
                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-[#38BDF8] bg-[#38BDF8] px-4 py-3 text-center text-sm font-bold tracking-wide text-[#0E1C49] transition-all duration-200 hover:border-[#7DD3FC] hover:bg-[#7DD3FC] active:bg-[#BAE6FD] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 focus:ring-offset-[#0E1C49] sm:w-auto sm:px-6 sm:py-4 sm:text-base lg:w-full lg:px-5 xl:w-auto xl:px-7 xl:text-lg"
              >
                Complete the qualification form →
              </Button>

              <p className="mt-5 text-xs leading-5 text-[#94A3B8] sm:text-sm">
                Personalized guidance for your next career move.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
