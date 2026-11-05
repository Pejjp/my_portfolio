import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Jeff Pendy';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Text-only social card generated at build time; no stock imagery. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hero = await getTranslations({ locale, namespace: 'hero' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0f0d04',
          color: '#FFF9EB',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: '#c08301', textTransform: 'uppercase' }}>
          {hero('eyebrow')}
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {hero.markup('headline', { hl: (chunks) => chunks })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 32 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: '#c08301', marginRight: 16 }} />
          Jeff Pendy · jeffpendy.com
        </div>
      </div>
    ),
    size,
  );
}
