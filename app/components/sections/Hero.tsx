import Button from "../ui/Button";
import Image from "next/image";
import HeroStats from "../ui/HeroStats";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#061B55]">
      {/* Gradient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0866E8] opacity-[0.12] blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-[400px] w-[400px] rounded-full bg-[#0866E8] opacity-[0.08] blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-64 w-64 rounded-full bg-[#0866E8] opacity-[0.06] blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main hero content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Left: Hero text and actions */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
                Strategic Career Services in Florida
              </p>
            </div>

            <h1 className="mb-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Your experience deserves to be seen by the{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                right employers.
              </span>
            </h1>

            <p className="mb-5 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              My Hire Roads helps professionals position themselves for better career opportunities
              through strategic resume writing, LinkedIn optimization, interview coaching, career
              transition support and salary negotiation.
            </p>

             <p className="mb-5 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">We work from Mid level executives to C-suite level executives</p>

            {/* CTAs */}
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
              <Button href="#services" variant="primary" size="sm">
                Explore Career Services
              </Button>

              <a
                href="#start"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5
                  px-6 py-3 text-center text-sm font-semibold tracking-wide text-white backdrop-blur-sm
                  transition-all duration-200 hover:border-white/40 hover:bg-white/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0866E8]
                  sm:px-8 sm:py-4 sm:text-base"
              >
                Get Started →
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative mx-auto w-full">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-[#0866E8]/15 blur-2xl sm:-inset-6"
            />

            {/* Image */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl">
              <Image
                src="/images/hero.jpg"
                alt="Professionals collaborating in a modern office"
                className="h-full w-full object-cover object-center"
                width={600}
                height={500}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061B55]/50 via-transparent to-transparent"
              />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 left-3 right-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:-bottom-6 sm:left-auto sm:right-4 sm:max-w-xs sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0866E8]/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#60A5FA"
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
                  <p className="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
                    Get the support to move forward with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics strip */}
      <div className="relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0866E8]/20 via-[#0866E8]/10 to-[#0866E8]/20" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
