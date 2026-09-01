"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { RefreshCw, Heart, Lock } from "lucide-react";
import { btnPrimaryLg } from "@/lib/button-styles";

interface CheckoutFormProps {
  amountDollars: number;
  mode: "one-time" | "monthly";
  onSuccess: () => void;
  onError: (message: string) => void;
}

/**
 * Rendered inside an <Elements> provider that has already been initialised
 * with the clientSecret from the backend.
 * Stripe's <PaymentElement> handles card / wallet / bank — all PCI-compliant.
 */
export function CheckoutForm({ amountDollars, mode, onSuccess, onError }: CheckoutFormProps) {
  const stripe   = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    // Validate the PaymentElement before confirming.
    const { error: submitError } = await elements.submit();
    if (submitError) {
      onError(submitError.message ?? "Please check your payment details.");
      setIsLoading(false);
      return;
    }

    // confirmPayment sends the card details directly to Stripe — they never
    // pass through your server.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe redirects here after 3DS authentication.
        // The ?success=true query param lets the success page know why it's showing.
        return_url: `${window.location.origin}/donate/success?amount=${amountDollars}&mode=${mode}`,
      },
      // Don't redirect if the payment confirms immediately (no 3DS needed).
      redirect: "if_required",
    });

    if (error) {
      onError(error.message ?? "Payment failed. Please try again.");
      setIsLoading(false);
    } else {
      // Payment confirmed without redirect — show success inline.
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="min-h-[220px] rounded-2xl border-2 border-zinc-100 bg-white p-5 sm:p-6">
        <PaymentElement
          options={{
            layout: "tabs",
            wallets: { applePay: "auto", googlePay: "auto" },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className={`w-full ${btnPrimaryLg} !py-5 !text-lg`}
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" aria-hidden />
            Processing…
          </>
        ) : mode === "monthly" ? (
          <>
            <RefreshCw className="h-4 w-4" aria-hidden />
            Give ${amountDollars} per month
          </>
        ) : (
          <>
            <Heart className="h-4 w-4" aria-hidden />
            Donate ${amountDollars} now
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-2 text-sm text-zinc-500 sm:text-base">
        <Lock className="h-4 w-4 shrink-0" aria-hidden />
        Secured by Stripe · 256-bit SSL · Official tax receipt by email
      </p>
    </form>
  );
}
