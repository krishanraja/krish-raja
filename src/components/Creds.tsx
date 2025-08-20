import { Badge } from '@/components/ui/badge';

const Creds = () => {
  const companies = [
    { name: "Microsoft", logo: "M" },
    { name: "Nine", logo: "9" },
    { name: "Singtel", logo: "S" },
    { name: "Captify", logo: "C" }
  ];

  const achievements = [
    "30 Under 30",
    "Industry speaker and writer",
    "Mentor",
    "TEDx speechwriter",
    "Guest lecturer",
    "Awards judge"
  ];

  return (
    <section id="creds" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="headline-lg mb-8">Credentials</h2>
          
          <p className="body-lg text-muted-foreground mb-12 leading-relaxed">
            I help teams turn technical advantage into revenue. I've built and scaled businesses 
            across big tech, telco, broadcasters, publishers, and adtech. My work spans AI literacy, 
            data commercialization, identity, and product-led revenue strategy.
          </p>

          {/* Company Logos */}
          <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
            {companies.map((company, index) => (
              <div 
                key={index}
                className="w-16 h-16 rounded-lg bg-card border border-border flex items-center justify-center shadow-sm"
              >
                <span className="text-2xl font-bold text-muted-foreground">
                  {company.logo}
                </span>
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