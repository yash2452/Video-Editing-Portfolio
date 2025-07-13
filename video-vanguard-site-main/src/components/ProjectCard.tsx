import React from 'react';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from './VideoPlayer';

interface ProjectCardProps {
  title: string;
  description: string;
  videoSrc?: string;
  videoPoster?: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  tags?: string[];
  layout?: 'default' | 'reverse';
  className?: string;
  style?: React.CSSProperties;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  videoSrc,
  videoPoster,
  aspectRatio,
  tags = [],
  layout = 'default',
  className = '',
  style
}) => {
  const isLandscape = aspectRatio === 'landscape';
  const isReverse = layout === 'reverse' && isLandscape;

  if (aspectRatio === 'portrait') {
    // Portrait layout - centered with compact design
    return (
      <div 
        className={`bg-card border border-border rounded-xl p-4 sm:p-6 card-hover ${className}`}
        style={style}
      >
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <div className="w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[240px] px-3 sm:px-4">
            <VideoPlayer
              src={videoSrc}
              poster={videoPoster}
              title={title}
              aspectRatio={aspectRatio}
              className="rounded-lg overflow-hidden"
            />
          </div>
          
          <div className="space-y-2 sm:space-y-3 px-3 sm:px-4">
            <h4 className="text-base sm:text-lg lg:text-xl font-bold leading-tight">{title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              {description}
            </p>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Landscape layout - responsive side-by-side
  return (
    <div 
      className={`bg-card border border-border rounded-xl overflow-hidden card-hover ${className}`}
      style={style}
    >
      <div className={`flex flex-col ${isLandscape ? 'lg:flex-row' : ''} ${isReverse ? 'lg:flex-row-reverse' : ''}`}>
        {/* Video Section */}
        <div className={`${isLandscape ? 'lg:w-1/2' : 'w-full'} flex-shrink-0`}>
          <VideoPlayer
            src={videoSrc}
            poster={videoPoster}
            title={title}
            aspectRatio={aspectRatio}
            className="h-full"
          />
        </div>
        
        {/* Content Section */}
        <div className={`${isLandscape ? 'lg:w-1/2' : 'w-full'} p-6 sm:p-8 lg:p-10 flex flex-col justify-center`}>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <h4 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-foreground">{title}</h4>
            
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;