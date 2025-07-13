import React from 'react';

interface SoftwareIconProps {
  name: 'premiere' | 'aftereffects' | 'davinci' | 'photoshop' | 'illustrator' | 'audition';
  size?: number;
  className?: string;
}

const SoftwareIcon: React.FC<SoftwareIconProps> = ({ name, className = '' }) => {
  const iconMap = {
    premiere: '/software/premiere.png',
    aftereffects: '/software/aftereffects.png',
    davinci: '/software/davinci.png',
    photoshop: '/software/photoshop.png',
    illustrator: '/software/illustrator.png',
    audition: '/software/audition.png'
  };
  
  return (
    <img
      src={iconMap[name]}
      alt={`${name} icon`}
      className={`object-contain ${className}`}
    />
  );
};

export default SoftwareIcon;