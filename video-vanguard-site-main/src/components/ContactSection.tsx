import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, Instagram, Twitter, Linkedin, Send, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/yashtripathi2405', color: 'hover:text-pink-500' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/Yash240502', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', href: 'mailto:yashtripathi2405@gmail.com', color: 'hover:text-green-500' }
  ];

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient-accent">Let's Work Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Ready to collaborate or have a question? Reach out to me!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Quick Actions */}
          <Card className="card-hover mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button 
                  onClick={() => {
                    const phoneNumber = '8931917976';
                    const message = `Phone Number: ${phoneNumber}`;
                    alert(message);
                    navigator.clipboard.writeText(phoneNumber);
                  }}
                  className="w-full btn-secondary" 
                  size="lg"
                >
                  <Phone className="mr-3 h-5 w-5" />
                  Book a Discovery Call
                </Button>
                
                <Button 
                  onClick={() => {
                    const email = 'yashtripathi2405@gmail.com';
                    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
                  }}
                  variant="outline" 
                  className="w-full border-primary/30 hover:bg-primary/10" 
                  size="lg"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Send Quick Email
                </Button>

                <Button 
                  onClick={() => {
                    window.open('https://discord.com/users/yashtripathi0314', '_blank');
                  }}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
                  size="lg"
                >
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Discord Chat
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-background rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className="bg-accent/20 text-accent-foreground">
                    Available
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Typically responds within 24 hours
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="card-hover">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Connect With Me</h3>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-4 bg-background rounded-xl hover:scale-110 transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
              
              <div className="mt-6 text-center space-y-2">
                <p className="text-muted-foreground">
                  Follow my latest work and behind-the-scenes content
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone: +91 8931917976 | Discord: yashtripathi0314
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;