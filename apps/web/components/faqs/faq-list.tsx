"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What does Bright Future For Children Ethiopia do?",
    answer:
      "We are a Canadian registered charity dedicated to providing one nutritious meal a day to children aged 2–8 in war-affected regions of Ethiopia — primarily Afar, Tigray, and Amhara. We also distribute school supplies to support children's education and partner with local communities to build sustainable feeding programs.",
  },
  {
    question: "Where exactly do you operate in Ethiopia?",
    answer:
      "Our programs currently serve children in the Afar and Amhara regional states, with plans to expand to Tigray. We work directly with local schools, kindergartens, and community leaders to identify and support the most vulnerable children in each area.",
  },
  {
    question: "How is my donation used?",
    answer:
      "Approximately 82% of every dollar donated goes directly to program delivery — meals, school supplies, and community support. The remaining 18% covers administration (11%) and fundraising costs (7%). We publish a full financial breakdown in our annual report, available on our Resources page.",
  },
  {
    question: "Is Bright Future For Children Ethiopia a registered charity?",
    answer:
      "Yes. We are a registered Canadian charity with registration number 726794944RR0001. All donations made by Canadian residents are eligible for a charitable tax receipt.",
  },
  {
    question: "How do I get a tax receipt?",
    answer:
      "Canadian donors automatically receive a tax receipt by email after making a donation. If you have not received your receipt within 5 business days, please contact us at Info@brightfuture4children.com and we will resend it promptly.",
  },
  {
    question: "Can I sponsor a specific child?",
    answer:
      "Yes. Through our child sponsorship program, you can be matched with a specific child and receive updates on their progress. Your sponsorship covers meals, school supplies, and any additional support they need. Visit our Sponsor a Child page to learn more.",
  },
  {
    question: "How do I know my donation reaches the children?",
    answer:
      "We work directly with on-the-ground partners, local schools, and community authorities in Ethiopia. We conduct regular site visits, collect attendance and nutrition data, and publish detailed impact reports. Your donation is never pooled with general operating funds — it goes straight to the programs it is designated for.",
  },
  {
    question: "Can I donate in a currency other than Canadian dollars?",
    answer:
      "Currently our donation system processes payments in US dollars (USD). If you would like to discuss other arrangements, please reach out to us directly at Info@brightfuture4children.com.",
  },
  {
    question: "How can I get involved beyond donating?",
    answer:
      "There are many ways to support our mission: volunteer your skills (marketing, translation, logistics), fundraise on our behalf, spread the word on social media, or partner with us as a corporate sponsor. Contact us through our Get in Touch page to start the conversation.",
  },
  {
    question: "How do I cancel or change my monthly donation?",
    answer:
      "You can update or cancel your monthly giving at any time by contacting us at Info@brightfuture4children.com. We will process your request within 2 business days and confirm the change by email.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="font-serif text-lg font-medium text-zinc-900">{question}</span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-sm font-light leading-relaxed text-zinc-500">{answer}</p>
      </div>
    </div>
  );
}

export function FaqList() {
  return (
    <div className="divide-y divide-zinc-100 rounded-3xl border border-zinc-100 bg-zinc-50 px-8">
      {faqs.map((faq) => (
        <FaqItem key={faq.question} {...faq} />
      ))}
    </div>
  );
}
