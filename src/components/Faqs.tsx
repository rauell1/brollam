"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What exactly does your application do?",
    answer: "Our application provides a comprehensive suite of tools designed to streamline your workflow and improve productivity through automation and intuitive design."
  },
  {
    question: "How long does it take to see results?",
    answer: "Most users experience noticeable improvements within the first two weeks of full integration, with maximum ROI typically realized by month three."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, we provide 24/7 dedicated customer support via chat and email for all premium tiers, and standard business hour support for basic plans."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We employ industry-standard encryption, regular security audits, and strict access controls to ensure your data remains private and secure."
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can easily change your subscription plan at any time from your account settings. Prorated charges or credits will be applied automatically."
  }
];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold leading-10 tracking-tight text-foreground mb-10 text-center">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-6 divide-y divide-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="pt-6">
                <dt>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-start justify-between text-left text-foreground hover:text-accent focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75 rounded-sm"
                  >
                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg
                        className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? "rotate-180 text-accent" : "text-muted-foreground"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <div
                  className={`mt-2 pr-12 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <dd className="text-base leading-7 text-muted-foreground pb-4">
                    {faq.answer}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
