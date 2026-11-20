import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { executiveProfile, speakerProfile, type DiscoveryProfile } from '../content/discovery';
import { site } from '../content/site';

/** Shared by the public HTML and the interactive page. */
export default function DiscoveryDocument({ profile, onEnquire }: { profile: DiscoveryProfile; onEnquire?: () => void }) {
  const speaking = profile.intent === 'speaking';
  const related = speaking ? executiveProfile : speakerProfile;
  const actionLabel = <>{profile.action}<ArrowRight size={18} aria-hidden="true" /></>;
  const enquiry = onEnquire
    ? <button type="button" className="profile-action" onClick={onEnquire}>{actionLabel}</button>
    : <a className="profile-action" href={`mailto:${site.email}?subject=${encodeURIComponent(profile.subject)}`}>{actionLabel}</a>;

  return <div className="profile-page" data-profile={profile.intent}>
    <a className="skip-link" href="#profile-main">Skip to content</a>
    <main id="profile-main" tabIndex={-1} className="profile-shell">
      <header className="profile-intro">
        <div className="profile-intro-copy">
          <p className="profile-byline"><a href="/">{site.name}</a><span aria-hidden="true">/</span>{speaking ? 'Speaking' : profile.label}</p>
          <h1>{profile.headline}</h1>
          <p className="profile-lead">{profile.intro}</p>
          <div className="profile-actions">
            {enquiry}
            <a className="profile-link" href={profile.sample.href}>{profile.sample.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="profile-photo">
          <img src={profile.image.path} width={profile.image.width} height={profile.image.height} alt={profile.image.alt} />
        </figure>
      </header>
      <div className="profile-body">
        <section className="profile-record" id={speaking ? 'keynote-topics' : 'commercial-record'} aria-labelledby="profile-record-title">
          <h2 id="profile-record-title">{profile.section}</h2>
          {profile.entries.map(entry => <article className="profile-entry" key={entry.label}>
            <p className="profile-label">{entry.label}</p>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
            {entry.link && <a className="profile-link" href={entry.link.href} aria-label={entry.link.label + ', ' + entry.title}>{entry.link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>}
          </article>)}
        </section>
        <aside className="profile-aside" aria-labelledby="profile-aside-title">
          <h2 id="profile-aside-title">{profile.aside.title}</h2>
          <p>{profile.aside.text}</p>
          <a className="profile-link" href={profile.aside.link.href}>{profile.aside.link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>
        </aside>
      </div>
      <section className="profile-contact" aria-labelledby="profile-contact-title">
        <div><h2 id="profile-contact-title">{profile.invitation}</h2><p>{profile.prompt}</p></div>
        {enquiry}
      </section>
    </main>
    <footer className="profile-shell profile-footer">
      <a href="/"><ArrowLeft size={16} aria-hidden="true" />Krish Raja’s homepage</a>
      {!speaking && <a href={site.links.linkedin}>Krish Raja on LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a>}
      <a href={related.path}>{related.label}<ArrowRight size={16} aria-hidden="true" /></a>
    </footer>
  </div>;
}
