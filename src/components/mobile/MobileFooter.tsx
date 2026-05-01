import { Linkedin } from 'lucide-react';

const MobileFooter = () => (
  <footer className="bg-muted/30 border-t border-border px-5 py-6">
    <div className="flex items-center justify-between mb-4">
      <a href="#hero" className="text-base font-semibold tracking-tight">
        Krish Raja
      </a>
      <a
        href="https://www.linkedin.com/in/krish-raja"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="p-2 rounded-full bg-card border border-border/60 text-muted-foreground"
      >
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
    <p className="text-[12.5px] text-muted-foreground leading-relaxed mb-4">
      Operator-advisor running an autonomous AI business. Helping companies commercialize theirs.
    </p>
    <div className="flex justify-between items-center text-[11px] text-muted-foreground">
      <p>© {new Date().getFullYear()} Krish Raja</p>
      <p>Brooklyn, NY</p>
    </div>
  </footer>
);

export default MobileFooter;
