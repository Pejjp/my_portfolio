"use client";

import { isValidEmail } from "@/lib/helpers/email_validator";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { LuMail, LuGithub, LuLinkedin, LuSend } from "react-icons/lu";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const emailIsValid = isValidEmail(email);
  const contact = useTranslations("contact");

  const submit = async () => {
    if (!email) return;

    setLoading(true);

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="relative px-4 text-center pb-10" 
      id="contact">
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
        <span className="block">{contact("have_idea")}</span>
        <span className="block text-brand-accent">
          {contact("lets_discuss")}
        </span>
      </h2>

      {/* Email Input */}
      <div
        className="
          max-w-xl mx-auto
          flex flex-col sm:flex-row
          items-stretch sm:items-center
          gap-3
          bg-white dark:bg-surface-dark-elevated
          border rounded-2xl sm:rounded-full
          px-4 py-3
          shadow-md
        "
      >
        <div className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-brand-accent/20">
          <LuMail className="text-brand-accent" />
        </div>

        <input
          type="email"
          placeholder={contact("email_placeholder")}
          className="
            flex-1 bg-transparent outline-none
            px-2 py-2
            text-sm md:text-base
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading || !emailIsValid}
          className="
          bg-brand-accent text-white
            px-6 py-3 rounded-full
            font-semibold transition
            hover:scale-105
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:scale-100
            w-full sm:w-auto
          "
        >
          {loading ? contact("sending") : <LuSend className="w-5 h-5 mx-auto" />}
        </button>
      </div>

      {success && (
        <p className="mt-4 text-green-600 font-medium text-sm md:text-base">
          {contact("thanks_message")}
        </p>
      )}
    </section>
  );
}
