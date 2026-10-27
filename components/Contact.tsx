import { useTranslations } from "next-intl";
import { LuArrowUpRight, LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { site } from "@/lib/content/site";
import ContactForm from "./ContactForm";
import { accentText, buttonPrimary, buttonSecondary, card, mutedText } from "./ui";

export default function Contact() {
  const t = useTranslations("contact");
  const a11y = useTranslations("a11y");

  return (
    <section id="contact" aria-labelledby="contact-title" className="w-full">
      <div className={`${card} grid gap-10 p-6 sm:p-10 md:grid-cols-2 md:gap-14`}>
        <div>
          <p className={`font-mono text-xs md:text-sm uppercase tracking-[0.18em] ${accentText}`}>{t("eyebrow")}</p>
          <h2 id="contact-title" className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary text-balance">
            {t("title")}
          </h2>
          <p className={`mt-4 text-base md:text-lg ${mutedText}`}>{t("intro")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className={buttonPrimary}>
              <LuMail className="h-5 w-5" aria-hidden="true" />
              {t("emailCta")}
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
              <LuGithub className="h-5 w-5" aria-hidden="true" />
              {t("github")}
              <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> {a11y("newTab")}</span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
              <LuLinkedin className="h-5 w-5" aria-hidden="true" />
              {t("linkedin")}
              <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> {a11y("newTab")}</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <h3 className="mb-5 text-lg font-bold tracking-tight text-text-light-primary dark:text-text-dark-primary">{t("formTitle")}</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
