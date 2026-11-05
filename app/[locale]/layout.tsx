import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from "next-intl/server";
import "./globals.css"

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { dmMono, dmSans } from "@/lib/fonts";
import { site } from "@/lib/content/site";
import { alternatesFor, ogLocale } from "@/lib/seo";
import type { Locale } from "@/lib/content/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    alternates: alternatesFor(locale as Locale, ""),
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      locale: ogLocale[locale as Locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: "/My_logo_color.png",
      apple: "/My_logo_color.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d04" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {

  const {locale} = await params;
  if (!hasLocale(routing.locales,locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const a11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-700 focus:px-5 focus:py-3 focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          {a11y("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
            <Navbar/>
            <main id="main" tabIndex={-1} className="focus:outline-none">
              {children}
            </main>
            <Footer/>
          </ThemeProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
