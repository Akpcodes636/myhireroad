"use client";

import { useState } from "react";
import ModalLayout from "./ModalLayout";

type TermsModalProps = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
};

export default function TermsModal({ open, onClose, onAccept }: TermsModalProps) {
  const [accepted, setAccepted] = useState(false);

  const servicePrices = [
    { name: "Resume Writing", price: "$250–$550" },
    { name: "LinkedIn Optimization", price: "$450–$750" },
    { name: "Career Strategy Package", price: "$650–$1,000" },
  ];

  return (
    <ModalLayout
      isOpen={open}
      onClose={onClose}
      heading="Terms & Services"
      className="max-h-[90vh] flex flex-col overflow-hidden"
    >
      {/* Terms content */}
      <div className="px-5 py-6 sm:px-7">
        <p className="mb-6 text-sm leading-6 text-[#64748B]">
          MyHireRoads provides career development and professional positioning
          services to help clients present their experience, skills, and
          qualifications effectively. Please review the following terms before
          booking a consultation or engaging our services.
        </p>

        <div className="space-y-6 text-sm leading-6 text-[#475569]">
          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              1. Our Services
            </h3>
            <p>
              MyHireRoads offers career support services that may include resume
              writing, LinkedIn profile optimization, interview coaching,
              career transition support, professional positioning, and salary
              negotiation guidance.
            </p>
            <p className="mt-2">
              The scope, deliverables, timelines, and fees for each engagement
              will be communicated to the client before the service begins.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              2. Consultation Booking &amp; $50 Commitment Fee
            </h3>
            <p className="font-bold text-base">
              A $50 commitment fee may be required to secure a consultation or
              begin the agreed booking process. Where explicitly communicated as
              refundable, the fee will be handled according to the refund
              conditions explained to the client before payment.
            </p>
            <p className="mt-2 font-bold text-base">
              This fee is separate from the price of any career service unless
              otherwise agreed in writing. Clients should confirm the applicable
              payment and refund conditions before completing a transaction.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              3. Booking &amp; Client Acceptance
            </h3>
            <p>
              Submitting a consultation request does not automatically constitute
              acceptance of a client engagement. Bookings are subject to
              confirmation, availability, and agreement on the relevant service
              scope.
            </p>
            <p className="mt-2">
              By proceeding, you confirm that the information you provide is
              accurate to the best of your knowledge and that you have authority
              to share any documents or materials submitted for review.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              4. Pricing &amp; Payments
            </h3>
            <p>
              Service fees depend on the scope of work, level of customization,
              and agreed deliverables. The following are indicative price ranges
              and may vary based on the final service agreement:
            </p>
            <div className="mt-3 overflow-hidden rounded-xl border border-[#E0F2FE]">
              {servicePrices.map((service, index) => (
                <div
                  key={service.name}
                  className={`flex items-center justify-between gap-4 px-4 py-3 ${
                    index !== servicePrices.length - 1
                      ? "border-b border-[#E0F2FE]"
                      : ""
                  }`}
                >
                  <span className="font-medium text-[#334155]">
                    {service.name}
                  </span>
                  <span className="shrink-0 font-semibold text-[#0284C7]">
                    {service.price}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3">
              The applicable price, payment schedule, and any additional charges
              will be confirmed before work begins. Clients are responsible for
              making payments according to the agreed terms.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              5. Client Responsibilities
            </h3>
            <p>
              Clients are expected to provide accurate information, relevant
              career documents, feedback, and any materials reasonably required
              to complete the agreed work.
            </p>
            <p className="mt-2">
              MyHireRoads is not responsible for inaccuracies arising from
              false, incomplete, or misleading information supplied by a client.
              Clients should review all deliverables carefully before using them
              in applications or professional profiles.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              6. Revisions &amp; Delivery
            </h3>
            <p>
              Deliverables, delivery timelines, and the number of included
              revisions will be agreed upon before work begins. Requests outside
              the agreed scope may require additional time or fees.
            </p>
            <p className="mt-2">
              Delivery timelines may depend on the timely provision of
              information, client feedback, and other agreed requirements.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              7. Employment Outcomes
            </h3>
            <p>
              MyHireRoads provides professional guidance and career positioning
              support. We do not guarantee job offers, interviews, promotions,
              salary increases, visa approvals, or any other specific employment
              outcome.
            </p>
            <p className="mt-2">
              Hiring decisions are made by employers and other third parties.
              Outcomes depend on factors beyond our control, including market
              conditions, qualifications, and employer requirements.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-semibold text-[#0E1C49]">
              8. Contact Us
            </h3>
            <p>
              If you have questions about these terms, your booking, or an
              agreed service, please contact MyHireRoads through the official
              contact details provided on our website or in your booking
              confirmation.
            </p>
          </section>
        </div>

        {/* Acceptance */}
        <div className="mt-7 rounded-xl border border-[#DCEBFF] bg-[#F4F8FF] p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#0866E8] focus:ring-2 focus:ring-[#0866E8]"
            />
            <span className="text-sm leading-6 text-[#061B55]">
              I have read and agree to the MyHireRoads{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0866E8] underline underline-offset-4 hover:text-[#0B3D91]"
              >
                Terms &amp; Services
              </a>
              .
            </span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-[#E0F2FE] bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#CBD5E1] px-5 py-2.5 text-sm font-semibold text-[#475569] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!accepted}
          onClick={onAccept}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0E1C49] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#CBD5E1] disabled:text-[#64748B]"
        >
          I Agree &amp; Continue
        </button>
      </div>
    </ModalLayout>
  );
}
