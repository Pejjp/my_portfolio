"use client";

import { isValidEmail } from "@/lib/helpers/email_validator";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { LuMail, LuGithub, LuLinkedin, LuSend } from "react-icons/lu";
import { ThreeDots } from "react-loader-spinner"; // Import a spinner type

export default function Contact() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const emailIsValid = isValidEmail(email);
  const contact = useTranslations("contact");

  const submit = async () => {
    if (!email) return;

    setLoading(true);

    const result = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const response = await result.json();

    if(response.success === false){
      setSuccess(false);
      setMessage(contact("error_message"));
    }else{
      setSuccess(true); 
      setMessage(contact("thanks_message"));
    }
    
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 5000);    
    
    setLoading(false);
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
            flex items-center justify-center
          "
          >
          {loading ? (
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#ffffff"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <LuSend className="w-5 h-5 mx-auto" />
          )}
        </button>
      </div>

      {messageVisible && (
        <p className={`mt-4 font-medium text-sm md:text-base ${success ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </section>
  );
}
