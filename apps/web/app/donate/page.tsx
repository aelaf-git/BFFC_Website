"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Heart, RefreshCw, ShieldCheck, Users, BookOpen,
  ArrowRight, CheckCircle2, ArrowLeft,
} from "lucide-react";
import { CheckoutForm } from "@/components/donate/checkout-form";
import { PageHero } from "@/components/ui/page-hero";
import { createPaymentIntent } from "@/lib/api/donations";
import { btnAccent, btnPrimaryLg } from "@/lib/button-styles";
import { siteConfig } from "@/lib/site";

const donateLabelClass =
  "mb-2 block text-sm font-semibold uppercase tracking-wide text-zinc-600 sm:text-base";
const donateFieldClass =
  "w-full rounded-xl border-2 border-zinc-200 bg-white px-5 py-4 text-base text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-lg sm:py-4";

const ONE_TIME_AMOUNTS = [10, 25, 50, 100, 250, 500];
const MONTHLY_AMOUNTS  = [10, 20, 35, 50, 100, 200];

const impactMap: Record<number, string> = {
  10:  "feeds one child for a week",
  20:  "feeds one child for two weeks",
  25:  "provides a full month of breakfasts",
  35:  "covers school supplies for one child",
  50:  "feeds two children for a month",
  100: "feeds a family of four for a month",
  200: "sponsors a child for a semester",
  250: "provides meals for a classroom for a week",
  500: "sponsors a child for a full semester",
};

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Registered Canadian Charity",
    body: `CRA Reg. No. ${siteConfig.contact.charityRegistration}. Every donation is tax-receiptable.`,
  },
  {
    icon: Users,
    title: "100% to Programs",
    body: "Administrative costs are covered separately so your gift goes directly to children.",
  },
  {
    icon: BookOpen,
    title: "Full Transparency",
    body: "Annual reports and financial statements are published so you can see every dollar.",
  },
];

// ── Types ──────────────────────────────────────────────────────────────────────

