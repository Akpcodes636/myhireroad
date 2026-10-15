"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import TermsModal from "../ui/TermsModal";
import { bookingSteps } from "../../utils/content";

const services = [
  "Full Career Services Package",
  "ATS Resume Writing",
  "LinkedIn Profile Optimization",
  "Interview Coaching",
  "Career Transition Coaching",
  "Salary Negotiation Coaching",
  "Not Sure, Need Guidance",
];

const careerStages = [
  "Currently employed and exploring opportunities",
  "Actively searching for a job",
  "Changing careers",
  "Recent graduate",
  "Returning to the workforce",
];

const investmentOptions = [
  "Yes, I'm ready to get started.",
  "I'd like to discuss the services and pricing first.",
  "I'm exploring my options.",
];

const inputClass =
  "w-full min-w-0 rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#0E1C49] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0284C7] focus:ring-2 focus:ring-[#38BDF8]/30 sm:text-base";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#0E1C49] sm:text-base";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  targetRole: string;
  careerStage: string;
  country: string;
  challenge: string;
  investmentReady: string;
  additionalInfo: string;
  consent: boolean;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  targetRole: "",
  careerStage: "",
  country: "",
  challenge: "",
  investmentReady: "",
  additionalInfo: "",
  consent: false,
};

export default function StartHere() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [resume, setResume] = useState<File | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const closeTerms = () => {
    setShowTerms(false);
    setPendingSubmit(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!termsAccepted) {
      setPendingSubmit(true);
      setShowTerms(true);
      return;
    }

    // Frontend preview only: connect a backend or CRM before launch.
    setSubmitted(true);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);

    if (pendingSubmit) {
      setPendingSubmit(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      <section
        id="start"
        className="overflow-hidden bg-[#F8FAFC] py-14 sm:py-20 lg:py-28 xl:py-32"
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 items-start gap-10 md:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-20 2xl:gap-24">
            {/* Introduction */}
            <div className="min-w-0 lg:sticky lg:top-24">
              <SectionLabel>Start Here</SectionLabel>

              <h2 className="mb-5 mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0E1C49] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                Let&apos;s understand your career goal before recommending a
                service.
              </h2>

              <p className="mb-8 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8 lg:mb-10 lg:text-xl">
                Tell us where you are in your career, what you want to achieve,
                and the support you need. We&apos;ll use these details to help
                guide your next step.
              </p>

              <div className="space-y-5 lg:space-y-6">
                {bookingSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0E1C49] text-sm font-bold text-white sm:h-10 sm:w-10">
                      {index + 1}
                    </div>

                    <p className="pt-1 text-sm font-medium leading-6 text-[#0E1C49] sm:text-base sm:leading-7">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-[#BAE6FD] bg-[#E0F2FE] p-4 sm:p-5">
                <p className="text-sm font-bold text-[#0E1C49]">
                  Consultation commitment fee: $50
                </p>

                <p className="mt-1 text-sm leading-6 text-[#475569]">
                  The fee is credited toward your package if you proceed,
                  refunded if you attend but decide not to continue, and subject
                  to the cancellation policy.
                </p>

                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="mt-3 text-sm font-bold text-[#0369A1] underline underline-offset-4 hover:text-[#0E1C49]"
                >
                  Read Terms &amp; Services
                </button>
              </div>
            </div>

            {/* Qualification form */}
            <div className="min-w-0 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-7 md:p-8 lg:p-8 xl:p-10 2xl:p-12">
              {submitted ? (
                <div className="py-12 text-center sm:py-16">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F2FE] text-[#0284C7]">
                    <svg
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-2xl font-extrabold text-[#0E1C49]">
                    Details received.
                  </h3>

                  <p className="mx-auto max-w-sm text-sm leading-7 text-[#64748B]">
                    This is a frontend preview. Connect the form to your CRM or
                    backend before launch. No information or resume has been
                    transmitted.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                  <div className="rounded-lg border border-[#BAE6FD] bg-[#F0F9FF] p-4">
                    <p className="text-sm leading-6 text-[#0E1C49]">
                      <strong>Before you begin:</strong> Complete the fields
                      below. You&apos;ll be asked to review and accept our Terms
                      &amp; Services before submitting.
                    </p>
                  </div>

                  {/* 1. Full name */}
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      1. Full name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      className={inputClass}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(event) => setField("name", event.target.value)}
                    />
                  </div>

                  {/* 2. Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      2. Email address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(event) =>
                        setField("email", event.target.value)
                      }
                    />
                  </div>

                  {/* 3. Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      3. Phone number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className={inputClass}
                      placeholder="Include your country code"
                      value={formData.phone}
                      onChange={(event) =>
                        setField("phone", event.target.value)
                      }
                    />
                  </div>

                  {/* 4. Optional resume */}
                  <div>
                    <label htmlFor="resume" className={labelClass}>
                      4. Upload your current resume (optional)
                    </label>

                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-[#E0F2FE] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#0E1C49]`}
                      onChange={(event) =>
                        setResume(event.target.files?.[0] ?? null)
                      }
                    />

                    <p className="mt-2 text-xs leading-5 text-[#64748B]">
                      PDF or Word document. Avoid uploading documents containing
                      information you do not wish to share.
                    </p>

                    {resume && (
                      <p className="mt-2 break-all text-sm font-medium text-[#0369A1]">
                        Selected: {resume.name}
                      </p>
                    )}
                  </div>

                  {/* 5. Service selection */}
                  <fieldset>
                    <legend className={labelClass}>
                      5. What service are you interested in? *
                    </legend>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {services.map((service) => (
                        <label
                          key={service}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                            formData.service === service
                              ? "border-[#0284C7] bg-[#E0F2FE] text-[#0E1C49]"
                              : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#38BDF8]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            required
                            value={service}
                            checked={formData.service === service}
                            onChange={() => setField("service", service)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#0284C7]"
                          />

                          <span>{service}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* 6. Target role */}
                  <div>
                    <label htmlFor="targetRole" className={labelClass}>
                      6. Current or target job title *
                    </label>

                    <input
                      id="targetRole"
                      name="targetRole"
                      required
                      className={inputClass}
                      placeholder="e.g. Product Manager, Finance Director"
                      value={formData.targetRole}
                      onChange={(event) =>
                        setField("targetRole", event.target.value)
                      }
                    />
                  </div>

                  {/* 7. Career stage */}
                  <div>
                    <label htmlFor="careerStage" className={labelClass}>
                      7. Where are you in your career journey? *
                    </label>

                    <select
                      id="careerStage"
                      name="careerStage"
                      required
                      className={inputClass}
                      value={formData.careerStage}
                      onChange={(event) =>
                        setField("careerStage", event.target.value)
                      }
                    >
                      <option value="">Select your current situation</option>

                      {careerStages.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 8. Country */}
                  <div>
                    <label htmlFor="country" className={labelClass}>
                      8. Country *
                    </label>

                    <input
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      required
                      className={inputClass}
                      placeholder="Your country of residence"
                      value={formData.country}
                      onChange={(event) =>
                        setField("country", event.target.value)
                      }
                    />
                  </div>

                  {/* 9. Career challenge */}
                  <div>
                    <label htmlFor="challenge" className={labelClass}>
                      9. What is your biggest career challenge? *
                    </label>

                    <textarea
                      id="challenge"
                      name="challenge"
                      required
                      rows={4}
                      className={`${inputClass} resize-y`}
                      placeholder="Tell us what you're finding difficult or what you'd like to improve."
                      value={formData.challenge}
                      onChange={(event) =>
                        setField("challenge", event.target.value)
                      }
                    />
                  </div>

                  {/* 10. Investment readiness */}
                  <fieldset>
                    <legend className={labelClass}>
                      10. Are you ready to invest in your career development? *
                    </legend>

                    <div className="space-y-2">
                      {investmentOptions.map((option) => (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm leading-6 transition ${
                            formData.investmentReady === option
                              ? "border-[#0284C7] bg-[#F0F9FF] text-[#0E1C49]"
                              : "border-[#E2E8F0] text-[#475569] hover:border-[#BAE6FD]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="investmentReady"
                            required
                            value={option}
                            checked={formData.investmentReady === option}
                            onChange={() =>
                              setField("investmentReady", option)
                            }
                            className="mt-1 h-4 w-4 shrink-0 accent-[#0284C7]"
                          />

                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Additional information */}
                  <div>
                    <label htmlFor="additionalInfo" className={labelClass}>
                      Anything else we should know? (Optional)
                    </label>

                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={3}
                      className={`${inputClass} resize-y`}
                      placeholder="Additional context or questions"
                      value={formData.additionalInfo}
                      onChange={(event) =>
                        setField("additionalInfo", event.target.value)
                      }
                    />
                  </div>

                  {/* Contact consent */}
                  <div className="rounded-lg bg-[#F8FAFC] p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={(event) =>
                          setField("consent", event.target.checked)
                        }
                        className="mt-1 h-4 w-4 shrink-0 accent-[#0284C7]"
                      />

                      <span className="text-sm leading-6 text-[#475569]">
                        I agree that MyHireRoads may use these details to
                        respond to my inquiry. *
                      </span>
                    </label>
                  </div>

                  {/* Terms status */}
                  <div className="rounded-lg border border-[#E2E8F0] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#0E1C49]">
                          Terms &amp; Services
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#64748B]">
                          {termsAccepted
                            ? "You've accepted the terms."
                            : "Review and accept the terms before submitting."}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="self-start text-sm font-bold text-[#0369A1] underline underline-offset-4 hover:text-[#0E1C49] sm:self-auto"
                      >
                        {termsAccepted ? "Review terms" : "Read terms"}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    Review Terms &amp; Submit →
                  </Button>

                  <p className="text-xs leading-5 text-[#64748B]">
                    Your information and resume are not transmitted by this
                    frontend preview.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {showTerms && (
        <TermsModal
          open={showTerms}
          onClose={closeTerms}
          onAccept={handleAcceptTerms}
        />
      )}
    </>
  );
}