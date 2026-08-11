import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileSection from './MobileSection';
import { work } from '@/content';
import { pick } from '@/content/types';
import { asset } from '@/lib/asset-map';

const MobileWriting = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <MobileSection
      id={work.id}
      eyebrow={work.eyebrow}
      title={pick(work.title, 'mobile')}
      intro={pick(work.sub, 'mobile')}
      tone="muted"
    >
      <ul className="space-y-3">
        {work.items.map((item, i) => {
          const isMedia = item.type !== 'Research';
          const image = asset(item.asset);
          const hasLink = Boolean(item.link) && item.link !== '#';
          return (
            <li key={i}>
              <Dialog open={openIndex === i} onOpenChange={(o) => setOpenIndex(o ? i : null)}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full text-left bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm active:bg-muted/40 transition-colors"
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        {isMedia && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                              <Play className="w-3 h-3 text-primary-foreground fill-current ml-0.5" />
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <Badge variant="secondary" className="text-[10px] py-0 px-1.5 mb-1.5">
                          {item.type}
                        </Badge>
                        <h3 className="text-[13.5px] font-semibold text-foreground leading-snug line-clamp-2 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <Badge variant="secondary" className="self-start">{item.type}</Badge>
                    <DialogTitle className="text-left text-base">{item.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden bg-muted/30">
                      <img src={image} alt={item.title} className="w-full h-auto object-contain max-h-[260px]" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    {hasLink && (
                      <Button asChild className="w-full">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                          {item.actionLabel}
                          <ExternalLink size={14} />
                        </a>
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </li>
          );
        })}
      </ul>
    </MobileSection>
  );
};

export default MobileWriting;
