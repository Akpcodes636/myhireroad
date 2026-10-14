
import SectionLabel from '../ui/SectionLabel';
import YouTubeEmbed from '../ui/YouTubeEmbed';
import { testimonials } from '../../utils/content';

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20 lg:py-28 xl:py-36">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">

        {/* Section heading */}
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-14 xl:mb-16">
          <SectionLabel>Client Stories</SectionLabel>

          <h2 className="mb-4 mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430] sm:text-4xl md:text-5xl lg:mb-6 lg:text-5xl xl:text-6xl 2xl:text-7xl">
            Professionals who made their next move.
          </h2>

          <p className="max-w-2xl text-base leading-7 text-[#5F6061] sm:text-lg sm:leading-8 lg:text-xl lg:leading-9 xl:text-2xl">
            Real career outcomes from professionals who strengthened their
            positioning and prepared for their next opportunity.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8 2xl:gap-10">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex min-w-0 flex-col overflow-hidden border border-[#E8EEFE] bg-white transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Video */}
              <div className="w-full overflow-hidden">
                <YouTubeEmbed
                  videoId={t.videoId}
                  title={`${t.name} testimonial`}
                />
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7 xl:p-8 2xl:p-9">

                {/* Outcome */}
                <div className="mb-4 self-start bg-[#E8EEFE] px-3 py-1.5 text-xs font-semibold leading-relaxed text-[#1450F5] sm:text-sm lg:mb-5 lg:px-4 lg:py-2 lg:text-base">
                  {t.outcome}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 flex-1 text-sm italic leading-7 text-[#0F1430] sm:text-base sm:leading-8 lg:mb-7 lg:text-lg lg:leading-9 xl:text-xl xl:leading-10">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Client details */}
                <div className="flex items-center gap-3 border-t border-[#E8EEFE] pt-4 sm:gap-4 sm:pt-5 lg:pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#1450F5] text-sm font-bold text-white sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:text-base xl:h-16 xl:w-16 xl:text-lg">
                    {t.name[0]}
                  </div>

                  <div className="min-w-0">
                    <p className="break-words text-sm font-semibold text-[#0F1430] sm:text-base lg:text-lg xl:text-xl">
                      {t.name}
                    </p>

                    <p className="mt-1 break-words text-xs leading-5 text-[#A1A2A4] sm:text-sm sm:leading-6 lg:text-base">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-7 max-w-4xl text-xs leading-6 text-[#A1A2A4] sm:mt-8 sm:text-sm sm:leading-7 lg:mt-10 lg:text-base lg:leading-8">
          * Results reflect individual experiences. Career support can
          strengthen your preparation and positioning, but no service can
          guarantee a job offer.
        </p>
      </div>
    </section>
  );
}
