
import SectionLabel from '../ui/SectionLabel';

const highlights = [
  {
    title: 'Hiring insight',
    desc: 'Understand what helps employers see your fit.',
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
        <path
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Personalized documents',
    desc: 'Materials shaped around your experience and goals.',
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Beyond the resume',
    desc: 'Support across the wider hiring journey.',
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Founder() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#0F1430] py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Portrait placeholder */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden border border-[#1450F5]/20 bg-[#1450F5]/10">
              {/* Decorative watermark */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex select-none items-center justify-center"
              >
                <span
                  className="text-[120px] font-extrabold leading-none text-white/[0.03]
                    sm:text-[160px]
                    md:text-[190px]
                    lg:text-[180px]
                    xl:text-[240px]
                    2xl:text-[280px]"
                >
                  K
                </span>
              </div>

              {/* Founder information */}
              <div className="relative bg-gradient-to-t from-[#0F1430] via-[#0F1430]/80 to-transparent p-5 sm:p-7 lg:p-8 xl:p-10">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50 sm:text-sm">
                  Founder
                </p>

                <p
                  className="break-words text-2xl font-bold leading-tight text-white
                    sm:text-3xl
                    lg:text-3xl
                    xl:text-4xl
                    2xl:text-5xl"
                >
                  Katherine Fasanella
                </p>

                <p className="mt-2 text-sm leading-relaxed text-[#93aafa] sm:text-base lg:text-lg xl:text-xl">
                  Former Healthcare COO
                </p>
              </div>
            </div>

            {/* Accent bar */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-16 w-1 bg-[#1450F5]
                sm:h-20
                lg:h-24
                xl:h-28"
            />
          </div>

          {/* Founder content */}
          <div className="min-w-0 pt-0 lg:pt-2">
            <SectionLabel light>The Perspective Behind the Brand</SectionLabel>

            <h2
              className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white
                sm:text-4xl
                md:text-5xl
                lg:text-4xl
                xl:text-5xl
                2xl:text-6xl"
            >
              We&apos;ve been on the other side of the hiring process. That changes everything.
            </h2>

            <p
              className="mb-8 text-base leading-7 text-[#b0b2bd]
                sm:text-lg sm:leading-8
                lg:mb-10 lg:text-lg
                xl:text-xl xl:leading-9
                2xl:text-2xl 2xl:leading-10"
            >
              My Hire Roads was founded by Katherine Fasanella, a former healthcare COO with more
              than 10 years of executive hiring experience. That perspective informs a service
              designed to help professionals communicate their value and understand how hiring
              decisions are made.
            </p>

            {/* Founder highlights */}
            <div className="space-y-5 sm:space-y-6 lg:space-y-7">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-3 sm:gap-4 lg:gap-5">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-[#1450F5]/40 bg-[#1450F5]/20
                      sm:h-12 sm:w-12
                      lg:h-14 lg:w-14"
                  >
                    {h.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="mb-1 text-base font-semibold leading-snug text-white
                        sm:text-lg
                        lg:text-xl
                        xl:text-2xl"
                    >
                      {h.title}
                    </p>

                    <p
                      className="text-sm leading-6 text-[#b0b2bd]
                        sm:text-base sm:leading-7
                        lg:text-lg lg:leading-8
                        xl:text-xl"
                    >
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
