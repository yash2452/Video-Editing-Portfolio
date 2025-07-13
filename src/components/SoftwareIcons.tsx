import React from 'react';

interface SoftwareIconProps {
  name: 'premiere' | 'aftereffects' | 'davinci' | 'photoshop' | 'illustrator' | 'audition';
  size?: number;
  className?: string;
}

const SoftwareIcon: React.FC<SoftwareIconProps> = ({ name, size = 24, className = '' }) => {
  const iconPaths = {
    premiere: '/lovable-uploads/2504c02e-6e05-432b-888c-11d601205653.png',
    aftereffects: '/lovable-uploads/f1192012-5880-49d3-9510-11fabb1a8a62.png',
    davinci: '/lovable-uploads/e9ba4720-e4a2-4bea-a004-542c3f56c6ff.png',
    photoshop: '/lovable-uploads/27945ce8-92fe-40c7-af83-1ca753793fbc.png',
    illustrator: '/lovable-uploads/5a0e71df-70c9-4ebe-a397-6c6de66913a3.png',
    audition: '/lovable-uploads/4567b51c-1463-46a7-a71e-7d970a3d89d7.png'
  };

  return (
    <img 
      src={iconPaths[name]} 
      alt={`${name} icon`}
      width={size}
      height={size}
      className={`${className} rounded-lg`}
      style={{ width: size, height: size }}
    />
  );
};

export default SoftwareIcon;