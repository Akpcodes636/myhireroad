import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Services | MyHireRoads",
  description:
    "Read the MyHireRoads Terms and Services before booking a consultation or purchasing a career service.",
};

const sections = [
  {
    number: "1",
    title: "Our Services",
    content: (
      <>
        <p>
          MyHireRoads provides professional and executive resume writing, ATS
          optimization, LinkedIn profile optimization, interview preparation,
          career transition support, salary negotiation, and career coaching.
        </p>
        <p className="mt-3">
          Service details, deliverables, timelines, and pricing will be
          confirmed before payment or work begins.
        </p>
      </>
    ),
  },
  {
    number: "2",
    title: "Consultation Booking & $50 Commitment Fee",
    content: (
      <>
        <p>
          A $50 refundable commitment fee is required to secure your
          consultation.
        </p>
        <ul className="mt-4 space-y-3">
          {[
            {
              label: "Attend and purchase a service:",
              detail:
                "Your $50 will be deducted from your total service cost.",
            },
            {
              label: "Attend but decide not to proceed:",
              detail: "Your $50 will be fully refunded.",
            },
            {
              label: "Fail to attend without 24-hour notice:",
              detail: "Your $50 will be forfeited.",
            },
            {
              label: "Cancel or reschedule:",
              detail:
                "You must provide at least 24 hours' notice. Timely cancellations are eligible for a refund or rescheduling.",
            },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#0866E8]" />
              <span>
                <strong className="font-semibold text-[#061B55]">
                  {item.label}
                </strong>{" "}
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          If MyHireRoads cancels your appointment, you may reschedule or
          receive a full refund.
        </p>
      </>
    ),
  },
  {
    number: "3",
    title: "Booking & Client Acceptance",
    content: (
      <>
        <p>
          Submitting an inquiry or booking a consultation does not automatically
          establish a client relationship or guarantee acceptance.
        </p>
        <p className="mt-3">
          Clients must select a service, agree to the terms, complete the
          required payment, and submit the intake questionnaire before work
          begins.
        </p>
      </>
    ),
  },
  {
    number: "4",
    title: "Pricing & Payments",
    content: (
      <p>
        All service fees, payment deadlines, deposits, and cancellation terms
        will be disclosed before you commit. Payment must be made according to
        the agreed terms before services begin.
      </p>
    ),
  },
  {
    number: "5",
    title: "Client Responsibilities",
    content: (
      <>
        <p>
          Clients must provide accurate employment history, qualifications, and
          professional achievements, complete questionnaires, review drafts, and
          provide timely feedback.
        </p>
        <p className="mt-3">
          MyHireRoads does not accept fabricated experience, false credentials,
          or misleading professional information.
        </p>
      </>
    ),
  },
  {
    number: "6",
    title: "Revisions & Delivery",
    content: (
      <>
        <p>
          Our complete career services program runs for six weeks. Individual
          service timelines may vary.
        </p>
        <p className="mt-3">
          Deliverables, revision limits, and deadlines will be confirmed before
          the engagement begins. Delays in providing information or feedback may
          affect delivery timelines.
        </p>
      </>
    ),
  },
  {
    number: "7",
    title: "Employment Outcomes",
    content: (
      <>
        <p>
          Our goal is to help you stand out, strengthen your professional brand,
          and compete confidently in today&apos;s job market.
        </p>
        <p className="mt-3">
          While we&apos;ve helped many clients advance their careers and secure
          new opportunities, we cannot guarantee interviews, job offers,
          promotions, or salary increases. We are committed to giving every
          client personalized, high-quality support.
        </p>
      </>
    ),
  },
  {
    number: "8",
    title: "Contact Us",
    content: (
      <p>
        For questions, bookings, or cancellations, contact us at{" "}
        <a
          href="mailto:kathyfasanella12@gmail.com"
          className="font-semibold text-[#0866E8] underline underline-offset-4 transition-colors hover:text-[#0B3D91]"
        >
           kathyfasanella12@gmail.com
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero banner */}
        <div className="relative overflow-hidden bg-[#061B55] py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0866E8]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#0866E8]/10 blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0866E8]/40 bg-[#0866E8]/15 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
                Legal
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Terms &amp; Services
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8] sm:text-lg">
              By booking a consultation or purchasing our services, you agree to
              the following terms. Please read carefully before proceeding.
            </p>

            <p className="mt-5 text-sm text-[#64748B]">
              Effective date: October 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#F4F8FF] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

            {/* Intro card */}
            <div className="mb-10 rounded-2xl border border-[#DCEBFF] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-base leading-7 text-[#475569] sm:text-lg sm:leading-8">
                Welcome to MyHireRoads. By booking a consultation or purchasing
                our services, you agree to the following terms.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.number}
                  className="overflow-hidden rounded-2xl border border-[#DCEBFF] bg-white shadow-sm"
                >
                  {/* Section header */}
                  <div className="flex items-center gap-4 border-b border-[#DCEBFF] bg-[#F4F8FF] px-6 py-4 sm:px-8">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#061B55] text-xs font-extrabold text-white">
                      {section.number}
                    </span>
                    <h2 className="text-base font-bold text-[#061B55] sm:text-lg">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section body */}
                  <div className="px-6 py-5 text-sm leading-7 text-[#475569] sm:px-8 sm:py-6 sm:text-base sm:leading-8">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-[#DCEBFF] bg-white p-6 text-center shadow-sm sm:p-8">
              <p className="text-sm text-[#475569] sm:text-base">
                Have questions about these terms?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:kathyfasanella12@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0866E8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B3D91]"
                >
                  Contact us
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#DCEBFF] px-5 py-2.5 text-sm font-semibold text-[#061B55] transition-colors hover:bg-[#F4F8FF]"
                >
                  ← Back to home
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
