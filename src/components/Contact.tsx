import { ArrowUpRight } from 'lucide-react';
import BlockTitle from '@/components/home/BlockTitle';
import { contact } from '@/content';
import type { ContactLink } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

function ContactAction({ link, primary = false }: { link: ContactLink; primary?: boolean }) {
  const Icon = resolveIcon(link.icon);

  return (
    <a
      className={primary ? 'contact-link contact-primary' : 'contact-link contact-secondary-link'}
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
    >
      <span className="contact-icon"><Icon aria-hidden="true" /></span>
      <span className="contact-destination">
        <strong>{link.action}</strong>
        <small>{link.detail}</small>
      </span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

export function ContactPanel() {
  const [email, ...otherWays] = contact.links;

  return (
    <div className="contact-shell">
      <div className="contact-intro">
        <BlockTitle className="h-h2" text={contact.title} />
        <p>{contact.sub}</p>
        <ContactAction link={email} primary />
      </div>
      <ul className="contact-secondary">
        {otherWays.map(link => (
          <li key={link.href}><ContactAction link={link} /></li>
        ))}
      </ul>
    </div>
  );
}

export default function Contact() {
  return (
    <section id={contact.id} className="contact-section section-padding scroll-mt-16">
      <div className="container-width"><ContactPanel /></div>
    </section>
  );
}
