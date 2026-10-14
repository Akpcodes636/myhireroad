
'use client';

import { useState } from 'react';
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import {
  serviceOptions,
  searchStageOptions as searchStages,
  investmentReadyOptions,
  bookingSteps,
} from '../../utils/content';

type FormData = {
  name: string;
  email: string;
  location: string;
  targetRole: string;
  searchStage: string;
  challenge: string;
  timeline: string;
  investmentReady: string;
  additionalInfo: string;
  consent: boolean;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  location: '',
  targetRole: '',
  searchStage: '',
  challenge: '',
  timeline: '',
  investmentReady: '',
  additionalInfo: '',
  consent: false,
};

const textFields: {
  label: string;
  key: keyof FormData;
  type: string;
  placeholder: string;
  number: number;
}[] = [
  {
    label: 'Your full name',
    key: 'name',
    type: 'text',
    placeholder: 'Full name',
    number: 2,
  },
  {
    label: 'Email address',
    key: 'email',
    type: 'email',
    placeholder: 'your@email.com',
    number: 3,
  },
  {
    label: 'Where are you currently based?',
    key: 'location',
    type: 'text',
    placeholder: 'City, State / Country',
    number: 4,
  },
  {
    label: 'What role or career direction are you targeting?',
    key: 'targetRole',
    type: 'text',
    placeholder: 'e.g. VP of Marketing, Career change to UX Design',
    number: 5,
  },
];

const labelClass =
  'mb-2 block text-xs font-semibold uppercase tracking-wider text-[#0F1430] sm:text-sm lg:text-base';

const fieldClass =
  'w-full min-w-0 border border-[#E8EEFE] bg-white px-4 py-3 text-sm text-[#0F1430] transition-colors placeholder:text-[#A1A2A4] focus:border-[#1450F5] focus:outline-none focus:ring-1 focus:ring-[#1450F5] sm:px-5 sm:py-3.5 sm:text-base lg:py-4 lg:text-lg';

const choiceBaseClass =
  'min-h-12 border px-3 py-3 text-left text-xs leading-relaxed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1450F5] focus-visible:ring-offset-2 sm:px-4 sm:py-3.5 sm:text-sm lg:min-h-14 lg:px-5 lg:text-base';

