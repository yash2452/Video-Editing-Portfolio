import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from './VideoPlayer';
import ToolIcons from './ToolIcons';
import { Mail, Calendar } from 'lucide-react';

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  profileImage?: string;
  showreelVideo?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Yash Tripathi",
  title = "Video Editor & Motion Designer",
  description = "Creating compelling narratives and visually stunning content that captivates audiences and brings stories to life through the power of video editing and motion design.",
  profileImage = "/lovable-uploads/beeeecbe-b7e0-468a-b884-f9cef7fe3ebe.png",
  showreelVideo
}) => {
  const tools = [
    { name: 'Premiere Pro', icon: 'Pr' },
    { name: 'After Effects', icon: 'Ae' },
    { name: 'DaVinci Resolve', icon: 'Dv' },
    { name: 'Photoshop', icon: 'Ps' },
    { name: 'Illustrator', icon: 'Ai' },
    { name: 'Audition', icon: 'Au' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-primary/5" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Content */}
        <div className="max-w-6xl mx-auto">
          {/* Profile and Intro */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/30 glow-primary">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Badge className="bg-accent text-accent-foreground font-semibold px-3 py-1">
                  Available for work
                </Badge>
              </div>
            </div>
            
            {/* Intro Text */}
            <div className="text-center lg:text-left max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="text-gradient-primary">{name}</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-muted-foreground mb-6 font-medium">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="btn-hero">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Call
                </Button>
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Showreel Video */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">
                <span className="text-gradient-accent">Featured Showreel</span>
              </h3>
              <p className="text-muted-foreground">
                A curated selection of my best work across different formats and styles
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <VideoPlayer 
                src="https://youtu.be/-dr-wvPjGFo"
                title="Main Showreel"
                aspectRatio="landscape"
                className="card-hover rounded-2xl overflow-hidden"
              />
            </div>
          </div>
          
          {/* Software Tools */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
              Tools I Work With
            </h3>
            <ToolIcons />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;