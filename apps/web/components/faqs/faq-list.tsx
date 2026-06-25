"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faqs";

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
        <span className="font-serif text-xl font-medium text-zinc-900 sm:text-2xl">{question}</span>
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
    <div className="divide-y divide-zinc-100 rounded-3xl border border-zinc-100 bg-accent-light px-8">
      {faqs.map((faq) => (
        <FaqItem key={faq.question} {...faq} />
      ))}
    </div>
  );
}
