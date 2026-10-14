import SectionLabel from '../ui/SectionLabel';
import YouTubeEmbed from '../ui/YouTubeEmbed';
import { careerInsightVideos as videos } from '../../utils/content';

export default function VideoSection() {
  const featured = videos.find((v) => v.featured)!;
  const secondary = videos.filter((v) => !v.featured);

  return (
    <section className="bg-[#0F1430] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <SectionLabel light>Career Insights</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
            Learn what makes the difference.
          </h2>
          <p className="text-[#a1a2a4] leading-relaxed">
            Practical career advice from a hiring perspective — how to position your experience,
            prepare for interviews and navigate your job search.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Featured video — spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-[#171c35] overflow-hidden h-full flex flex-col">
              <YouTubeEmbed videoId={featured.id} title={featured.title} />
              <div className="p-6 flex-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1450F5] mb-3 block">
                  Featured
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{featured.title}</h3>
                <p className="text-[#a1a2a4] text-sm leading-relaxed">{featured.desc}</p>
              </div>
            </div>
          </div>

          {/* Secondary videos stacked */}
          <div className="flex flex-col gap-4">
            {secondary.map((v) => (
              <div key={v.title} className="bg-[#171c35] overflow-hidden flex-1 flex flex-col">
                <YouTubeEmbed videoId={v.id} title={v.title} />
                <div className="p-5 flex-1">
                  <h3 className="text-sm font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-[#a1a2a4] text-xs leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
