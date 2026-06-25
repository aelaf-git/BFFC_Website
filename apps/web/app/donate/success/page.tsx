"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Heart, RefreshCw } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Landing page for Stripe's return_url after 3D Secure authentication.
 * Stripe appends ?payment_intent=pi_...&payment_intent_client_secret=...
 * &redirect_status=succeeded|failed|processing
 *
 * We read those params, verify the outcome, and show the appropriate message.
 */
function SuccessContent() {
  const params        = useSearchParams();
  const amount        = params.get("amount") ?? "?";
  const mode          = params.get("mode") ?? "one-time";
  const redirectStatus = params.get("redirect_status");
  const clientSecret  = params.get("payment_intent_client_secret");
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

  const [status, setStatus] = useState<"loading" | "succeeded" | "processing" | "failed">(
    clientSecret ? "loading" : "succeeded",
  );

  useEffect(() => {
    if (!clientSecret || !publishableKey) {
      setStatus(redirectStatus === "succeeded" ? "succeeded" : redirectStatus === "processing" ? "processing" : "failed");
      return;
    }

    loadStripe(publishableKey).then(async (stripe) => {
      if (!stripe) { setStatus("failed"); return; }

      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      switch (paymentIntent?.status) {
        case "succeeded":           setStatus("succeeded");   break;
        case "processing":          setStatus("processing");  break;
        case "requires_payment_method":
        default:                    setStatus("failed");      break;
      }
    });
  }, [clientSecret, publishableKey, redirectStatus]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <RefreshCw className="h-10 w-10 animate-spin text-primary" />
        <p className="text-zinc-500">Confirming your payment…</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <span className="text-4xl">✕</span>
        </div>
        <h1 className="mt-6 font-serif text-3xl font-medium text-zinc-900">Payment not completed</h1>
        <p className="mt-3 max-w-md text-base font-light text-zinc-500">
          Your card was not charged. Please try again or use a different payment method.
        </p>
        <Link
          href="/donate"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
        >
          Try again
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Heart className="h-10 w-10 text-primary" aria-hidden />
      </div>
      <h1 className="mt-6 font-serif text-4xl font-medium text-zinc-900">
        {status === "processing" ? "Payment processing" : "Thank you!"}
      </h1>
      <p className="mt-3 max-w-md text-base font-light text-zinc-500">
        {status === "processing"
          ? "Your payment is being processed. We will email you a receipt once it clears."
          : <>
              Your{" "}
              {mode === "monthly"
                ? `$${amount}/month donation has been set up`
                : `$${amount} donation was received`}
              . An official tax receipt is on its way to your inbox.
            </>
        }
      </p>
      <p className="mt-2 text-sm text-zinc-400">
        CRA Charity Registration No. {siteConfig.contact.charityRegistration}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
      >
        Return to home
      </Link>
    </div>
  );
}

export default function DonateSuccessPage() {
  return (
    <div className="flex-1 bg-white">
      <div className="container mx-auto max-w-2xl px-6 py-16">
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
