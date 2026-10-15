
import SectionLabel from '../ui/SectionLabel';
import YouTubeEmbed from '../ui/YouTubeEmbed';
import { testimonials } from '../../utils/content';

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20 lg:py-28 xl:py-36">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">

        {/* Section heading */}
        <div className="mb-12 max-w-3xl sm:mb-14 lg:mb-16">
          <SectionLabel>Client Stories</SectionLabel>

          <h2 className="mb-4 mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#061B55] sm:text-4xl md:text-5xl lg:mb-6 lg:text-5xl xl:text-6xl">
            Professionals who made their next move.
          </h2>

          <p className="max-w-2xl text-base leading-7 text-[#475569] sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
            Real career outcomes from professionals who strengthened their
            positioning and prepared for their next opportunity.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#DCEBFF] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0866E8]/30 hover:shadow-[0_16px_40px_rgba(8,102,232,0.1)]"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#061B55] via-[#0866E8] to-[#60A5FA] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Video */}
              <div className="w-full overflow-hidden">
                <YouTubeEmbed
                  videoId={t.videoId}
                  title={`${t.name} testimonial`}
                />
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">

                {/* Outcome badge */}
                <div className="mb-4 self-start rounded-full border border-[#DCEBFF] bg-[#F4F8FF] px-3 py-1.5 text-xs font-semibold leading-relaxed text-[#0866E8] sm:text-sm">
                  {t.outcome}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 flex-1 text-sm italic leading-7 text-[#061B55] sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Client details */}
                <div className="flex items-center gap-3 border-t border-[#DCEBFF] pt-4 sm:gap-4 sm:pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#061B55] text-sm font-bold text-white sm:h-12 sm:w-12 lg:h-13 lg:w-13">
                    {t.name[0]}
                  </div>

                  <div className="min-w-0">
                    <p className="break-words text-sm font-semibold text-[#061B55] sm:text-base lg:text-lg">
                      {t.name}
                    </p>
                    <p className="mt-0.5 break-words text-xs leading-5 text-[#475569] sm:text-sm">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
