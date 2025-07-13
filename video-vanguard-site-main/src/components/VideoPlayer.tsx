import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  aspectRatio = 'landscape',
  autoPlay = false,
  muted = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[9/16] max-w-[300px] mx-auto';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div 
      className={`video-container relative group ${getAspectRatioClass()} ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {src ? (
        <>
          {isYouTubeUrl(src) ? (
            <iframe
              src={getYouTubeEmbedUrl(src)}
              className="w-full h-full object-cover rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                autoPlay={autoPlay}
                muted={muted}
                loop
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Video Controls Overlay */}
              <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={togglePlay}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white ml-0.5" />
                    )}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleMute}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5 text-white" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-white" />
                    )}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20"
                  >
                    <Maximize className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        // Placeholder when no video source
        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
          <div className="text-center p-8">
            <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">{title}</p>
            <p className="text-sm opacity-75 mt-2">Video placeholder</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;