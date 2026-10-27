"use client";

import { useId, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { LuLoader, LuSend } from "react-icons/lu";
import {
  CONTACT_MESSAGE_MAX,
  validateContact,
  type ContactErrors,
  type ContactResponse,
} from "@/lib/contact";
import { site } from "@/lib/content/site";
import { buttonPrimary, focusRing, textLink } from "./ui";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; reason: "error" | "rateLimited" | "unavailable" };

const fieldClass = `w-full rounded-xl border bg-surface-light-base dark:bg-surface-dark-base px-4 py-3 text-base text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted/70 dark:placeholder:text-text-dark-muted/70 ${focusRing}`;

export default function ContactForm() {
  const t = useTranslations("contact");
  const id = useId();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const errorText = (field: keyof ContactErrors) => {
    const code = errors[field];
    if (!code) return null;
    return code === "messageTooLong" ? t("messageTooLong", { max: CONTACT_MESSAGE_MAX }) : t("invalidEmail");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validateContact({ email, message, website });
    if (!check.ok) {
      setErrors(check.errors);
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, website }),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;

      if (data?.success) {
        setStatus({ kind: "success" });
        setEmail("");
        setMessage("");
        return;
      }
      if (data && data.error === "validation") {
        setErrors(data.fields);
        setStatus({ kind: "idle" });
        return;
      }
      const reason =
        data?.error === "rate_limited" ? "rateLimited" : data?.error === "unavailable" ? "unavailable" : "error";
      setStatus({ kind: "error", reason });
    } catch {
      setStatus({ kind: "error", reason: "error" });
    }
  };

  const emailError = errorText("email");
  const messageError = errorText("message");
  const sending = status.kind === "sending";

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-describedby={`${id}-status`}>
      <div>
        <label htmlFor={`${id}-email`} className="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
          {t("emailLabel")}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? `${id}-email-error` : undefined}
          className={`mt-2 ${fieldClass} ${emailError ? "border-error-dark dark:border-error" : "border-border-light-strong dark:border-border-dark-strong"}`}
        />
        {emailError && (
          <p id={`${id}-email-error`} className="mt-2 text-sm font-medium text-error-dark dark:text-[#fca5a5]">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
          {t("messageLabel")}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          maxLength={CONTACT_MESSAGE_MAX + 200}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messagePlaceholder")}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? `${id}-message-error` : undefined}
          className={`mt-2 ${fieldClass} ${messageError ? "border-error-dark dark:border-error" : "border-border-light-strong dark:border-border-dark-strong"}`}
        />
        {messageError && (
          <p id={`${id}-message-error`} className="mt-2 text-sm font-medium text-error-dark dark:text-[#fca5a5]">
            {messageError}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>{t("honeypotLabel")}</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button type="submit" disabled={sending} className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-60`}>
        {sending ? (
          <LuLoader className="h-5 w-5 motion-safe:animate-spin" aria-hidden="true" />
        ) : (
          <LuSend className="h-5 w-5" aria-hidden="true" />
        )}
        {sending ? t("sending") : t("submit")}
      </button>

      <div id={`${id}-status`} role="status" aria-live="polite" className="min-h-6 text-sm">
        {status.kind === "success" && (
          <p className="font-medium text-success-dark dark:text-success">{t("success")}</p>
        )}
        {status.kind === "error" && (
          <p className="font-medium text-text-light-primary dark:text-text-dark-primary">
            <span className="text-error-dark dark:text-[#fca5a5]">{t(status.reason)}</span>{" "}
            {t("fallback")}{" "}
            <a href={`mailto:${site.email}`} className={`${textLink} min-h-0 inline`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
