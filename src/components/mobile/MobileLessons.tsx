import { Zap, ArrowUpRight } from 'lucide-react';
import MobileSection from './MobileSection';
import { lessons as lessonsContent } from '@/content';
import { pick } from '@/content/types';
import { asset } from '@/lib/asset-map';

const MobileLessons = () => (
  <MobileSection
    id={lessonsContent.id}
    eyebrow={lessonsContent.eyebrow}
    title={pick(lessonsContent.title, 'mobile')}
    intro={pick(lessonsContent.sub, 'mobile')}
  >
    <ul className="space-y-3">
      {lessonsContent.lessons.map((lesson, i) => {
        const title = lesson.title;
        return (
          <li key={i}>
            <a
              href={lesson.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm active:bg-muted/40 transition-colors"
            >
              <div className="w-24 h-24 flex-shrink-0 bg-muted relative">
                <img src={asset(lesson.asset)} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1 py-3 pr-3">
                <div className="flex items-center gap-1 mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    <Zap className="w-3 h-3 fill-current" />
                    {lessonsContent.badge}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                </div>
                <h3 className="text-[13.5px] font-semibold text-foreground leading-snug line-clamp-2 mb-1">
                  {title}
                </h3>
                <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">
                  {lesson.description}
                </p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  </MobileSection>
);

export default MobileLessons;
