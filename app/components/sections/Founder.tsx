
import Image from "next/image";
import SectionLabel from "../ui/SectionLabel";

export default function Founder() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#0E1C49] py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">

          {/* Founder portrait */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#1E3265] shadow-2xl sm:rounded-3xl">

              <Image
                src="/images/founder.jpg"
                alt="Katherine Fasanella, founder of My Hire Roads"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />

              {/* Image overlay for text contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0E1C49] via-[#0E1C49]/25 to-transparent"
              />

              {/* Founder information */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8 xl:p-10">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#38BDF8] sm:text-sm">
                  Founder
                </p>

                <h3
                  className="break-words text-2xl font-bold leading-tight text-white
                    sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  Katherine Fasanella
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#E0F2FE] sm:text-base lg:text-lg xl:text-xl">
                  Former Healthcare COO
                </p>

                <div className="mt-5 h-1 w-14 rounded-full bg-[#38BDF8] sm:mt-6" />
              </div>
            </div>

            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 -z-10 h-24 w-24 rounded-br-3xl bg-[#38BDF8]/20 sm:-bottom-4 sm:-right-4 sm:h-32 sm:w-32"
            />

            <div
              aria-hidden="true"
              className="absolute left-0 top-8 h-16 w-1 rounded-r-full bg-[#38BDF8] sm:h-20 lg:h-24 xl:h-28"
            />
          </div>

          {/* Founder content */}
          <div className="min-w-0 pt-0 lg:pt-2">
            <SectionLabel light>
              The Perspective Behind the Brand
            </SectionLabel>

            <h2
              className="mb-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-white
                sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            >
              We&apos;ve been on the other side of the hiring process. That
              changes everything.
            </h2>

            <p
              className="text-base leading-7 text-[#CBD5E1]
                sm:text-lg sm:leading-8
                lg:text-lg
                xl:text-xl xl:leading-9
                2xl:text-2xl 2xl:leading-10"
            >
              Katherine Fasanella is an accomplished executive, entrepreneur,
              and career strategist with over 30 years of leadership experience
              spanning business operations, finance, technology, regulatory
              compliance, and risk management. A graduate of George Washington
              University&apos;s Milken Institute School of Public Health, she
              has held senior leadership positions at Optum/UnitedHealthcare,
              Cigna, and MultiPlan, served as Chief Operating Officer of a major
              multispecialty medical group acquired by Optum, and founded the
              medical device company DIOPSYS Inc. Drawing on decades of
              executive experience and firsthand knowledge of what employers
              value, Katherine helps professionals at every career level and
              across diverse industries position themselves for their next big
              opportunity.
            </p>

            {/* Supporting statement */}
            <div className="mt-8 flex items-start gap-4 border-l-2 border-[#38BDF8] pl-5 sm:mt-10">
              <div>
                <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
                  Career strategy grounded in real leadership experience.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
                  Helping you communicate your value with clarity and
                  confidence.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
