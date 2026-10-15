
import SectionLabel from '../ui/SectionLabel';
import { audiences } from '../../utils/content';

export default function WhoWeHelp() {
  return (
    <section className="overflow-hidden bg-[#F7F8F9] py-14 sm:py-20 lg:py-28 xl:py-36">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-14 xl:mb-16">
          <SectionLabel>Who We Help</SectionLabel>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            Your next career move deserves a strategy.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[#E8EEFE] sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              className="group cursor-default bg-white p-5 transition-colors duration-200 hover:bg-[#38BDF8] sm:p-6 lg:p-8 xl:p-10 2xl:p-12"
            >
              <span className="mb-3 block text-xs font-bold tracking-widest text-[#A1A2A4] transition-colors group-hover:text-white/40 sm:mb-4 sm:text-sm lg:mb-5 lg:text-base">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="mb-2 text-base font-bold leading-snug text-[#0F1430] transition-colors group-hover:text-white sm:text-lg lg:mb-3 lg:text-xl xl:text-2xl">
                {a.title}
              </h3>

              <p className="text-sm leading-7 text-[#5F6061] transition-colors group-hover:text-white/70 sm:text-base sm:leading-8 lg:text-lg lg:leading-9 xl:text-xl">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
