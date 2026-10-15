
import Button from '../ui/Button';
import { heroStats } from '../../utils/content';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0E1C49]">
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

      {/* Main hero content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Left: Hero text and actions */}
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#38BDF8] sm:mb-2 sm:text-sm">
              Strategic Career Services in Florida
            </p>

            <h1
              className="mb-2 text-3xl font-extrabold leading-tight tracking-tight text-white [overflow-wrap:anywhere]
              sm:mb-6 sm:text-4xl sm:leading-[100%]
              md:text-5xl
              lg:text-5xl
              xl:text-6xl"
            >
              Your experience deserves to be seen by the right employers.
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#B7BDCD] sm:mb-5 sm:text-lg">
              My Hire Roads helps professionals position themselves for better career opportunities
              through strategic resume writing, LinkedIn optimization, interview coaching, career
              transition support and salary negotiation.
            </p>

            {/* Calls to action */}
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

          {/* Right: Professional career image */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            {/* Blue ambient glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-[#1450F5]/20 blur-2xl sm:-inset-6"
            />

            {/* Image container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#171E3D] shadow-2xl sm:rounded-3xl">
              <Image
                src="/images/hero.jpg"
                alt="Professionals collaborating in a modern office"
                className="h-full w-full object-cover object-center"
                fetchPriority="high"
                decoding="async"
                width={500}
                height={500}
              />

              {/* Subtle image overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0F1430]/35 via-transparent to-transparent"
              />
            </div>

            {/* Floating career support card */}
            <div className="absolute -bottom-5 left-3 right-3 rounded-xl border border-white/10 bg-[#171E3D]/95 p-4 shadow-xl backdrop-blur-md sm:-bottom-6 sm:left-6 sm:right-auto sm:max-w-xs sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1450F5]/20 text-[#93aafa]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="10" cy="7" r="4" />
                    <path d="m16 11 2 2 4-4" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Your next career move
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#B7BDCD]">
                    Get the support to move forward with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics strip */}
      <div className="relative mt-5 border-t border-white/10 bg-[#38BDF8] sm:mt-8 lg:mt-10">
        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div
            className="grid grid-cols-1 divide-y divide-white/20
            sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
          >
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

                <p className="mt-2 max-w-full text-xs font-medium leading-relaxed text-white/80 sm:text-xs md:text-sm">
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