type Step = "form" | "payment" | "success";

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DonatePage() {
  // Step 1 state
  const [mode, setMode]       = useState<"one-time" | "monthly">("one-time");
  const [selected, setSelected] = useState<number>(50);
  const [custom, setCustom]   = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");

  // Navigation
  const [step, setStep]                 = useState<Step>("form");
  const [isCreatingIntent, setCreating] = useState(false);
  const [intentError, setIntentError]   = useState<string | null>(null);

  // Stripe state (set when we move to step 2)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret]   = useState<string>("");

  const amounts        = mode === "one-time" ? ONE_TIME_AMOUNTS : MONTHLY_AMOUNTS;
  const effectiveAmount = custom ? Number(custom) : selected;
  const impactText     = impactMap[effectiveAmount];

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleModeChange = (m: "one-time" | "monthly") => {
    setMode(m);
    setSelected(m === "one-time" ? 50 : 20);
    setCustom("");
  };

  const handleContinue = useCallback(async () => {
    if (!email || !firstName || !lastName) {
      setIntentError("Please fill in your name and email before continuing.");
      return;
    }
    if (effectiveAmount < 1) {
      setIntentError("Please enter a valid donation amount.");
      return;
    }

    setCreating(true);
    setIntentError(null);

    try {
      const response = await createPaymentIntent({
        amountCents: effectiveAmount * 100,
        currency:    "usd",
        donorEmail:  email,
        donorName:   `${firstName} ${lastName}`.trim(),
        mode,
        phoneNumber: phone || undefined,
      });

      setClientSecret(response.clientSecret);
      setStripePromise(loadStripe(response.publishableKey));
      setStep("payment");
    } catch (err) {
      setIntentError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setCreating(false);
    }
  }, [effectiveAmount, email, firstName, lastName, mode, phone]);

  // ── Sidebar (shared between steps) ──────────────────────────────────────────

  const Sidebar = (
    <aside className="space-y-8">
      {/* Summary */}
      <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-7">
        <h2 className="font-serif text-xl font-medium text-zinc-900">Your Gift</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Amount</span>
            <span className="font-semibold text-zinc-800">
              ${effectiveAmount || "0"}{mode === "monthly" ? " / mo" : ""}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Type</span>
            <span className="font-semibold text-zinc-800">
              {mode === "monthly" ? "Monthly recurring" : "One-time"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Tax receipt</span>
            <span className="font-semibold text-zinc-800">Yes, by email</span>
          </div>
          <div className="border-t border-zinc-200 pt-3 flex items-center justify-between">
            <span className="font-semibold text-zinc-700">Total today</span>
            <span className="font-bold text-lg text-primary">${effectiveAmount || "0"}</span>
          </div>
        </div>
      </div>

      {/* Trust points */}
      <div className="space-y-4">
        {trustPoints.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4 rounded-2xl border border-zinc-100 bg-white p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-4 w-4 text-primary" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">{title}</p>
              <p className="mt-0.5 text-xs font-light leading-relaxed text-zinc-500">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 bg-white">
      <PageHero
        imageSrc="/whatwedo.jpeg"
        imageAlt="Children in Ethiopia"
        kicker="Make a Difference"
        title="Donate Today"
        subtitle="Every gift, whether large or small, feeds a hungry child and funds a brighter future."
      />

      {/* Content */}
      <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">

          {/* ── STEP 1: Donor form ── */}
          {step === "form" && (
            <div className="rounded-3xl border-2 border-zinc-100 bg-zinc-50 p-6 sm:p-8 lg:p-10">
              {/* Mode toggle */}
              <div className="mb-10 inline-flex w-full max-w-md rounded-none border-2 border-zinc-200 bg-white p-1.5 sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleModeChange("one-time")}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-none px-6 py-3.5 text-base font-semibold transition-all duration-200 sm:flex-none sm:px-8 ${
                    mode === "one-time" ? "bg-primary text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <Heart className="h-4 w-4" aria-hidden /> Give Once
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("monthly")}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-none px-6 py-3.5 text-base font-semibold transition-all duration-200 sm:flex-none sm:px-8 ${
                    mode === "monthly" ? "bg-primary text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <RefreshCw className="h-4 w-4" aria-hidden /> Give Monthly
                </button>
              </div>

              <h2 className="font-serif text-2xl font-medium text-zinc-900 sm:text-3xl">Choose an amount</h2>

              {/* Amount grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelected(amt); setCustom(""); }}
                    className={`min-h-[3.75rem] rounded-none border-2 py-4 text-base font-semibold transition-all duration-200 sm:text-lg ${
                      selected === amt && !custom
                        ? "border-primary bg-primary text-white shadow-md"
                        : "border-zinc-200 bg-white text-zinc-800 hover:border-primary hover:text-primary"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mt-6">
                <label htmlFor="custom-amount" className={donateLabelClass}>
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg font-medium text-zinc-400">$</span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    step="1"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                    placeholder="Other amount"
                    className={`${donateFieldClass} pl-10`}
                  />
                </div>
              </div>

              {/* Impact callout */}
              {impactText && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border-2 border-primary/20 bg-primary/5 px-5 py-5 sm:px-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <p className="text-base leading-relaxed text-zinc-700 sm:text-lg">
                    <span className="font-semibold text-zinc-900">${effectiveAmount}</span>
                    {mode === "monthly" ? " per month " : " "}
                    {impactText}.
                  </p>
                </div>
              )}

              {/* Donor details */}
              <div className="mt-10 space-y-5">
                <h2 className="font-serif text-2xl font-medium text-zinc-900 sm:text-3xl">Your Details</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className={donateLabelClass}>First Name</label>
                    <input
                      id="first-name" type="text" autoComplete="given-name"
                      placeholder="Aisha" value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={donateFieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={donateLabelClass}>Last Name</label>
                    <input
                      id="last-name" type="text" autoComplete="family-name"
                      placeholder="Johnson" value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={donateFieldClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={donateLabelClass}>Email Address</label>
                  <input
                    id="email" type="email" autoComplete="email"
                    placeholder="you@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={donateFieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={donateLabelClass}>
                    Phone <span className="normal-case font-normal text-zinc-400">(optional)</span>
                  </label>
                  <input
                    id="phone" type="tel" autoComplete="tel"
                    placeholder="+1 (555) 000-0000" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={donateFieldClass}
                  />
                </div>
              </div>

              {/* Error */}
              {intentError && (
                <div className="mt-6 rounded-2xl border-2 border-red-200 bg-red-50 px-5 py-4 text-base text-red-700">
                  {intentError}
                </div>
              )}

              {/* CTA */}
              <div className="mt-10">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isCreatingIntent}
                  className={`w-full ${btnPrimaryLg} !py-5 !text-lg`}
                >
                  {isCreatingIntent ? (
                    <><RefreshCw className="h-4 w-4 animate-spin" aria-hidden /> Preparing payment…</>
                  ) : (
                    <>Continue to payment <ArrowRight className="h-4 w-4" aria-hidden /></>
                  )}
                </button>
                <p className="mt-4 text-center text-sm text-zinc-500 sm:text-base">
                  You will review your card details on the next step.
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 2: Stripe payment ── */}
          {step === "payment" && stripePromise && clientSecret && (
            <div className="rounded-3xl border-2 border-zinc-100 bg-zinc-50 p-6 sm:p-8 lg:p-10">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="mb-8 inline-flex items-center gap-2 text-base font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden /> Back
              </button>

              <div className="mb-8 rounded-2xl border-2 border-zinc-100 bg-white p-6">
                <p className="text-base text-zinc-700 sm:text-lg">
                  Donating <span className="font-semibold text-zinc-900">${effectiveAmount} USD</span>
                  {mode === "monthly" ? " per month" : " (one-time)"} as{" "}
                  <span className="font-semibold text-zinc-900">{firstName} {lastName}</span>
                </p>
              </div>

              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#f39120",
                      colorBackground: "#ffffff",
                      borderRadius: "12px",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSizeBase: "18px",
                      spacingUnit: "5px",
                    },
                  },
                }}
              >
                <CheckoutForm
                  amountDollars={effectiveAmount}
                  mode={mode}
                  onSuccess={() => setStep("success")}
                />
              </Elements>
            </div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-10 w-10 text-primary" aria-hidden />
              </div>
              <h2 className="mt-6 font-serif text-3xl font-medium text-zinc-900">
                Thank you, {firstName}!
              </h2>
              <p className="mt-3 max-w-md text-base font-light text-zinc-500">
                Your{" "}
                {mode === "monthly"
                  ? `$${effectiveAmount}/month donation has been set up`
                  : `$${effectiveAmount} donation was received`}
                . A tax receipt will be sent to{" "}
                <span className="font-medium text-zinc-700">{email}</span>.
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                CRA Charity Registration No. {siteConfig.contact.charityRegistration}
              </p>
              <Link
                href="/"
                className={btnAccent}
              >
                Return to home
              </Link>
            </div>
          )}

          {Sidebar}
        </div>
      </div>
    </div>
  );
}
