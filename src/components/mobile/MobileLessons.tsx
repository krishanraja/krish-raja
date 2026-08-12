import { ArrowUpRight } from 'lucide-react';
import MobileSection from './MobileSection';
import { lessons as lessonsContent } from '@/content';
import { asset } from '@/lib/asset-map';
import AttendeeStrip from '@/components/AttendeeStrip';

const MobileLessons = () => (
  <MobileSection
    id={lessonsContent.id}
    title={lessonsContent.title}
    intro={lessonsContent.sub}
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
              {/* No label row. The Free chip lived here and came off, and
                  repeating the section eyebrow on all five cards replaced one
                  piece of noise with another. Title, description, arrow. */}
              <div className="min-w-0 flex-1 py-3 pr-3">
                <div className="mb-1 flex items-start gap-2">
                  <h3 className="min-w-0 flex-1 text-[13.5px] font-semibold text-foreground leading-snug line-clamp-2">
                    {title}
                  </h3>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                </div>
                <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">
                  {lesson.description}
                </p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>

    <AttendeeStrip compact />
  </MobileSection>
);

export default MobileLessons;
