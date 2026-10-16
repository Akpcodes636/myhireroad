import Image from "next/image";
import SectionLabel from "../ui/SectionLabel";
import YouTubeEmbed from "../ui/YouTubeEmbed";
import { founderVideoId } from "../../utils/content";

export default function Founder() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#061B55] py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32"
    >
      {/* Background orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-[#0866E8]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#0866E8]/8 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Founder portrait */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none">
            {/* Glow behind image */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-[#0866E8]/20 blur-2xl"
            />

            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:rounded-3xl">
              <Image
                src="/images/founder.jpg"
                alt="Katherine Fasanella, founder of My Hire Roads"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />

              {/* Gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061B55] via-[#061B55]/20 to-transparent"
              />

              {/* Founder info */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8 xl:p-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0866E8]/40 bg-[#0866E8]/15 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93C5FD]">
                    Founder
                  </p>
                </div>

                <h3 className="break-words text-2xl font-bold leading-tight text-white sm:text-3xl xl:text-4xl">
                  Katherine Fasanella
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                  Former Healthcare COO
                </p>

                <div className="mt-4 h-0.5 w-12 rounded-full bg-[#0866E8]" />
              </div>
            </div>

            {/* Corner accents */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 -z-10 h-24 w-24 rounded-br-3xl border-b-2 border-r-2 border-[#0866E8]/30 sm:-bottom-4 sm:-right-4"
            />
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 -z-10 h-16 w-16 rounded-tl-3xl border-l-2 border-t-2 border-[#0866E8]/20"
            />
          </div>

          {/* Founder content */}
          <div className="min-w-0 pt-0 ">
            {/* <SectionLabel light>About</SectionLabel> */}

            <h2 className="mb-5 mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl">
              Meet Our Founder{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                Katherine Fasanella,
              </span>{" "}
              BA, MHSA
            </h2>

            <p className="text-base mb-2 leading-7 text-[#94A3B8] sm:text-lg sm:leading-8 lg:text-lg xl:text-xl xl:leading-9">
              Katherine Fasanella is an accomplished executive, entrepreneur,
              and career strategist with over 30 years of leadership experience
              spanning business operations, finance, technology, regulatory
              compliance, and risk management.
            </p>
            <p className="text-base mb-2 leading-7 text-[#94A3B8] sm:text-lg sm:leading-8 lg:text-lg xl:text-xl xl:leading-9">
              A graduate of George Washington University&apos;s Milken Institute
              School of Public Health, she has held senior leadership positions
              at Optum/UnitedHealthcare, Cigna, and MultiPlan, served as Chief
              Operating Officer of a major multispecialty medical group acquired
              by Optum, and founded the medical device company DIOPSYS Inc.
            </p>

            <p className="text-base leading-7 text-[#94A3B8] sm:text-lg sm:leading-8 lg:text-lg xl:text-xl xl:leading-9">
              {" "}
              Drawing on decades of executive experience and firsthand knowledge
              of what employers value, Katherine helps professionals at every
              career level and across diverse industries position themselves for
              their next big opportunity.
            </p>
          </div>
        </div>
        {/* Founder intro video */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
            Hear from Katherine
          </p>
          {/* <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:rounded-3xl">
            <YouTubeEmbed videoId={founderVideoId} title="Katherine Fasanella — Founder Introduction" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
