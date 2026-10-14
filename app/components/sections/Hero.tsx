
import Button from '../ui/Button';
import { heroStats } from '../../utils/content';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0F1430]">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -right-24 -top-20 h-64 w-64 rounded-full opacity-[0.06] blur-2xl
          sm:-right-32 sm:-top-32 sm:h-96 sm:w-96
          lg:h-[600px] lg:w-[600px]"
          style={{ background: '#1450F5' }}
        />

        <div
          className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-[0.04] blur-2xl
          sm:-bottom-24 sm:-left-24 sm:h-72 sm:w-72
          lg:h-96 lg:w-96"
          style={{ background: '#1450F5' }}
        />
      </div>

      {/* Hero content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#93aafa] sm:mb-6 sm:text-sm">
            Strategic Career Services
          </p>

          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white [overflow-wrap:anywhere]
            sm:mb-6 sm:text-4xl sm:leading-[1.1]
            md:text-5xl
            lg:text-6xl">
            Your experience deserves to be seen by the right employers.
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-[#a1a2a4]
            sm:mb-10 sm:text-lg">
            My Hire Roads helps professionals position themselves for better career opportunities
            through strategic resume writing, LinkedIn optimization, interview coaching, career
            transition support and salary negotiation.
          </p>

          {/* Responsive calls to action */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="#services" variant="primary" size="lg">
              Explore Career Services
            </Button>

            <a
              href="#start"
              className="inline-flex min-h-12 w-full items-center justify-center border-2 border-white/30
                px-6 py-3 text-center text-sm font-semibold tracking-wide text-white
                transition-colors duration-150 hover:border-white/60 hover:bg-white/10
                active:bg-white/20
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93aafa]
                focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1430]
                sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Responsive statistics strip */}
      <div className="relative border-t border-white/10 bg-[#1450F5]">
        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-white/20
            sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center px-2 py-4 text-center
                  sm:px-3 sm:py-2
                  md:px-6"
              >
                <p className="text-2xl font-extrabold leading-tight text-white sm:text-2xl md:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-2 max-w-full text-xs font-medium leading-relaxed text-white/80
                  sm:text-xs md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
