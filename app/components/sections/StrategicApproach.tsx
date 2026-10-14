
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import { strategicApproachPillars as pillars } from '../../utils/content';

export default function StrategicApproach() {
  return (
    <section className="overflow-hidden bg-[#E8EEFE] py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Content */}
          <div className="min-w-0">
            <SectionLabel>A Strategic Approach</SectionLabel>

            <h2
              className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430]
                sm:text-4xl
                md:text-5xl
                lg:text-4xl
                xl:text-5xl
                2xl:text-6xl"
            >
              We don&apos;t just rewrite documents. We help you reposition your story.
            </h2>

            <p
              className="mb-7 text-base leading-7 text-[#5F6061]
                sm:text-lg sm:leading-8
                lg:mb-8 lg:text-lg
                xl:text-xl xl:leading-9
                2xl:text-2xl 2xl:leading-10"
            >
              A strong application connects your experience to an employer&apos;s needs. That
              means choosing the right evidence, communicating achievements clearly and presenting
              a consistent story across your resume, LinkedIn profile and interview.
            </p>

            {/* Strategic pillars */}
            <ul className="mb-8 space-y-4 sm:space-y-5 lg:mb-9">
              {pillars.map((p) => (
                <li
                  key={p}
                  className="flex min-w-0 items-start gap-3 text-base font-medium leading-7 text-[#0F1430]
                    sm:text-lg sm:leading-8
                    xl:text-xl xl:leading-9"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-[#1450F5]
                      sm:mt-1.5 sm:h-6 sm:w-6"
                  >
                    <svg
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                      viewBox="0 0 10 8"
                      fill="none"
                    >
                      <path
                        d="M1 4l3 3 5-6"
                        stroke="white"
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

          {/* Visual block */}
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1450F5]">
              {/* Decorative shapes */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 sm:h-56 sm:w-56 lg:h-64 lg:w-64" />
                <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#0E3DD4]/50 sm:h-56 sm:w-56" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-10 lg:p-6 xl:p-10 2xl:p-12">
                <div className="relative z-10 max-w-full text-center text-white">
                  <p
                    aria-hidden="true"
                    className="mb-4 text-3xl font-extrabold leading-tight opacity-15
                      sm:mb-6 sm:text-5xl
                      md:text-6xl
                      lg:text-4xl
                      xl:text-5xl
                      2xl:text-6xl"
                  >
                    Resume
                    <br />
                    LinkedIn
                    <br />
                    Interview
                  </p>

                  <p
                    className="text-lg font-bold leading-snug
                      sm:text-2xl
                      md:text-3xl
                      lg:text-xl
                      xl:text-2xl
                      2xl:text-3xl"
                  >
                    From overlooked applicant
                    <br />
                    to confident candidate
                  </p>

                  <p
                    className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-white/75
                      sm:text-sm
                      lg:text-sm
                      xl:text-base
                      2xl:text-lg"
                  >
                    Strategic positioning across every touchpoint
                  </p>
                </div>
              </div>

              {/* Corner accents */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-10 w-10 bg-[#0E3DD4]
                  sm:h-16 sm:w-16
                  lg:h-20 lg:w-20"
              />

              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-6 w-6 bg-[#0E3DD4]
                  sm:h-10 sm:w-10
                  lg:h-12 lg:w-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
