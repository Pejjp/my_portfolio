'use client';
import { isValidEmail } from "@/lib/helpers/email_validator";
import type { FooterProps } from "@/lib/types/footer";
import { useTranslations } from 'next-intl';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter, LuYoutube } from 'react-icons/lu';

export default function Footer() {
  const [email, setEmail] = useState<string>('');  
  const t = useTranslations();
  const footer : FooterProps = t.raw('footer') ;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <footer className="relative bg-brand-dark dark:bg-gradient-dark text-text-dark-primary overflow-hidden rounded-t-5xl">

      {/* Main footer content */}
      <div className="relative pt-12 pb-8 px-6 md:px-12 lg:px-20">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
            {footer.header.title}
          </h2>
        </div>

        <div className="border-t border-border-dark pt-12">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8">
            
            {/* Brand section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center shadow-accent">
                  <span className="text-2xl font-bold text-brand-light">J</span>
                </div>
                <h3 className="text-2xl font-semibold">jeff</h3>
              </div>
              <p className="text-text-dark-muted leading-relaxed text-sm">
                {footer.header.cta}
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/jeff.pendy.2025/" 
                  className="w-10 h-10 bg-dark-700 hover:bg-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent"
                  aria-label="Facebook"
                >
                  <LuFacebook className="w-5 h-5" />
                </a>
                <a 
                  href="http://linkedin.com/in/jeff-pendy-910b502b2" 
                  className="w-10 h-10 bg-dark-700 hover:bg-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent"
                  aria-label="LinkedIn"
                >
                  <LuLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-dark-700 hover:bg-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent"
                  aria-label="YouTube"
                >
                  <LuYoutube className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/jeff_pendy/" 
                  className="w-10 h-10 bg-dark-700 hover:bg-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-accent"
                  aria-label="Instagram"
                >
                  <LuInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col tems-start md:items-end">
              <h4 className="text-brand-accent text-lg font-semibold mb-6">Contact</h4>
              <ul className="text-start md:text-end space-y-3">
                <li>
                  <a href="tel:+1-438-855-1291" className="text-text-dark-secondary hover:text-brand-accent transition-colors duration-200">
                    +1 (438)-855-1291
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Pejjp" target="_blank" rel="noopener noreferrer" className="text-text-dark-secondary hover:text-brand-accent transition-colors duration-200">
                    www.mygithub.com
                  </a>
                </li>
                <li>
                  <a href="mailto:jeffpendy33@gmail.com" className="text-text-dark-secondary hover:text-brand-accent transition-colors duration-200">
                    jeffpendy33@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border-dark mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-dark-muted text-sm text-center md:text-left">
            {footer.copyright.text} {new Date().getFullYear().toString()} <span className="text-brand-accent font-medium">Jeff Pendy</span>. {footer.copyright.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}