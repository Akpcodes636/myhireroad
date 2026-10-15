import Image from 'next/image';
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
            When your applications aren&apos;t getting results, the right career
            strategy can help you present your strengths with clarity and prepare
            for the next opportunity.
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
              {/* Career journey image */}
              <div
                className="group relative min-h-64 w-full overflow-hidden
                  sm:min-h-80
                  lg:min-h-[340px] lg:w-2/5
                  xl:min-h-[400px]"
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay for image depth and text readability */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0F1430]/75 via-[#0F1430]/10 to-transparent"
                />

                {/* Image step label */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8 xl:p-10">
                  {/* <span className="text-xs font-semibold uppercase tracking-widest text-white sm:text-sm">
                    {step.step}
                  </span> */}
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
                {/* Step label */}
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#38BDF8]
                    sm:mb-4 sm:text-sm lg:text-base"
                >
                  {step.step}
                </p>

                {/* Step heading */}
                <h3
                  className="mb-3 text-xl font-bold leading-snug text-[#0F1430]
                    sm:text-2xl
                    lg:mb-4 lg:text-3xl
                    xl:text-4xl"
                >
                  {step.title}
                </h3>

                {/* Step description */}
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
      </div>
    </section>
  );
}