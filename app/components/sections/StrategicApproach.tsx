
import Image from 'next/image';
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import { strategicApproachPillars as pillars } from '../../utils/content';

export default function StrategicApproach() {
  return (
    <section className="overflow-hidden bg-[#F8FAFC] py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Content */}
          <div className="min-w-0">
            <SectionLabel>A Strategic Approach</SectionLabel>

            <h2
              className="mb-2 text-3xl font-extrabold leading-tight tracking-tight text-[#0E1C49]
                sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            >
              We don&apos;t just rewrite documents. We help you reposition your story.
            </h2>

            <p
              className="mb-2 text-base leading-7 text-[#64748B]
                sm:text-lg sm:leading-8 lg:mb-2 lg:text-lg
                xl:text-xl xl:leading-9 2xl:text-2xl 2xl:leading-10"
            >
              A strong application connects your experience to an employer&apos;s needs. That
              means choosing the right evidence, communicating achievements clearly and presenting
              a consistent story across your resume, LinkedIn profile and interview.
            </p>

            {/* Strategic pillars */}
            <ul className="mb-2 space-y-4 sm:space-y-5 lg:mb-4">
              {pillars.map((p) => (
                <li
                  key={p}
                  className="flex min-w-0 items-start gap-3 text-base font-medium leading-7 text-[#0E1C49]
                    sm:text-lg sm:leading-8 xl:text-xl xl:leading-9"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm bg-[#E0F2FE] text-[#0E1C49]
                      sm:mt-1.5 sm:h-6 sm:w-6"
                  >
                    <svg
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                      viewBox="0 0 10 8"
                      fill="none"
                    >
                      <path
                        d="M1 4l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span className="min-w-0">{p}</span>
                </li>
              ))}
            </ul>

            <Button href="#start" variant="primary" size="md">
              Find Your Next Step →
            </Button>
          </div>

          {/* Professional career coaching image */}
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E0F2FE] shadow-xl sm:rounded-3xl">
              <Image
                src="/images/strag.jpg"
                alt="A career consultant helping a professional review career documents and prepare for new opportunities"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />

              {/* Subtle overlay for depth */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0E1C49]/70 via-[#0E1C49]/10 to-transparent"
              />

              {/* Image caption */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-6 xl:p-8">
                <div className="max-w-md">
                  <span className="mb-3 inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                    YOUR NEXT CHAPTER
                  </span>

                  <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl xl:text-3xl">
                    From overlooked applicant to confident candidate.
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                    Strategic positioning across every touchpoint.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 -z-10 h-24 w-24 rounded-tr-3xl bg-[#38BDF8]/30 sm:-right-4 sm:-top-4 sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
