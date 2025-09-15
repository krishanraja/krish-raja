import { Button } from '@/components/ui/button';
import { Mail, Calendar, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="headline-lg mb-6">Let's Work Together</h2>
            <p className="body-lg text-muted-foreground">
              Available globally for strategic advisory, workshops, and executive coaching. Based in Brooklyn, working with teams worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href="mailto:hello@krishraja.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@krishraja.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <a href="https://calendly.com/krish-raja" className="text-muted-foreground hover:text-primary transition-colors">
                      Book a strategy call
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-primary" />
                    <a 
                      href="https://www.linkedin.com/in/krish-raja" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Working Rights</h3>
                <p className="text-sm text-muted-foreground">
                  USA, UK, and Australia • Available for global projects
                </p>
              </div>
            </div>
            
            {/* Right Column - Quick Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border">
              <h3 className="text-xl font-semibold mb-6">Quick Message</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors bg-background"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors bg-background"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors bg-background">
                    <option value="">How can I help you?</option>
                    <option value="strategy">AI Strategy & Advisory</option>
                    <option value="workshop">Executive Workshop</option>
                    <option value="coaching">Strategic Coaching</option>
                    <option value="speaking">Speaking Engagement</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    rows={4}
                    placeholder="Tell me about your challenge..." 
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors resize-none bg-background"
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button size="lg" asChild>
              <a href="https://calendly.com/krish-raja" className="flex items-center gap-2 w-full sm:w-auto">
                <Calendar size={20} />
                Book a Strategy Call
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:hello@krishraja.com" className="flex items-center gap-2 w-full sm:w-auto">
                <Mail size={20} />
                Email me directly
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;