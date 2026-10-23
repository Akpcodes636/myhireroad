"use client";

import { useState } from "react";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import TermsModal from "../ui/TermsModal";
import { bookingSteps } from "../../utils/content";

const BOOKING_URL =
  "https://app.acuityscheduling.com/schedule.php?owner=36932701&appointmentType=category:Career%20Consultation";

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

const baseInput =
  "w-full min-w-0 rounded-xl border bg-white px-4 py-3 text-sm text-[#061B55] outline-none transition placeholder:text-[#94A3B8] focus:ring-2 sm:text-base";
const okInput = `${baseInput} border-[#DCEBFF] focus:border-[#0866E8] focus:ring-[#0866E8]/20`;
const errInput = `${baseInput} border-red-400 focus:border-red-500 focus:ring-red-400/20`;

const labelClass =
  "mb-2 block text-sm font-semibold text-[#061B55] sm:text-base";

type FormData = {
  name: string;
  email: string;
  phone: string;
  services: string[];
  targetRole: string;
  careerStage: string;
  country: string;
  challenge: string;
  investmentReady: string;
  additionalInfo: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormData | "resume", string>>;

const initial: FormData = {
  name: "",
  email: "",
  phone: "",
  services: [],
  targetRole: "",
  careerStage: "",
  country: "",
  challenge: "",
  investmentReady: "",
  additionalInfo: "",
  consent: false,
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-red-500">{msg}</p>;
}

export default function StartHere() {
  const [formData, setFormData] = useState<FormData>(initial);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!resume) {
      e.resume = "Please upload your resume before submitting.";
    }
    if (!formData.phone.trim()) e.phone = "Phone number is required.";
    if (formData.services.length === 0)
      e.services = "Please select at least one service.";
    if (!formData.targetRole.trim()) e.targetRole = "Job title is required.";
    if (!formData.careerStage)
      e.careerStage = "Please select your career stage.";
    if (!formData.country.trim()) e.country = "Country is required.";
    if (!formData.challenge.trim())
      e.challenge = "Please describe your career challenge.";
    if (!formData.investmentReady)
      e.investmentReady = "Please select an option.";
    if (!formData.consent) e.consent = "You must agree to be contacted.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // const doSubmit = async () => {
  //   setSubmitting(true);
  //   setSubmitError("");
  //   try {
  //     const fd = new FormData();
  //     fd.append("name", formData.name);
  //     fd.append("email", formData.email);
  //     fd.append("phone", formData.phone);
  //     fd.append("services", formData.services.join(", "));
  //     fd.append("targetRole", formData.targetRole);
  //     fd.append("careerStage", formData.careerStage);
  //     fd.append("country", formData.country);
  //     fd.append("challenge", formData.challenge);
  //     fd.append("investmentReady", formData.investmentReady);
  //     fd.append("additionalInfo", formData.additionalInfo);
  //     fd.append("_hp", honeypot);
  //     if (resume) fd.append("resume", resume);

  //     const res = await fetch("/api/submit", { method: "POST", body: fd });
  //     if (!res.ok) throw new Error("Submission failed");

  //     // Web3Forms notification is sent server-side in /api/submit
  //     window.location.href = BOOKING_URL;
  //   } catch {
  //     setSubmitError(
  //       "Something went wrong. Please try again or email us directly at Katefasanella12@gmail.com",
  //     );
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const doSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");

    try {
      // First: save the submission and upload the resume to Supabase.
      const fd = new FormData();

      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("services", formData.services.join(", "));
      fd.append("targetRole", formData.targetRole);
      fd.append("careerStage", formData.careerStage);
      fd.append("country", formData.country);
      fd.append("challenge", formData.challenge);
      fd.append("investmentReady", formData.investmentReady);
      fd.append("additionalInfo", formData.additionalInfo);
      fd.append("_hp", honeypot);

      if (resume) {
        fd.append("resume", resume);
      }

      const submissionResponse = await fetch("/api/submit", {
        method: "POST",
        body: fd,
      });

      const submissionResult = await submissionResponse
        .json()
        .catch(() => ({}));

      if (!submissionResponse.ok) {
        throw new Error(
          submissionResult.error ||
            "We could not save your submission. Please try again.",
        );
      }

      window.location.href = BOOKING_URL;
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email us directly at kathyfasanella12@gmail.com",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (event: { preventDefault(): void }) => {
    event.preventDefault();
    if (!validate()) return;
    if (!termsAccepted) {
      setPendingSubmit(true);
      setShowTerms(true);
      return;
    }
    doSubmit();
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
    if (pendingSubmit) {
      setPendingSubmit(false);
      doSubmit();
    }
  };

  const closeTerms = () => {
    setShowTerms(false);
    setPendingSubmit(false);
  };

  return (
    <>
      <section
        id="start"
        className="scroll-mt-20 overflow-hidden bg-[#F4F8FF] py-14 sm:py-20 lg:py-28 xl:py-32"
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 items-start gap-10 md:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-20 2xl:gap-24">
            {/* Introduction */}
            <div className="min-w-0 lg:sticky lg:top-24">
              <SectionLabel align="left">Start Here</SectionLabel>

              <h2 className="mb-5 mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#061B55] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                Let&apos;s understand your career goal before recommending a
                service.
              </h2>

              <p className="mb-8 max-w-2xl text-base leading-7 text-[#475569] sm:text-lg sm:leading-8 lg:mb-10 lg:text-xl">
                Tell us where you are in your career, what you want to achieve,
                and the support you need. We&apos;ll use these details to help
                guide your next step.
              </p>

              <div className="space-y-5 lg:space-y-6">
                {bookingSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0866E8] text-sm font-bold text-white sm:h-10 sm:w-10">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm font-medium leading-6 text-[#061B55] sm:text-base sm:leading-7">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#DCEBFF] bg-[#F4F8FF] p-4 sm:p-5">
                <p className="text-sm font-bold text-[#061B55]">
                  Consultation commitment fee: $50
                </p>
                <p className="mt-1 text-[18px] leading-6 text-[#475569]">
                  The fee is credited toward your package if you proceed,
                  refunded if you attend but decide not to continue, and subject
                  to the cancellation policy.
                </p>
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="mt-3 text-sm font-bold text-[#0866E8] underline underline-offset-4 hover:text-[#0B3D91]"
                >
                  Read Terms &amp; Services
                </button>
              </div>
            </div>

            {/* Form panel */}
            <div className="min-w-0 rounded-2xl border border-[#DCEBFF] bg-white p-4 shadow-sm sm:p-7 md:p-8 lg:p-8 xl:p-10 2xl:p-12">
              {/* ── Form ── */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6 sm:space-y-7"
              >
                {/* Honeypot — hidden from humans, bots will fill it */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="_hp">Website</label>
                  <input
                    id="_hp"
                    name="_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="rounded-xl border border-[#DCEBFF] bg-[#F4F8FF] p-4">
                  <p className="text-[18px] leading-6 text-[#061B55]">
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
                    className={errors.name ? errInput : okInput}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setField("name", e.target.value)}
                  />
                  <FieldError msg={errors.name} />
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
                    className={errors.email ? errInput : okInput}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                  <FieldError msg={errors.email} />
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
                    className={errors.phone ? errInput : okInput}
                    placeholder="Include your country code"
                    value={formData.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                  />
                  <FieldError msg={errors.phone} />
                </div>

                {/* 4. Resume */}
                <div>
                  <label htmlFor="resume" className={labelClass}>
                    4. Upload your current resume *
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className={`${resumeError ? errInput : okInput} file:mr-3 file:rounded-md file:border-0 file:bg-[#E0F2FE] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#0E1C49]`}
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      if (file && file.size > 5 * 1024 * 1024) {
                        setResumeError(
                          "File is too large. Maximum size is 5 MB.",
                        );
                        setResume(null);
                        e.target.value = "";
                        return;
                      }
                      setResumeError("");
                      setResume(file);
                      setErrors((prev) => ({ ...prev, resume: undefined }));
                    }}
                  />
                  {(resumeError || errors.resume) && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {resumeError || errors.resume}
                    </p>
                  )}
                  <p className="mt-2 text-xs leading-5 text-[#64748B]">
                    PDF or Word document, max 5 MB. Avoid uploading documents
                    containing information you do not wish to share.
                  </p>
                  {resumeError && (
                    <p className="mt-1.5 text-xs text-red-500">{resumeError}</p>
                  )}
                  {resume && !resumeError && (
                    <p className="mt-2 break-all text-sm font-medium text-[#0369A1]">
                      Selected: {resume.name}
                    </p>
                  )}
                </div>

                {/* 5. Services */}
                <fieldset>
                  <legend className={labelClass}>
                    5. What services are you interested in? * (select all that
                    apply)
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {services.map((service) => {
                      const checked = formData.services.includes(service);
                      return (
                        <label
                          key={service}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                            checked
                              ? "border-[#0866E8] bg-[#F4F8FF] text-[#061B55]"
                              : errors.services
                                ? "border-red-300 bg-white text-[#475569] hover:border-[#0866E8]"
                                : "border-[#DCEBFF] bg-white text-[#475569] hover:border-[#0866E8]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={service}
                            checked={checked}
                            onChange={() => {
                              const next = checked
                                ? formData.services.filter((s) => s !== service)
                                : [...formData.services, service];
                              setField("services", next);
                            }}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#0866E8]"
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                  <FieldError msg={errors.services} />
                </fieldset>

                {/* 6. Target role */}
                <div>
                  <label htmlFor="targetRole" className={labelClass}>
                    6. Current or target job title *
                  </label>
                  <input
                    id="targetRole"
                    name="targetRole"
                    className={errors.targetRole ? errInput : okInput}
                    placeholder="e.g. Product Manager, Finance Director"
                    value={formData.targetRole}
                    onChange={(e) => setField("targetRole", e.target.value)}
                  />
                  <FieldError msg={errors.targetRole} />
                </div>

                {/* 7. Career stage */}
                <div>
                  <label htmlFor="careerStage" className={labelClass}>
                    7. Where are you in your career journey? *
                  </label>
                  <select
                    id="careerStage"
                    name="careerStage"
                    className={errors.careerStage ? errInput : okInput}
                    value={formData.careerStage}
                    onChange={(e) => setField("careerStage", e.target.value)}
                  >
                    <option value="">Select your current situation</option>
                    {careerStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                  <FieldError msg={errors.careerStage} />
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
                    className={errors.country ? errInput : okInput}
                    placeholder="Your country of residence"
                    value={formData.country}
                    onChange={(e) => setField("country", e.target.value)}
                  />
                  <FieldError msg={errors.country} />
                </div>

                {/* 9. Career challenge */}
                <div>
                  <label htmlFor="challenge" className={labelClass}>
                    9. What is your biggest career challenge? *
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={4}
                    className={`${errors.challenge ? errInput : okInput} resize-y`}
                    placeholder="Tell us what you're finding difficult or what you'd like to improve."
                    value={formData.challenge}
                    onChange={(e) => setField("challenge", e.target.value)}
                  />
                  <FieldError msg={errors.challenge} />
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
                            ? "border-[#0866E8] bg-[#F4F8FF] text-[#061B55]"
                            : errors.investmentReady
                              ? "border-red-300 text-[#475569] hover:border-[#0866E8]"
                              : "border-[#DCEBFF] text-[#475569] hover:border-[#0866E8]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="investmentReady"
                          value={option}
                          checked={formData.investmentReady === option}
                          onChange={() => setField("investmentReady", option)}
                          className="mt-1 h-4 w-4 shrink-0 accent-[#0866E8]"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  <FieldError msg={errors.investmentReady} />
                </fieldset>

                {/* Additional info */}
                <div>
                  <label htmlFor="additionalInfo" className={labelClass}>
                    Anything else we should know? (Optional)
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={3}
                    className={`${okInput} resize-y`}
                    placeholder="Additional context or questions"
                    value={formData.additionalInfo}
                    onChange={(e) => setField("additionalInfo", e.target.value)}
                  />
                </div>

                {/* Consent */}
                <div
                  className={`rounded-xl p-4 ${
                    errors.consent
                      ? "bg-red-50 ring-1 ring-red-300"
                      : "bg-[#F4F8FF]"
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#0866E8]"
                    />
                    <span className="text-sm leading-6 text-[#475569]">
                      I agree that MyHireRoads may use these details to respond
                      to my inquiry. *
                    </span>
                  </label>
                  <FieldError msg={errors.consent} />
                </div>

                {/* Terms status */}
                <div className="rounded-xl border border-[#DCEBFF] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#061B55]">
                        Terms &amp; Services
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#475569]">
                        {termsAccepted
                          ? "You've accepted the terms."
                          : "Review and accept the terms before submitting."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="self-start text-sm font-bold text-[#0866E8] underline underline-offset-4 hover:text-[#0B3D91] sm:self-auto"
                    >
                      {termsAccepted ? "Review terms" : "Read terms"}
                    </button>
                  </div>
                </div>

                {/* Submit error */}
                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={submitting}
                >
                  {submitting ? "Submitting…" : "Review Terms & Submit →"}
                </Button>
              </form>
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
