import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { contact, site } from '@/content';
import { routeCopy } from '@/content/hero-routes';
import { recordEnquiry } from '@/lib/enquiry';

/** The dock's original contact choices remain available inside the general enquiry. */
export default function MobileContactOptions() {
  const [feedback, setFeedback] = useState('');
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(site.email);
      recordEnquiry('email', 'copy');
      setFeedback(contact.copySuccess);
    } catch {
      setFeedback(contact.copyError);
    }
  }
  return <details className="mr-options">
    <summary>{routeCopy.otherWays}</summary>
    <ul>{contact.links.map(link => <li key={link.href}>
      <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>
        <span>{link.action}</span><ArrowUpRight aria-hidden size={16} />
      </a>
      {link.copyable && <button type="button" onClick={copyAddress} aria-label={contact.copyLabel}>
        {feedback === contact.copySuccess ? <Check aria-hidden size={16} /> : <Copy aria-hidden size={16} />}
      </button>}
    </li>)}</ul>
    <span role="status">{feedback}</span>
  </details>;
}
