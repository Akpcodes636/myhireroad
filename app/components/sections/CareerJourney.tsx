
import SectionLabel from '../ui/SectionLabel';
import { journeySteps as steps } from '../../utils/content';

export default function CareerJourney() {
  return (
    <section className="bg-[#F7F8F9] py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section introduction */}
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-16">
          <SectionLabel>Your Career Journey</SectionLabel>

          <h2
            className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430]
              sm:text-4xl
              md:text-5xl
              lg:text-5xl
              xl:text-6xl
              2xl:text-7xl"
          >
            From job-search frustration to the opportunity you want.
          </h2>

          <p
            className="max-w-3xl text-base leading-7 text-[#5F6061]
              sm:text-lg sm:leading-8
              lg:text-xl lg:leading-9
              xl:text-2xl xl:leading-10"
          >
            When your applications aren&apos;t getting results, the right career strategy can
            help you present your strengths with clarity and prepare for the next opportunity.
          </p>
        </div>

        {/* Career journey steps */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-px">
          {steps.map((step, i) => (
            <article
              key={step.step ?? i}
              className={`flex flex-col overflow-hidden bg-white lg:flex-row ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Numbered accent panel */}
              <div
                className="relative flex min-h-44 w-full items-center justify-center
                  overflow-hidden sm:min-h-56
                  lg:min-h-[340px] lg:w-2/5
                  xl:min-h-[400px]"
                style={{ background: step.accentColor }}
              >
                <div
                  aria-hidden="true"
                  className="select-none p-6 text-center text-white/20
                    sm:p-8 lg:p-10 xl:p-12"
                >
                  <span
                    className="block text-7xl font-extrabold leading-none
                      sm:text-8xl
                      md:text-9xl
                      lg:text-[120px]
                      xl:text-[150px]
                      2xl:text-[170px]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-end p-5 sm:p-7 lg:p-8 xl:p-10">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/70 sm:text-sm">
                    {step.step}
                  </span>
                </div>
              </div>

              {/* Step content */}
              <div
                className="flex w-full flex-col justify-center
                  p-5 sm:p-7 md:p-9
                  lg:w-3/5 lg:p-10
                  xl:p-14
                  2xl:p-16"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#1450F5]
                  sm:mb-4 sm:text-sm lg:text-base">
                  {step.step}
                </p>

                <h3
                  className="mb-3 text-xl font-bold leading-snug text-[#0F1430]
                    sm:text-2xl
                    lg:mb-4 lg:text-3xl
                    xl:text-4xl"
                >
                  {step.title}
                </h3>

                <p
                  className="text-base leading-7 text-[#5F6061]
                    sm:text-lg sm:leading-8
                    lg:text-xl lg:leading-9
                    xl:text-2xl xl:leading-10"
                >
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="mt-6 max-w-2xl text-xs leading-relaxed text-[#77797D]
            sm:mt-8 sm:text-sm sm:leading-6
            lg:mt-10 lg:text-base lg:leading-7"
        >
          Career support can strengthen your preparation and positioning, but no service can
          guarantee a job offer.
        </p>
      </div>
    </section>
  );
}
