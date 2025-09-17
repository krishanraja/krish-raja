import { Button } from '@/components/ui/button';
import { Mail, Calendar, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-width">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="headline-lg mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Let's discuss how I can help your team navigate AI transformation.
            </p>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
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
          
          {/* Primary CTA */}
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <a href="https://calendly.com/krish-raja" className="flex items-center gap-2 mx-auto">
                <Calendar size={20} />
                Book a Strategy Call
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;