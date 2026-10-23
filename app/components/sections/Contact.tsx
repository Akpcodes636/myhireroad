
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';

const contactItems = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Email",
    content: (
      <a
        href="mailto:Katefasanella12@gmail.com"
        className="break-words text-sm font-semibold text-[#061B55] transition-colors hover:text-[#0866E8] focus:outline-none sm:text-base lg:text-lg"
      >
        Katefasanella12@gmail.com
      </a>
    ),
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Career Services",
    content: (
      <p className="max-w-xl text-sm leading-7 text-[#475569] sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
        Resume writing, LinkedIn optimization, interview coaching,
        career transition and salary negotiation.
      </p>
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 overflow-hidden bg-[#F4F8FF] py-14 sm:py-20 lg:py-28 xl:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-12 xl:gap-20 2xl:gap-24">

          {/* Left: Contact details */}
          <div className="min-w-0">
            <SectionLabel align='left'>Contact</SectionLabel>

            <h2 className="mb-5 mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#061B55] sm:text-4xl md:text-5xl lg:mb-7 lg:text-5xl xl:text-6xl">
              Have a question before choosing a service?
            </h2>

            <p className="mb-10 max-w-2xl text-base leading-7 text-[#475569] sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
              Reach out with your question or start with the qualification
              form. We&apos;ll use the information you share to understand the
              next step that may fit your career goal.
            </p>

            <div className="space-y-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-[#DCEBFF] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#0866E8]/30 hover:shadow-md sm:gap-5 sm:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0866E8]/10 text-[#0866E8] sm:h-12 sm:w-12">
                    {item.icon}
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[#475569] sm:text-sm">
                      {item.label}
                    </p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="relative min-w-0 overflow-hidden rounded-2xl bg-[#061B55] p-6 shadow-[0_20px_60px_rgba(6,27,85,0.20)] sm:p-8 md:p-10 xl:rounded-3xl xl:p-12">
            {/* Decorative orbs */}
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0866E8]/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-[#0866E8]/10 blur-2xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0866E8]/40 bg-[#0866E8]/15 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#93C5FD]">
                  Next Step
                </p>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl">
                Ready to get started?
              </h3>

              <p className="mb-8 text-sm leading-7 text-[#94A3B8] sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                Complete the qualification form and we&apos;ll review your goals
                before recommending the right service for where you are.
              </p>

              {/* Feature list */}
              <div className="mb-8 space-y-3">
                {['Personalized service recommendation', 'Response within 24 hours'].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0866E8]/20">
                      <svg viewBox="0 0 10 10" fill="none" className="h-3 w-3">
                        <path d="m2 5 2 2 4-4" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm text-[#94A3B8]">{point}</span>
                  </div>
                ))}
              </div>

              <Button
                href="#start"
                size="lg"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#0866E8] px-6 py-3.5 text-center text-sm font-bold tracking-wide text-white transition-all duration-200 hover:bg-[#0B3D91] focus:outline-none focus:ring-2 focus:ring-[#0866E8] focus:ring-offset-2 focus:ring-offset-[#061B55] sm:px-8 sm:text-base"
              >
                Complete the qualification form →
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
