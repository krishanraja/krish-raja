import type { LatestContent } from './types';
import { site } from './site';

/**
 * Mindmaker Live, plus wherever else Krish has been talking.
 *
 * To add an item: one entry below. No component edits. Newest first is handled
 * by the component, which shows `limit` and links out to the archive.
 *
 * The six seeded posts are the six most recent on the channel. Titles, dates
 * and URLs were read off the channel, not invented.
 *
 * None carries a blurb. The channel publishes no subtitles, so any one-liner
 * here would be a guess at what the post argues, and a guess is not a fact.
 * TODO(krish): add one line per post and they render under the title.
 *
 * Two notes on links. The channel and archive links use
 * live.themindmaker.ai so the redirect can be repointed without touching this
 * repo. Individual posts cannot: that redirect is root-only today, so
 * live.themindmaker.ai/p/<slug> lands on the channel homepage rather than the
 * post. Per-post links therefore point at the Substack directly.
 *
 * TODO(krish): make the live.themindmaker.ai redirect forward paths, and these
 * per-post URLs can move onto your domain.
 *
 * TODO(krish): the `format` field takes "Built" or "Paid" and is unset on all
 * six. Classifying your existing posts would mean guessing at intent. Tag them
 * and the labels appear. The six, oldest to newest of this set: 10 AI Habits,
 * AI Literacy is the $5.5T Question, Business Leaders, Confessions of Your AI
 * Coworker, Plug & Play AI is a myth, Learnings from an AI Chief of Staff.
 *
 * TODO(krish): "Built" and "Paid" are pending your confirmation. The one
 * constraint is that the format name cannot be "Teardown", which is a live paid
 * Mindmaker engagement.
 *
 * TODO(krish): no podcast appearances are listed. Send links and they slot in
 * with type 'podcast' or 'talk'. The two that already sit in "Writing and
 * speaking" were left there rather than duplicated here.
 *
 * TODO(krish): Mindmaker Live runs free plus paid tiers. Nothing here mentions
 * price, per the brief. Name the tier structure if you want it stated.
 */
export const latest: LatestContent = {
  id: 'latest',
  eyebrow: 'Latest',
  title: 'Latest',
  sub: 'Mindmaker Live, plus wherever else I have been talking.',
  limit: 6,

  archive: { label: 'See the full archive', href: site.links.mindmakerLive },

  typeLabels: {
    post: 'Mindmaker Live',
    podcast: 'Podcast',
    talk: 'Talk',
  },

  entries: [
    {
      id: 'ai-chief-of-staff-learnings',
      title:
        'Learnings from an AI Chief of Staff: "I plan better than humans, but I never check whether what I did actually worked."',
      type: 'post',
      date: '2026-03-16',
      href: 'https://mindmakerlive.substack.com/p/learnings-from-an-ai-agent-i-plan-better-than-humans-but-i-never-check-whether-what-i-did-actually-w',
    },
    {
      id: 'plug-and-play-ai-myth',
      title: 'Plug & Play AI is a myth. Here\'s why.',
      type: 'post',
      date: '2026-03-10',
      href: 'https://mindmakerlive.substack.com/p/plug-play-ai-is-a-myth-here-s-why',
    },
    {
      id: 'confessions-ai-coworker',
      title: 'Confessions of Your AI Coworker: What 23 Bugs Taught Me About Working With Humans',
      type: 'post',
      date: '2026-02-06',
      href: 'https://mindmakerlive.substack.com/p/confessions-of-your-ai-coworker-what-23-bugs-taught-me-about-working-with-humans',
    },
    {
      id: 'software-is-learning-you',
      title: "Business Leaders: Your Software is Learning You (And You're Not Ready)",
      type: 'post',
      date: '2025-11-11',
      href: 'https://mindmakerlive.substack.com/p/business-leaders-your-software-is-learning-you-and-you-re-not-ready',
    },
    {
      id: 'ai-literacy-question',
      title: 'AI Literacy is the $5.5T Question: whose problem is it anyway?',
      type: 'post',
      date: '2025-11-06',
      href: 'https://mindmakerlive.substack.com/p/ai-literacy-is-the-5-5t-question-whose-problem-is-it-anyway',
    },
    {
      id: 'ten-ai-habits',
      title: '10 AI Habits That Transform Your Work (And Your Brain)',
      type: 'post',
      date: '2025-10-14',
      href: 'https://mindmakerlive.substack.com/p/10-ai-habits-that-transform-your-work-and-your-brain',
    },
  ],
};
