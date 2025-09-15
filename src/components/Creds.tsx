import { Badge } from '@/components/ui/badge';

const Creds = () => {
  const companies = [
    { name: "Microsoft", logo: "M", period: "2008-2011", achievement: "Built automations saving weeks of manual work" },
    { name: "Nine Entertainment", logo: "9", period: "2018-2021", achievement: "Scaled revenue from $9M to $61M" },
    { name: "Singtel", logo: "S", period: "2016-2018", achievement: "Led digital transformation initiatives" },
    { name: "Captify", logo: "C", period: "2021-2024", achievement: "Built $5.5M ARR business from zero" }
  ];

  const achievements = [
    "30 Under 30 (Marketing & Media)",
    "Industry speaker and writer",
    "Strategic advisor and mentor",
    "TEDx speechwriter",
    "Guest lecturer (universities)",
    "Awards judge (industry panels)",
    "AI strategy workshop leader",
    "Thought leadership content creator"
  ];

  return (
    <section id="creds" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="headline-lg mb-8">Credentials</h2>
          
          <p className="body-lg text-muted-foreground mb-12 leading-relaxed">
            16+ years turning technical advantage into revenue across three continents. Built businesses from 
            $0 to $61M at Nine Entertainment, scaled $5.5M ARR operations at Captify, and launched 70+ products 
            across media, telco, adtech, and SaaS. From coding automations at Microsoft to strategic advisory 
            for C-suite executives, I bridge deep technical literacy with commercial execution.
          </p>

          {/* Company Timeline */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {companies.map((company, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg p-4 border border-border shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">{company.logo}</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{company.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{company.period}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{company.achievement}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="flex flex-wrap justify-center gap-3">
            {achievements.map((achievement, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                {achievement}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creds;