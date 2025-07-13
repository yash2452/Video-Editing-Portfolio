import React from 'react';

const ToolIcons: React.FC = () => {
  const tools = [
    { name: 'Premiere Pro', src: '/lovable-uploads/72a3125a-cc25-4141-b0cd-2f9375ced201.png', alt: 'Adobe Premiere Pro' },
    { name: 'After Effects', src: '/lovable-uploads/8b64ebfb-20e1-449f-944c-48c05d7e1ba9.png', alt: 'Adobe After Effects' },
    { name: 'DaVinci Resolve', src: '/lovable-uploads/c3ff4f7f-9b17-435a-a3e0-27b72596b737.png', alt: 'DaVinci Resolve' },
    { name: 'Photoshop', src: '/lovable-uploads/57ae3bcd-3391-4d69-8e1d-8839a8e30cae.png', alt: 'Adobe Photoshop' },
    { name: 'Illustrator', src: '/lovable-uploads/93090be2-7024-4f3e-9e5c-2fe495fb11a2.png', alt: 'Adobe Illustrator' },
    { name: 'Audition', src: '/lovable-uploads/5c0d2a82-5cdf-474d-8af5-0bff2778ef60.png', alt: 'Adobe Audition' },
    { name: 'Animate', src: '/lovable-uploads/07a59e92-4f97-4477-a883-2dc889257b8e.png', alt: 'Adobe Animate' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {tools.map((tool, index) => (
        <div 
          key={index}
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-card border border-border hover:scale-105 transition-transform duration-200"
        >
          <img
            src={tool.src}
            alt={tool.alt}
            className="w-full h-full object-cover"
            title={tool.name}
          />
        </div>
      ))}
    </div>
  );
};

export default ToolIcons;