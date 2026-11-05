import { describe, expect, it } from 'vitest';
import { CONTACT_MESSAGE_MAX, escapeHtml, validateContact } from '@/lib/contact';

describe('validateContact', () => {
  it('accepts a valid email with an optional message', () => {
    expect(validateContact({ email: ' jane@company.com ', message: '' })).toEqual({
      ok: true,
      data: { email: 'jane@company.com', message: '' },
      isSpam: false,
    });
  });

  it.each([[{}], [null], ['string'], [{ email: 'not-an-email' }], [{ email: `${'a'.repeat(250)}@x.co` }]])(
    'rejects invalid input %#',
    (input) => {
      const result = validateContact(input);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.errors.email).toBe('invalidEmail');
    },
  );

  it('rejects messages over the limit', () => {
    const result = validateContact({ email: 'a@b.co', message: 'x'.repeat(CONTACT_MESSAGE_MAX + 1) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.message).toBe('messageTooLong');
  });

  it('flags the honeypot as spam', () => {
    const result = validateContact({ email: 'a@b.co', message: 'hi', website: 'http://spam' });
    expect(result.ok && result.isSpam).toBe(true);
  });
});

describe('escapeHtml', () => {
  it('neutralizes markup before it reaches the email template', () => {
    expect(escapeHtml(`<img src=x onerror="alert('1')">&`)).toBe(
      '&lt;img src=x onerror=&quot;alert(&#39;1&#39;)&quot;&gt;&amp;',
    );
  });
});
