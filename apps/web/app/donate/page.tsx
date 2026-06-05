"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Heart, RefreshCw, ShieldCheck, Users, BookOpen,
  Utensils, ArrowRight, CheckCircle2, ArrowLeft,
} from "lucide-react";
import { CheckoutForm } from "@/components/donate/checkout-form";
import { createPaymentIntent } from "@/lib/api/donations";
import { siteConfig } from "@/lib/site";

// ── Static data ────────────────────────────────────────────────────────────────

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

const breakdownItems = [
  { label: "School Meals & Nutrition", pct: 72, color: "bg-primary" },
  { label: "School Supplies",          pct: 14, color: "bg-amber-400" },
  { label: "Community Programs",       pct: 9,  color: "bg-sky-400" },
  { label: "Administration",           pct: 5,  color: "bg-zinc-300" },
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
        currency:    "cad",
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
              ${effectiveAmount || "—"}{mode === "monthly" ? " / mo" : ""}
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
            <span className="font-semibold text-zinc-800">Yes — by email</span>
          </div>
          <div className="border-t border-zinc-200 pt-3 flex items-center justify-between">
            <span className="font-semibold text-zinc-700">Total today</span>
            <span className="font-bold text-lg text-primary">${effectiveAmount || "—"}</span>
          </div>
        </div>
      </div>

      {/* Where it goes */}
      <div className="rounded-3xl border border-zinc-100 bg-white p-7">
        <h2 className="font-serif text-xl font-medium text-zinc-900">Where It Goes</h2>
        <div className="mt-5 space-y-4">
          {breakdownItems.map((item) => (
            <div key={item.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-600">{item.label}</span>
                <span className="font-semibold text-zinc-800">{item.pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/resources"
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:opacity-75 transition-opacity"
        >
          View full financial report <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>

      {/* Impact numbers */}
      <div className="rounded-3xl bg-zinc-900 p-7 text-white">
        <h2 className="font-serif text-xl font-medium">Our Impact</h2>
        <div className="mt-5 grid grid-cols-2 gap-5">
          {[
            { icon: Utensils, stat: "12,000+", label: "meals served" },
            { icon: Users,    stat: "3,200+",  label: "children reached" },
            { icon: BookOpen, stat: "48",       label: "schools supported" },
            { icon: Heart,    stat: "3",        label: "regions served" },
          ].map(({ icon: Icon, stat, label }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              <p className="text-2xl font-bold text-white">{stat}</p>
              <p className="text-xs font-light text-white/60">{label}</p>
            </div>
          ))}
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
      {/* Hero */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 sm:h-80">
        <Image
          src="/mission-background.png"
          alt="Children in Ethiopia"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Make a Difference
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Donate Today
          </h1>
          <p className="mt-4 max-w-xl text-base font-light text-white/75">
            Every gift — large or small — feeds a hungry child and funds a brighter future.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_380px]">

          {/* ── STEP 1: Donor form ── */}
          {step === "form" && (
            <div>
              {/* Mode toggle */}
              <div className="mb-8 inline-flex rounded-full border border-zinc-200 bg-zinc-50 p-1">
                <button
                  type="button"
                  onClick={() => handleModeChange("one-time")}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    mode === "one-time" ? "bg-primary text-white shadow-sm" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  <Heart className="h-3.5 w-3.5" aria-hidden /> Give Once
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("monthly")}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    mode === "monthly" ? "bg-primary text-white shadow-sm" : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden /> Give Monthly
                </button>
              </div>

              {/* Amount grid */}
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelected(amt); setCustom(""); }}
                    className={`rounded-2xl border py-4 text-sm font-semibold transition-all duration-200 ${
                      selected === amt && !custom
                        ? "border-primary bg-primary text-white shadow-md"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-primary hover:text-primary"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mt-4">
                <label htmlFor="custom-amount" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-medium text-zinc-400">$</span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    step="1"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                    placeholder="Other amount"
                    className="w-full rounded-2xl border border-zinc-200 py-3.5 pl-8 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Impact callout */}
              {impactText && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <p className="text-sm text-zinc-700">
                    <span className="font-semibold text-zinc-900">${effectiveAmount}</span>
                    {mode === "monthly" ? " per month " : " "}
                    {impactText}.
                  </p>
                </div>
              )}

              {/* Donor details */}
              <div className="mt-8 space-y-4">
                <h2 className="font-serif text-xl font-medium text-zinc-900">Your Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">First Name</label>
                    <input
                      id="first-name" type="text" autoComplete="given-name"
                      placeholder="Aisha" value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">Last Name</label>
                    <input
                      id="last-name" type="text" autoComplete="family-name"
                      placeholder="Johnson" value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">Email Address</label>
                  <input
                    id="email" type="email" autoComplete="email"
                    placeholder="you@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Phone <span className="normal-case font-normal text-zinc-400">(optional)</span>
                  </label>
                  <input
                    id="phone" type="tel" autoComplete="tel"
                    placeholder="+1 (555) 000-0000" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Error */}
              {intentError && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
                  {intentError}
                </div>
              )}

              {/* CTA */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isCreatingIntent}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCreatingIntent ? (
                    <><RefreshCw className="h-4 w-4 animate-spin" aria-hidden /> Preparing payment…</>
                  ) : (
                    <>Continue to payment <ArrowRight className="h-4 w-4" aria-hidden /></>
                  )}
                </button>
                <p className="mt-3 text-center text-xs font-light text-zinc-400">
                  You will review your card details on the next step.
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 2: Stripe payment ── */}
          {step === "payment" && stripePromise && clientSecret && (
            <div>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back
              </button>

              <div className="mb-6 rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                <p className="text-sm text-zinc-600">
                  Donating <span className="font-semibold text-zinc-900">${effectiveAmount} CAD</span>
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
                      colorPrimary: "#e05b2c",
                      colorBackground: "#ffffff",
                      borderRadius: "16px",
                      fontFamily: "'Inter', system-ui, sans-serif",
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
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
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
