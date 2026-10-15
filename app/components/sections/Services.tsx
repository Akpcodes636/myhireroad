import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import { services } from "../../utils/content";

const serviceIcons = ["document", "profile", "interview", "career", "salary"];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 xl:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section introduction */}
        <div className="mb-12 max-w-3xl sm:mb-16">
          <SectionLabel>Our Services</SectionLabel>

          <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0E1C49] sm:text-4xl md:text-5xl xl:text-6xl">
            Career support built around the move you want to make.
          </h2>

          <p className="max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
            No generic one-size-fits-all advice. We focus on your experience,
            your goals and the roles you&apos;re targeting.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <article
              key={service.number}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                index === 1
                  ? "border-[#0E1C49] bg-[#0E1C49]"
                  : "border-[#E0F2FE] bg-white hover:border-[#38BDF8]"
              }`}
            >
              {/* Decorative service number */}
              <span
                aria-hidden="true"
                className={`absolute right-5 top-4 text-5xl font-extrabold leading-none sm:text-6xl ${
                  index === 1 ? "text-white/10" : "text-[#E0F2FE]"
                }`}
              >
                {service.number}
              </span>

              {/* Accent */}
              <div
                className={`mb-7 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-20 ${
                  index === 1 ? "bg-[#38BDF8]" : "bg-[#38BDF8]"
                }`}
              />

              <h3
                className={`relative mb-3 max-w-xs text-xl font-bold leading-snug sm:text-2xl ${
                  index === 1 ? "text-white" : "text-[#0E1C49]"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`mb-4 text-sm font-semibold leading-relaxed ${
                  index === 1 ? "text-[#38BDF8]" : "text-[#0284C7]"
                }`}
              >
                {service.tagline}
              </p>

              <p
                className={`mb-6 text-sm leading-7 sm:text-base ${
                  index === 1 ? "text-[#D7E2F5]" : "text-[#64748B]"
                }`}
              >
                {service.description}
              </p>

              <ul className="mb-8 space-y-3">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className={`flex items-start gap-3 text-sm leading-6 ${
                      index === 1 ? "text-white/90" : "text-[#475569]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0F2FE] text-[#0E1C49]"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                        <path
                          d="m2 6 2.5 2.5L10 3"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <Button
                  href="#start"
                  variant={index === 1 ? "secondary" : "primary"}
                  size="md"
                  className={
                    index === 1
                      ? "w-full border-[#38BDF8] text-white hover:bg-white/10"
                      : "w-full"
                  }
                >
                  {service.cta}
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Guidance callout */}
        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-[#E0F2FE] bg-[#E0F2FE] p-6 sm:p-8 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#0369A1] sm:text-sm">
              Not sure where to start?
            </p>

            <h3 className="text-xl font-bold leading-snug text-[#0E1C49] sm:text-2xl lg:text-3xl">
              Let&apos;s identify the right service for your goal.
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#475569] sm:text-base">
              Tell us where you are in your career and what you&apos;re trying
              to achieve.
            </p>
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            <Button
              href="#start"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Find My Best Option →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
