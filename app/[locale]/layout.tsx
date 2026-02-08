import { notFound } from "next/navigation";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import "./globals.css"

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { dmMono, dmSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Jeff J. Pendy P.",
  description: "My personnal portfolio",
  icons: {
    icon: '/logo_color_4.png', // or '/icon.png'
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          >
            <Navbar/>
            {children}
            <Footer/>
          </ThemeProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}