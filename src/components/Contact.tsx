import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';

const contactLinks = [
  {
    label: "Email",
    value: "hello@krishraja.com",
    href: "mailto:hello@krishraja.com",
    icon: Mail,
    external: false
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/krish-raja",
    href: "https://www.linkedin.com/in/krish-raja",
    icon: Linkedin,
    external: true
  },
  {
    label: "For work inquiries",
    value: "Book a call through Mindmaker",
    href: "https://themindmaker.ai",
    icon: ArrowUpRight,
    external: true
  }
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-muted/30 scroll-mt-16">
      <div className="container-width">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="headline-lg mb-3 md:mb-4">Get in touch</h2>
            <p className="text-muted-foreground">
              For speaking, writing, or a direct line.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border/60 divide-y divide-border/60 overflow-hidden">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                      {link.label}
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
