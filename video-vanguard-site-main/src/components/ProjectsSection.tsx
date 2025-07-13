import React from 'react';
import ProjectCard from './ProjectCard';

export const ProjectsSection: React.FC = () => {
  const longFormProjects = [
    {
      title: "Documentary Project",
      description: "A deep dive exploration showcasing complex narratives through compelling visual storytelling. This project involved extensive footage review, multi-track audio mixing, and advanced color grading techniques. Seamless transitions and dynamic pacing maintained viewer engagement throughout.",
      tags: ["Documentary", "Color Grading", "Audio Mixing"],
      layout: "default" as const,
      videoSrc: "https://youtu.be/fNh_GyRbJDA",
      aspectRatio: "16:9", // Added consistent aspect ratio
      duration: "45 min", // Added duration
      year: "2024" // Added year
    },
    {
      title: "Podcast Video Series",
      description: "Transformed raw audio content into visually engaging podcast episodes with dynamic visual elements. Focused on creating engaging B-roll sequences, animated text overlays, and precise audio synchronization.",
      tags: ["Podcast", "Motion Graphics", "Audio Sync"],
      layout: "reverse" as const,
      videoSrc: "https://youtu.be/Kl-I7sUcAOY",
      aspectRatio: "16:9",
      duration: "25 min",
      year: "2024"
    },
    {
      title: "Motion Design Showcase",
      description: "Created captivating motion graphics and animated sequences for brand storytelling. This project highlights advanced skills in visual narrative through animation and custom 2D/3D element integration.",
      tags: ["Motion Graphics", "2D/3D Animation", "Brand"],
      layout: "default" as const,
      videoSrc: "https://youtu.be/aJeJwAgjtaI",
      aspectRatio: "16:9",
      duration: "3 min",
      year: "2024"
    },
    {
      title: "Infotainment Series",
      description: "Developed engaging infotainment content that perfectly balances educational value with entertainment. Fast-paced editing and dynamic visual effects maximize audience retention.",
      tags: ["Infotainment", "Fast-Paced", "Educational"],
      layout: "reverse" as const,
      videoSrc: "https://youtu.be/-uyS0Pm2xoI",
      aspectRatio: "16:9",
      duration: "12 min",
      year: "2024"
    }
  ];

  const shortFormProjects = [
    {
      title: "0x100 Campaign",
      description: "A concise, high-impact promotional video designed for maximum social media engagement and viral potential.",
      tags: ["Social Media", "Viral", "Campaign"],
      videoSrc: "https://www.youtube.com/shorts/rwY2_m9v7bQ?feature=share"
    },
    {
      title: "Sufox Brand Video",
      description: "Dynamic brand promotional content tailored to capture attention and drive audience interest in record time.",
      tags: ["Brand", "Promotional", "Dynamic"],
      videoSrc: "https://www.youtube.com/shorts/rwY2_m9v7bQ?feature=share"
    },
    {
      title: "Josh Lyn Highlights",
      description: "Professional highlight reel showcasing key moments in a visually compelling and engaging format.",
      tags: ["Highlights", "Professional", "Showcase"],
      videoSrc: "https://www.youtube.com/shorts/rwY2_m9v7bQ?feature=share"
    },
    {
      title: "Devin Jathe Content",
      description: "Platform-optimized short-form content designed for maximum engagement and audience retention.",
      tags: ["Content Creation", "Platform-Optimized", "Engagement"],
      videoSrc: "https://www.youtube.com/shorts/rwY2_m9v7bQ?feature=share"
    },
    {
      title: "Alex Harmozi Clip",
      description: "Motivational content edited to deliver powerful messages with crystal-clear impact and emotional resonance.",
      tags: ["Motivational", "Powerful", "Impact"],
      videoSrc: "https://www.youtube.com/shorts/rwY2_m9v7bQ?feature=share"
    },
    {
      title: "Ali Abdaal Feature",
      description: "Brand-focused feature video designed to effectively showcase personality and professional expertise.",
      tags: ["Feature", "Brand", "Professional"],
      videoSrc: "https://www.youtube.com/shorts/rwY2_m9v7bQ?feature=share"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">My Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of projects showcasing various formats, styles, and storytelling approaches
          </p>
        </div>

        {/* Long Form Section */}
        <div className="mb-20">
          <div className="mb-12">
            <h3 className="text-5xl font-extrabold text-center mb-6 text-indigo-400 drop-shadow-lg">
              Longform
            </h3>
            <p className="text-muted-foreground text-center lg:text-left">
              In-depth storytelling and comprehensive video productions
            </p>
          </div>
          
          <div className="space-y-8">
            {longFormProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                videoSrc={project.videoSrc}
                aspectRatio="landscape"
                tags={project.tags}
                layout={project.layout}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Short Form Section */}
        <div>
          <div className="mb-12">
            <h3 className="text-5xl font-extrabold text-center mb-6 text-pink-400 drop-shadow-lg">
              Shortform
            </h3>
            <p className="text-muted-foreground text-center lg:text-left">
              Quick, impactful content optimized for social platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shortFormProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                videoSrc={project.videoSrc}
                aspectRatio="portrait"
                tags={project.tags}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;