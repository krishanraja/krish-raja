import { Button } from '@/components/ui/button';
import { Mail, Calendar, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-width">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="headline-lg mb-8">Contact</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" asChild>
              <a href="https://calendly.com/krish-raja" className="flex items-center gap-2 w-full sm:w-auto">
                <Calendar size={20} />
                Book a call
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:hello@krishraja.com" className="flex items-center gap-2 w-full sm:w-auto">
                <Mail size={20} />
                Email me
              </a>
            </Button>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" asChild>
              <a 
                href="https://www.linkedin.com/in/krish-raja" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;