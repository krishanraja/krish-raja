import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, FileText, Mic, Video, BookOpen, Play } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import aiLiteracyWhitepaper from '@/assets/ai-literacy-whitepaper.png';
import mastersThesis from '@/assets/masters-thesis.png';
import podcastTile from '@/assets/podcast-tile.png';
import giveItANudge from '@/assets/give-it-a-nudge.png';

const Work = () => {
  const isMobile = useIsMobile();
  
  // Reordered: Interview and Podcast first
  const workItems = [
    {
      title: "Zero to Multi-Million ARR: Scaling APAC",
      type: "Interview",
      summary: "Complete playbook for launching and scaling a technology business in new markets.",
      description: "Detailed walkthrough of building Captify's APAC business from zero to multi-million ARR. Covers team building, product-market fit, go-to-market strategy, and the critical decisions that enabled rapid scaling.",
      link: "https://www.youtube.com/watch?v=6_bf9L1OX3s&t=271s",
      image: giveItANudge,
      icon: Video,
      actionLabel: "Watch"
    },
    {
      title: "My Take on AI in Media",
      type: "Podcast",
      summary: "November 2025 podcast discussing AI's transformation of media businesses.",
      description: "A conversation exploring how AI is transforming media businesses, from content creation to audience engagement and monetization strategies. Insights from scaling media technology businesses across global markets.",
      link: "https://open.spotify.com/episode/2c5xrFDlPC1Oqw9kcFKDay?si=ocqEDPLPSummNkaPT6T2Tg",
      image: podcastTile,
      icon: Mic,
      actionLabel: "Listen"
    },
    {
      title: "The Business Case for AI Literacy",
      type: "Whitepaper",
      summary: "How organizations can transform technical knowledge into competitive advantage.",
      description: "How organizations can build systematic AI literacy that translates directly into revenue growth and operational efficiency. Explores the strategic frameworks and implementation methodologies that turn AI understanding into measurable business outcomes.",
      link: "https://docsend.com/view/uybrzhx75fcwp2n7",
      image: aiLiteracyWhitepaper,
      icon: FileText,
      actionLabel: "Download"
    },
    {
      title: "Predicting the Future of Haptic Design",
      type: "Master's Thesis",
      summary: "2011 research featuring insights from IDEO, Microsoft, and Google that predicted today's UX trends.",
      description: "A Master's thesis that predicted the evolution of haptic and tactile interfaces through interviews with world-renowned UX and Interaction Design experts. The research explored emerging trends in digital experience design that continue to play out today.",
      link: "#",
      image: mastersThesis,
      icon: BookOpen,
      actionLabel: "Read"
    }
  ];

  const renderCard = (item: typeof workItems[0], index: number) => {
    const Icon = item.icon;
    const isMediaType = item.type === "Interview" || item.type === "Podcast";
    
    return (
      <Dialog key={index}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer border-0 shadow-sm h-full flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden bg-muted">
              <img 
                src={item.image} 
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Play Button for Media Types */}
              {isMediaType && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>
              )}
              
              {/* Badge on Image */}
              <Badge 
                variant="secondary" 
                className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-xs"
              >
                {item.type}
              </Badge>
            </div>
            
            {/* Content Section */}
            <CardContent className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {item.summary}
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{item.type}</Badge>
            </div>
            <DialogTitle className="text-left">{item.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {item.image && (
              <div className="w-full rounded-lg overflow-hidden bg-muted/30">
                <img 
                  src={item.image} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-contain max-h-[400px]"
                />
              </div>
            )}
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
            {item.link !== "#" && (
              <Button asChild className="w-full">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                  {item.actionLabel}
                  <ExternalLink size={16} />
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <section id="writing" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Writing & Media</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Thought leadership, research, and conversations from 16+ years of building
          </p>
        </div>

        {isMobile ? (
          <MobileCarousel 
            showDots={true}
            minHeight="carousel-sm"
          >
            {workItems.map((item, index) => renderCard(item, index))}
          </MobileCarousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workItems.map((item, index) => renderCard(item, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
