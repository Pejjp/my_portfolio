import { isValidEmail } from './helpers/email_validator';

/** Shared by the contact form (client) and /api/contact (server). */
export const CONTACT_MESSAGE_MAX = 2000;
const EMAIL_MAX = 254;

export type ContactField = 'email' | 'message';
export type ContactErrorCode = 'invalidEmail' | 'messageTooLong';
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactPayload = {
  email: string;
  message: string;
  /** Honeypot. Real visitors never see or fill it. */
  website?: string;
};

export type ContactValidation =
  | { ok: true; data: { email: string; message: string }; isSpam: boolean }
  | { ok: false; errors: ContactErrors };

export function validateContact(input: unknown): ContactValidation {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const email = typeof raw.email === 'string' ? raw.email.trim() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';
  const website = typeof raw.website === 'string' ? raw.website.trim() : '';

  const errors: ContactErrors = {};
  if (!email || email.length > EMAIL_MAX || !isValidEmail(email)) errors.email = 'invalidEmail';
  if (message.length > CONTACT_MESSAGE_MAX) errors.message = 'messageTooLong';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { email, message }, isSpam: website.length > 0 };
}

/** Escapes text before it is placed in the HTML email template. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Response shape of /api/contact. */
export type ContactResponse =
  | { success: true }
  | { success: false; error: 'validation'; fields: ContactErrors }
  | { success: false; error: 'rate_limited' | 'unavailable' | 'send_failed' | 'bad_request' };
