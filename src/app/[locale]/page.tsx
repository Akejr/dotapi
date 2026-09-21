import { notFound } from 'next/navigation';
import { Benefits } from '@/components/sections/Benefits';
import { Bridge } from '@/components/sections/Bridge';
import { Capabilities } from '@/components/sections/Capabilities';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Industries } from '@/components/sections/Industries';
import { getContent, isLocale } from '@/content';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <>
      <Hero locale={locale} content={content} />
      <Capabilities content={content} />
      <Benefits locale={locale} content={content} />
      <Bridge content={content} />
      <Industries content={content} />
      <Contact locale={locale} content={content} />
    </>
  );
}
