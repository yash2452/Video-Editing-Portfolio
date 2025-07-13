import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection 
          name="Yash Tripathi"
          title="Video Editor & Motion Designer" 
          description="Creating compelling narratives and visually stunning content that captivates audiences and brings stories to life through the power of video editing and motion design."
        />
        
        <ProjectsSection />
        
        <ContactSection />
      </main>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            &copy; 2025 Yash Tripathi Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
