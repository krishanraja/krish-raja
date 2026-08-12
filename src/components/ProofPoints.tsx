import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, MapPin } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { receipts } from '@/content';
import { pick } from '@/content/types';
import { icon as resolveIcon } from '@/lib/icon-map';

const ProofPoints = () => {
  const isMobile = useIsMobile();

  const { achievements, credentials, journey, engagements } = receipts;

  const achievementCard = (achievement: (typeof achievements)[number], index: number) => {
    const Icon = resolveIcon(achievement.icon);
    return (
      <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm text-center h-full">
        <CardContent className="p-6">
          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {/* Two lines reserved. "18 People to 14 Agents" wraps where the
              other three metrics do not, and without the floor that one card
              pushes its category, context and body a line lower than its
              neighbours across an otherwise aligned row. */}
          <div className="text-2xl font-bold text-primary mb-1 break-words hyphens-auto min-h-[4rem]">
            {achievement.metric}
          </div>
          <div className="text-sm font-medium text-foreground mb-2 break-words hyphens-auto">
            {achievement.category}
          </div>
          <div className="text-xs text-muted-foreground mb-3 break-words hyphens-auto">
            {achievement.context}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed break-words hyphens-auto">
            {achievement.description}
          </p>
        </CardContent>
      </Card>
    );
  };

  // The carousel needs h-full; the desktop stack does not. Kept distinct so
  // the extraction does not alter either layout.
  const journeyCard = (location: (typeof journey)[number], index: number, fill = false) => (
    <Card key={index} className={`border-0 shadow-sm bg-muted/30${fill ? ' h-full' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-4 h-4 text-primary" />
          <div className="font-semibold text-sm">{location.city}</div>
          <Badge variant="secondary" className="text-xs">
            {location.period}
          </Badge>
        </div>
        <p className="text-xs font-medium text-foreground mb-1">
          {location.role}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {location.story}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <section id={receipts.id} className="section-padding scroll-mt-16">
      <div className="container-width">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="headline-lg mb-4 md:mb-6">{pick(receipts.title, 'desktop')}</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            {pick(receipts.sub, 'desktop')}
          </p>
        </div>

        {isMobile ? (
          <Tabs defaultValue="receipts" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6 bg-muted/30 p-1 rounded-full h-auto">
              <TabsTrigger
                value="receipts"
                className="rounded-full py-2 px-3 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                {receipts.tabs.receipts}
              </TabsTrigger>
              <TabsTrigger
                value="journey"
                className="rounded-full py-2 px-3 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                {receipts.tabs.journey}
              </TabsTrigger>
              <TabsTrigger
                value="credentials"
                className="rounded-full py-2 px-3 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                {receipts.tabs.credentials}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="receipts" className="animate-fade-in mt-0">
              <MobileCarousel
                itemClassName="h-full"
                showDots={true}
                minHeight="carousel-sm"
              >
                {achievements.map((achievement, index) => achievementCard(achievement, index))}
              </MobileCarousel>
            </TabsContent>

            <TabsContent value="journey" className="animate-fade-in mt-0">
              <MobileCarousel
                itemClassName="h-full"
                showDots={true}
                minHeight="carousel-xs"
              >
                {journey.map((location, index) => journeyCard(location, index, true))}
              </MobileCarousel>
            </TabsContent>

            <TabsContent value="credentials" className="animate-fade-in mt-0">
              <div className="flex flex-wrap justify-center gap-2">
                {credentials.map((credential, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs py-1.5 px-3 bg-background/50"
                  >
                    <Award className="w-3 h-3 mr-1.5 text-primary" />
                    {credential}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <div className="mb-12">
              <div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {achievements.map((achievement, index) => achievementCard(achievement, index))}
              </div>
            </div>

            {engagements.length > 0 && (
              <div className="mb-12">
                <h3 className="headline-md mb-8">{receipts.engagementsHeading}</h3>
                {/* Full width at one entry. Two named engagements became one
                    anonymized one on 12 Aug 2026, and a half-width card with
                    nothing beside it reads as a missing card. */}
                <div className={`grid gap-6${engagements.length > 1 ? ' md:grid-cols-2' : ''}`}>
                  {engagements.map((engagement, index) => (
                    <Card key={index} className="border-0 shadow-sm bg-card/50 backdrop-blur-sm h-full">
                      <CardContent className="p-6">
                        <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                          <h4 className="font-semibold text-foreground">{engagement.name}</h4>
                          <span className="text-xs text-primary/80 font-medium">{engagement.role}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {engagement.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-12">
              {/* Credentials */}
              <div>
                <h3 className="headline-md mb-8">{receipts.credentialsHeading}</h3>
                <div className="flex flex-wrap gap-3">
                  {credentials.map((credential, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-sm py-2 px-4 bg-background/50"
                    >
                      <Award className="w-3 h-3 mr-2" />
                      {credential}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Global Experience */}
              <div>
                <h3 className="headline-md mb-8">{receipts.journeyHeading}</h3>
                <div className="space-y-4">
                  {journey.map((location, index) => journeyCard(location, index))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProofPoints;
