import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import type { Locale, SiteContent } from '@/content/types';

export function Contact({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { contact } = content;

  return (
    <section id="contact" className="scroll-mt-24 bg-paper-soft pt-10 pb-12 lg:pt-16 lg:pb-11">
      <Container>
        {/* Card inset by the page gutter, 44px horizontal / 36px vertical padding */}
        <Reveal className="rounded-[1.5rem] bg-mist p-6 sm:p-10 lg:rounded-[1.75rem] lg:px-11 lg:py-9">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-10">
            <div>
              <h2 className="text-h2 whitespace-pre-line">{contact.heading}</h2>
              <p className="text-body-base mt-5 max-w-[27.5rem] text-body">{contact.body}</p>
            </div>

            <ContactForm locale={locale} copy={contact} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
