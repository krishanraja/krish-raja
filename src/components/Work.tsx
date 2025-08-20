import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, FileText, Video } from 'lucide-react';

const Work = () => {
  const workItems = [
    {
      title: "Scaling a tech business",
      type: "Article",
      summary: "Strategic framework for building scalable technology organizations across global markets.",
      description: "Deep dive into the operational patterns and growth strategies that have driven success across multiple technology companies.",
      link: "#",
      icon: FileText
    },
    {
      title: "Cookieless identity and the future of addressability",
      type: "Research",
      summary: "Comprehensive analysis of identity solutions in the post-cookie advertising ecosystem.",
      description: "Technical and commercial implications of identity infrastructure changes, with practical recommendations for businesses.",
      link: "#",
      icon: FileText
    },
    {
      title: "The future of programmatic",
      type: "Insight",
      summary: "Market analysis of programmatic advertising evolution and emerging opportunities.",
      description: "Forward-looking perspective on how programmatic advertising will evolve with AI and automation.",
      link: "#",
      icon: FileText
    },
    {
      title: "Macro media shifts to watch",
      type: "Analysis",
      summary: "Key trends reshaping the media landscape and their business implications.",
      description: "Strategic analysis of media industry transformations and their impact on advertising and content monetization.",
      link: "#",
      icon: FileText
    },
    {
      title: "Growth plans and GTM rewires",
      type: "Framework",
      summary: "Systematic approach to redesigning go-to-market strategies for accelerated growth.",
      description: "Practical methodology for identifying and executing GTM transformations that drive measurable revenue growth.",
      link: "#",
      icon: FileText
    },
    {
      title: "Data and automation in practice",
      type: "Case Study",
      summary: "Real-world implementation of data-driven automation across enterprise sales processes.",
      description: "Detailed case studies showing how data and automation can transform business operations and outcomes.",
      link: "#",
      icon: FileText
    },
    {
      title: "Work life balance at pace",
      type: "Perspective",
      summary: "Managing high-performance culture while maintaining sustainable work practices.",
      description: "Personal insights and strategies for building high-performing teams without sacrificing well-being.",
      link: "#",
      icon: FileText
    },
    {
      title: "Future of video",
      type: "Video",
      summary: "Strategic outlook on video technology, distribution, and monetization trends.",
      description: "Analysis of how video consumption, creation, and monetization will evolve in the AI era.",
      link: "#",
      icon: Video
    }
  ];

  return (
    <section id="work" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="headline-lg mb-6">Work</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Selected insights, frameworks, and analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="card-hover cursor-pointer border-0 shadow-sm">
                    <CardHeader className="pb-4">
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
                    <CardContent className="pt-0">
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
                    <Button asChild>
                      <a href={item.link} className="flex items-center gap-2">
                        {item.type === "Video" ? "Watch" : "Read"}
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;