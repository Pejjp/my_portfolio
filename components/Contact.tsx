import { useTranslations } from "next-intl";
import { LuArrowUpRight, LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { site } from "@/lib/content/site";
import ContactForm from "./ContactForm";
import { brandText, buttonPrimary, buttonSecondary, mutedText } from "./ui";

/** Original centered contact block (two-line title, gold second line, pill email field). */
export default function Contact() {
  const t = useTranslations("contact");
  const a11y = useTranslations("a11y");

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative w-full text-center pb-10">
      <h2 id="contact-title" className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-text-light-primary dark:text-text-dark-primary text-balance">
        <span className="block">{t("title")}</span>
        <span className={`block ${brandText}`}>{t("titleHighlight")}</span>
      </h2>
      <p className={`mx-auto mb-8 max-w-2xl text-base md:text-lg ${mutedText}`}>{t("intro")}</p>

      <ContactForm />

      <div className="mt-8 flex flex-wrap justify-center gap-3">
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
    </section>
  );
}
