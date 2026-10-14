
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import { challenges } from '../../utils/content';

export default function RealChallenge() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section introduction */}
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-16">
          <SectionLabel>The Real Challenge</SectionLabel>

          <h2
            className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430]
              sm:text-4xl
              md:text-5xl
              lg:text-5xl
              xl:text-6xl
              2xl:text-7xl"
          >
            You&apos;re qualified. So why aren&apos;t you getting the opportunities?
          </h2>

          <p
            className="max-w-3xl text-base leading-7 text-[#5F6061]
              sm:text-lg sm:leading-8
              lg:text-xl lg:leading-9
              xl:text-2xl xl:leading-10"
          >
            You can have years of experience and still find yourself applying over and over
            without the response you deserve. The problem isn&apos;t always your experience.
            Sometimes, it&apos;s how that experience is positioned.
          </p>
        </div>

        {/* Challenge cards */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-[#E8EEFE]
          sm:grid-cols-2">
          {challenges.map((item) => (
            <article
              key={item.number}
              className="bg-white p-6 sm:p-8 md:p-9 lg:p-10 xl:p-12"
            >
              <span
                aria-hidden="true"
                className="block text-4xl font-extrabold leading-none text-[#E8EEFE]
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl"
              >
                {item.number}
              </span>

              <h3
                className="mb-3 mt-4 text-lg font-bold leading-snug text-[#0F1430]
                  sm:text-xl
                  lg:mt-5 lg:text-2xl
                  xl:text-3xl"
              >
                {item.title}
              </h3>

              <p
                className="text-base leading-7 text-[#5F6061]
                  sm:text-base sm:leading-7
                  lg:text-lg lg:leading-8
                  xl:text-xl xl:leading-9"
              >
                {item.body}
              </p>
            </article>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <Button href="#start" variant="secondary" size="md">
            Find Your Best Option →
          </Button>
        </div>
      </div>
    </section>
  );
}
