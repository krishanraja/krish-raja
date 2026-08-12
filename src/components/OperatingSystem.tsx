import { os } from '@/content';
import { pick } from '@/content/types';
import { OsClip } from '@/components/OsGallery';

const OperatingSystem = () => (
  <section id={os.id} className="section-padding scroll-mt-16">
    <div className="container-width">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="headline-lg mb-3 md:mb-4">{pick(os.title, 'desktop')}</h2>
        <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
          {pick(os.sub, 'desktop')}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {os.entries.map((entry) => (
          <OsClip key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  </section>
);

export default OperatingSystem;
