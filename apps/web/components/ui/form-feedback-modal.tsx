"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { btnPrimary } from "@/lib/button-styles";

export type FormFeedbackVariant = "success" | "error";

export type FormFeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  variant: FormFeedbackVariant;
  title: string;
  message: string;
};

export function FormFeedbackModal({
  open,
  onClose,
  variant,
  title,
  message,
}: FormFeedbackModalProps) {
  const titleId = useId();
  const messageId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isSuccess = variant === "success";

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-accent-deep/60 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={messageId}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-zinc-100 bg-white p-8 shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={[
              "flex h-16 w-16 items-center justify-center rounded-full",
              isSuccess ? "bg-primary/10 text-primary" : "bg-red-50 text-red-600",
            ].join(" ")}
          >
            {isSuccess ? (
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            ) : (
              <AlertCircle className="h-8 w-8" aria-hidden />
            )}
          </div>

          <h2
            id={titleId}
            className="mt-5 font-serif text-2xl font-medium tracking-tight text-zinc-900"
          >
            {title}
          </h2>

          <p id={messageId} className="mt-3 text-sm leading-relaxed font-light text-zinc-500">
            {message}
          </p>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={`mt-8 w-full sm:w-auto ${btnPrimary}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

type ModalState = {
  open: boolean;
  variant: FormFeedbackVariant;
  title: string;
  message: string;
};

const initialModalState: ModalState = {
  open: false,
  variant: "success",
  title: "",
  message: "",
};

export function useFormFeedbackModal() {
  const [state, setState] = useState<ModalState>(initialModalState);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const showSuccess = useCallback((title: string, message: string) => {
    setState({ open: true, variant: "success", title, message });
  }, []);

  const showError = useCallback((title: string, message: string) => {
    setState({ open: true, variant: "error", title, message });
  }, []);

  return {
    modalProps: {
      open: state.open,
      onClose: close,
      variant: state.variant,
      title: state.title,
      message: state.message,
    } satisfies FormFeedbackModalProps,
    showSuccess,
    showError,
    close,
  };
}
