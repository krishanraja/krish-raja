import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, FileText, Video } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const Work = () => {
  const workItems = [
    {
      title: "Techonomic: AI Strategy for Executives",
      type: "Newsletter",
      summary: "Weekly insights on AI strategy, data commercialization, and revenue growth for executives.",
      description: "Strategic analysis and practical frameworks for executives navigating AI transformation. Real case studies, market intelligence, and actionable insights from 16+ years building technology businesses.",
      link: "https://techonomic.substack.com",
      icon: FileText
    },
    {
      title: "Learning Hub: AI Implementation Playbooks",
      type: "Content Hub",
      summary: "Practical guides and frameworks for implementing AI strategies across different business functions.",
      description: "Comprehensive collection of playbooks, templates, and methodologies for AI strategy implementation, GTM optimization, and revenue operations.",
      link: "#ai-mindmaker",
      icon: FileText
    },
    {
      title: "The Business Case for AI Literacy",
      type: "Speaking",
      summary: "Keynote presentation on transforming technical knowledge into competitive advantage.",
      description: "How organizations can build systematic AI literacy that translates directly into revenue growth and operational efficiency.",
      link: "mailto:hello@krishraja.com?subject=Speaking%20Inquiry",
      icon: Video
    },
    {
      title: "Zero to Multi-Million ARR: Scaling APAC",
      type: "Case Study",
      summary: "Complete playbook for launching and scaling a technology business in new markets.",
      description: "Detailed analysis of building Captify's APAC business from zero to multi-million ARR, including team building, product-market fit, and go-to-market strategy.",
      link: "mailto:hello@krishraja.com?subject=Case%20Study%20Request",
      icon: FileText
    },
    {
      title: "AI-Powered Sales Automation Framework",
      type: "Workshop",
      summary: "Interactive workshop on implementing AI agents in sales and marketing processes.",
      description: "Hands-on session covering agent architecture, evaluation frameworks, and integration patterns that have delivered dramatic reductions in outreach time.",
      link: "https://calendly.com/krish-raja/krish-raja",
      icon: FileText
    },
    {
      title: "Data Commercialization Strategy",
      type: "Advisory",
      summary: "Strategic consulting on turning data assets into revenue streams.",
      description: "Methodology for identifying, packaging, and monetizing data assets based on experience launching extensive product portfolios across media and adtech.",
      link: "mailto:hello@krishraja.com?subject=Advisory%20Inquiry",
      icon: FileText
    },
    {
      title: "Executive AI Strategy Assessment",
      type: "Tool",
      summary: "Interactive assessment to evaluate your organization's AI readiness and identify growth opportunities.",
      description: "Comprehensive evaluation framework covering AI literacy, data infrastructure, process automation, and competitive positioning.",
      link: "https://calendly.com/krish-raja/krish-raja",
      icon: FileText
    },
    {
      title: "Building AI-First Revenue Operations",
      type: "Masterclass",
      summary: "Deep dive into designing revenue operations that scale with AI automation.",
      description: "Advanced strategies for revenue operations leaders looking to implement AI-driven processes, predictive analytics, and automated workflows.",
      link: "mailto:hello@krishraja.com?subject=Masterclass%20Inquiry",
      icon: Video
    }
  ];

  return (
    <section id="work" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Work</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Thought leadership, case studies, and strategic frameworks from 16+ years of building businesses
          </p>
        </div>

        <MobileCarousel 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          itemClassName="h-full"
          showDots={true}
        >
          {workItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="card-hover cursor-pointer border-0 shadow-sm h-full flex flex-col">
                    <CardHeader className="pb-4 flex-shrink-0">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-base leading-snug">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.summary}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{item.type}</Badge>
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <DialogTitle className="text-left">{item.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    <Button asChild className="w-full">
                      <a href={item.link} target={item.link.startsWith('http') || item.link.startsWith('mailto:') ? '_blank' : '_self'} rel={item.link.startsWith('http') || item.link.startsWith('mailto:') ? 'noopener noreferrer' : ''} className="flex items-center gap-2 justify-center">
                        {item.type === "Video" || item.type === "Speaking" || item.type === "Masterclass" ? "Watch" : 
                         item.type === "Tool" || item.type === "Workshop" ? "Access" :
                         item.type === "Advisory" ? "Inquire" : "Read"}
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </MobileCarousel>
      </div>
    </section>
  );
};

export default Work;