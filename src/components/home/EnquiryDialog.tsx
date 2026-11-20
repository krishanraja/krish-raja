import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { home, site } from '@/content';
import { routeCopy as copy } from '@/content/hero-routes';
import { recordEnquiry } from '@/lib/enquiry';

type Intent = 'general' | 'speaking' | 'immersion' | 'ongoing' | 'leadership';
type Draft = { name: string; email: string; event: string; when: string; message: string; requestId: string };
const empty: Draft = { name: '', email: '', event: '', when: '', message: '', requestId: '' };
const AskContext = createContext<(intent?: Intent) => void>(() => {});
export const useAsk = () => useContext(AskContext);

export function AskProvider({ children, otherWays }: { children: ReactNode; otherWays?: ReactNode }) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const invoker = useRef<HTMLElement | null>(null);
  const drafts = useRef<Partial<Record<Intent, Draft>>>({});
  const open = useCallback((next: Intent = 'general') => {
    invoker.current = document.activeElement as HTMLElement;
    setIntent(next);
  }, []);

  return <AskContext.Provider value={open}>
    {children}
    {intent && <EnquiryDialog key={intent} intent={intent} initial={drafts.current[intent] ?? empty} otherWays={otherWays}
      remember={value => { drafts.current[intent] = value; }}
      clear={id => { if (drafts.current[intent]?.requestId === id) delete drafts.current[intent]; }}
      close={() => {
        setIntent(null);
        requestAnimationFrame(() => invoker.current?.focus({ preventScroll: true }));
      }} />}
  </AskContext.Provider>;
}

function EnquiryDialog({ intent, initial, remember, clear, close, otherWays }: {
  intent: Intent; initial: Draft; remember: (draft: Draft) => void; clear: (id: string) => void; close: () => void; otherWays?: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const result = useRef<HTMLHeadingElement>(null);
  const [draft, setDraft] = useState(initial);
  const [direct, setDirect] = useState<boolean | null>(null);
  const [status, setStatus] = useState<'editing' | 'sending' | 'accepted' | 'mail' | 'error'>('editing');
  const inFlight = useRef(false);
  const speaking = intent === 'speaking';
  const ask = home.ask;
  const subject = speaking ? ask.subjectPrefix + draft.event.trim() : copy[intent];
  const body = [
    draft.name.trim() && copy.name + ': ' + draft.name.trim(),
    copy.email + ': ' + draft.email.trim(),
    speaking && ask.fields.event + ': ' + draft.event.trim(),
    speaking && draft.when.trim() && ask.fields.when + ': ' + draft.when.trim(),
  ].filter(Boolean).join('\n') + '\n\n' + draft.message.trim();
  const mailto = 'mailto:' + site.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      controller.abort();
      setDirect(false);
    }, 5000);
    fetch('/api/contact', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then(async response => response.ok && (await response.json()).available === true)
      .catch(() => false)
      .then(available => { if (!controller.signal.aborted) setDirect(available); })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  useEffect(() => {
    if (status === 'accepted' || status === 'mail') result.current?.focus();
  }, [status]);

  function edit(field: Exclude<keyof Draft, 'requestId'>, value: string) {
    const next = { ...draft, [field]: value, requestId: '' };
    setDraft(next);
    remember(next);
    setStatus('editing');
  }
  function trace() {
    recordEnquiry('enquiry', speaking ? 'ask-form' : intent, {
      name: draft.name.trim() || draft.email.trim(), event: speaking ? draft.event : subject,
      when: draft.when, message: body,
    });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || direct === null) return;
    if (!direct) {
      trace();
      window.location.href = mailto;
      setStatus('mail');
      return;
    }
    inFlight.current = true;
    setStatus('sending');
    const submission = { ...draft, requestId: draft.requestId || crypto.randomUUID() };
    setDraft(submission);
    remember(submission);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...submission, intent }), signal: AbortSignal.timeout(12000),
      });
      if (response.status !== 202 || (await response.json()).accepted !== true) throw new Error();
      trace();
      clear(submission.requestId);
      setStatus('accepted');
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  }

  return <dialog ref={dialog} className="mr-dialog" aria-labelledby="enquiry-heading"
    onClose={close} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
    <div className="mr-panel">
      <button type="button" className="mr-x" aria-label={copy.close} onClick={() => dialog.current?.close()}><X size={18} aria-hidden /></button>
      {status === 'accepted' || status === 'mail' ? <>
        <span className="mr-check"><Check aria-hidden /></span>
        <h2 id="enquiry-heading" ref={result} tabIndex={-1}>{status === 'accepted' ? copy.accepted : copy.emailReady}</h2>
        {status === 'mail' && <p className="mr-emailto">{copy.mailHint} <a href={mailto}>{copy.retryMail}</a>.</p>}
        <button type="button" className="h-btn h-btn--dark" onClick={() => dialog.current?.close()}>{copy.close}<span className="h-badge"><ArrowRight aria-hidden /></span></button>
      </> : <>
        {intent !== 'general' && !speaking && <p className="mr-context">{copy[intent]}</p>}
        <h2 id="enquiry-heading">{speaking ? ask.title : copy.contact}</h2>
        <p className="mr-emailto">{copy.addressLabel} <strong>{site.email}</strong></p>
        <form onSubmit={submit}>
          <fieldset disabled={status === 'sending'}>
            <label>{copy.name}<input name="name" autoComplete="name" maxLength={120} required={speaking} value={draft.name} onChange={e => edit('name', e.target.value)} /></label>
            <label>{copy.email}<input name="email" type="email" autoComplete="email" required maxLength={254} value={draft.email} onChange={e => edit('email', e.target.value)} /></label>
            {speaking && <>
              <label>{ask.fields.event}<input name="event" required maxLength={200} value={draft.event} onChange={e => edit('event', e.target.value)} /></label>
              <label>{ask.fields.when}<input name="when" maxLength={200} value={draft.when} onChange={e => edit('when', e.target.value)} /></label>
            </>}
            <label>{copy.message}<textarea name="message" rows={3} required={!speaking} maxLength={4000} value={draft.message} onChange={e => edit('message', e.target.value)} /></label>
            <div className="mr-formfoot">
              <button type="submit" className="h-btn h-btn--dark" disabled={direct === null} aria-busy={direct === null || status === 'sending'}>{status === 'sending' ? copy.sending : direct === false ? copy.mailAction : copy.send}<span className="h-badge"><ArrowRight aria-hidden /></span></button>
              {direct === false && <span className="mr-note">{copy.mailHint}</span>}
            </div>
          </fieldset>
          {status === 'error' && <p role="alert" className="mr-emailto">{copy.failed} <a href={mailto}>{copy.mailAction}</a>.</p>}
        </form>
        {intent === 'general' && otherWays}
      </>}
    </div>
  </dialog>;
}