export default function StartHere() {
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Connect to CRM/backend before launch.
    setSubmitted(true);
  };

  const setField = (key: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section
      id="start"
      className="overflow-hidden bg-[#E8EEFE] py-14 sm:py-20 lg:py-28 xl:py-36"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 items-start gap-10 md:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-20 2xl:gap-24">
          {/* Left: Introduction and booking steps */}
          <div className="min-w-0 lg:sticky lg:top-24">
            <SectionLabel>Start Here</SectionLabel>

            <h2 className="mb-5 mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0F1430] sm:text-4xl md:text-5xl lg:mb-7 lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Let&apos;s understand your career goal before recommending a service.
            </h2>

            <p className="mb-8 max-w-2xl text-base leading-7 text-[#5F6061] sm:text-lg sm:leading-8 lg:mb-10 lg:text-xl lg:leading-9 xl:text-2xl">
              Choose the support you&apos;re interested in, tell us what
              you&apos;re working toward and share a few details. The next
              step is to review the service investment and continue to booking.
            </p>

            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              {bookingSteps.map((step, i) => (
                <div key={step} className="flex items-start gap-3 sm:gap-4 lg:gap-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#1450F5] sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                    <span className="text-sm font-bold text-white sm:text-base lg:text-lg">
                      {i + 1}
                    </span>
                  </div>

                  <p className="pt-1 text-sm font-medium leading-6 text-[#0F1430] sm:text-base sm:leading-7 lg:text-lg lg:leading-8 xl:text-xl">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Qualification form */}
          <div className="min-w-0 bg-white p-4 shadow-sm sm:p-7 md:p-8 lg:p-8 xl:p-10 2xl:p-12">
            {submitted ? (
              <div className="py-12 text-center sm:py-16 lg:py-20">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-[#1450F5] sm:h-20 sm:w-20">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#0F1430] sm:text-2xl lg:text-3xl">
                  Details received.
                </h3>

                <p className="mx-auto max-w-sm text-sm leading-6 text-[#5F6061] sm:text-base sm:leading-7 lg:text-lg">
                  This is a preview only. Connect this form to your CRM
                  platform before launch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 lg:space-y-8">
                <div className="border border-[#E8EEFE] bg-[#F7F8F9] p-3 sm:p-4 lg:p-5">
                  <p className="text-xs leading-5 text-[#77797D] sm:text-sm sm:leading-6 lg:text-base">
                    Preview only: submissions are not stored or sent. Connect
                    this form to the client&apos;s CRM platform before launch.
                  </p>
                </div>

                {/* 1. Service selection */}
                <fieldset>
                  <legend className={labelClass}>
                    1. Which service are you interested in? *
                  </legend>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        aria-pressed={selectedService === service}
                        onClick={() => setSelectedService(service)}
                        className={`${choiceBaseClass} ${
                          selectedService === service
                            ? 'border-[#1450F5] bg-[#1450F5] text-white'
                            : 'border-[#E8EEFE] bg-white text-[#0F1430] hover:border-[#1450F5]'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* 2–5. Text fields */}
                {textFields.map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className={labelClass}>
                      {field.number}. {field.label} *
                    </label>

                    <input
                      id={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={
                        field.key === 'name'
                          ? 'name'
                          : field.key === 'email'
                            ? 'email'
                            : 'off'
                      }
                      required
                      className={fieldClass}
                      value={formData[field.key] as string}
                      onChange={(e) => setField(field.key, e.target.value)}
                    />
                  </div>
                ))}

                {/* 6. Search stage */}
                <div>
                  <label htmlFor="searchStage" className={labelClass}>
                    6. Where are you in your job search? *
                  </label>

                  <select
                    id="searchStage"
                    required
                    className={fieldClass}
                    value={formData.searchStage}
                    onChange={(e) => setField('searchStage', e.target.value)}
                  >
                    <option value="">Select one</option>
                    {searchStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 7. Challenge */}
                <div>
                  <label htmlFor="challenge" className={labelClass}>
                    7. What is your biggest career challenge right now? *
                  </label>

                  <textarea
                    id="challenge"
                    required
                    rows={4}
                    className={`${fieldClass} resize-y`}
                    value={formData.challenge}
                    onChange={(e) => setField('challenge', e.target.value)}
                  />
                </div>

                {/* 8. Timeline */}
                <div>
                  <label htmlFor="timeline" className={labelClass}>
                    8. When would you like to get started? *
                  </label>

                  <input
                    id="timeline"
                    type="text"
                    placeholder="e.g. As soon as possible / Within the next month"
                    required
                    className={fieldClass}
                    value={formData.timeline}
                    onChange={(e) => setField('timeline', e.target.value)}
                  />
                </div>

                {/* 9. Investment readiness */}
                <fieldset>
                  <legend className={labelClass}>
                    9. Once you review the price, are you prepared to make this investment? *
                  </legend>

                  <p className="mb-3 text-xs leading-5 text-[#77797D] sm:text-sm sm:leading-6 lg:text-base">
                    The exact price must be displayed before you confirm a commitment.
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {investmentReadyOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={formData.investmentReady === option}
                        onClick={() => setField('investmentReady', option)}
                        className={`min-h-11 border px-4 py-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1450F5] focus-visible:ring-offset-2 sm:text-sm lg:min-h-12 lg:px-5 lg:text-base ${
                          formData.investmentReady === option
                            ? 'border-[#1450F5] bg-[#1450F5] text-white'
                            : 'border-[#E8EEFE] bg-white text-[#0F1430] hover:border-[#1450F5]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* 10. Additional information */}
                <div>
                  <label htmlFor="additionalInfo" className={labelClass}>
                    10. Anything else we should know? (Optional)
                  </label>

                  <textarea
                    id="additionalInfo"
                    rows={3}
                    className={`${fieldClass} resize-y`}
                    value={formData.additionalInfo}
                    onChange={(e) => setField('additionalInfo', e.target.value)}
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-[#1450F5] sm:h-5 sm:w-5"
                    checked={formData.consent}
                    onChange={(e) => setField('consent', e.target.checked)}
                  />

                  <label
                    htmlFor="consent"
                    className="cursor-pointer text-xs leading-5 text-[#5F6061] sm:text-sm sm:leading-6 lg:text-base lg:leading-7"
                  >
                    I agree that My Hire Roads may use these details to respond
                    to my enquiry. *
                  </label>
                </div>

                <div className="pt-1">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    Submit Qualification Details →
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
