
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import { howItWorksSteps as steps } from '../../utils/content';

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-16 sm:py-20 lg:py-28 xl:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 max-w-3xl sm:mb-14 lg:mb-20">
          <SectionLabel>How It Works</SectionLabel>

          <h2 className="mb-5 text-3xl font-extrabold leading-tight text-[#0F1430] sm:text-4xl lg:text-5xl xl:text-6xl">
            A clearer path from where you are to where you want to go.
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-[#5F6061] sm:text-lg lg:text-xl">
            We start by understanding your situation, then align the work to
            your goals.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-12 grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mb-16 lg:grid-cols-5 lg:gap-6 xl:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative flex items-start gap-4 sm:flex-col sm:items-start sm:gap-0"
            >
              {/* Number block and connector */}
              <div className="relative shrink-0 sm:mb-6">
                <div className="flex h-14 w-14 items-center justify-center bg-[#1450F5] transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem] xl:h-20 xl:w-20">
                  <span className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
                    {step.number}
                  </span>
                </div>

                {/* Connector arrow on desktop */}
                {i < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 hidden w-[calc(100%+1.5rem)] -translate-y-1/2 lg:block xl:w-[calc(100%+2rem)]">
                    <div className="ml-3 flex items-center">
                      <div className="h-px flex-1 bg-[#E8EEFE]" />
                      <div className="h-2 w-2 -translate-x-0.5 rotate-45 border-r border-t border-[#1450F5]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Step content */}
              <div className="min-w-0 flex-1 sm:flex-none">
                <h3 className="mb-2 text-lg font-bold leading-snug text-[#0F1430] sm:text-xl lg:text-xl xl:text-2xl">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#5F6061] sm:text-base lg:text-base xl:text-lg">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href="#start" variant="primary" size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
