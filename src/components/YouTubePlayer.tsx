import React from 'react';

interface YouTubePlayerProps {
  videoId: string;
  className?: string;
  title?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  videoId, 
  className = "w-full aspect-video", 
  title = "YouTube video player" 
}) => {
  // Extract video ID from various YouTube URL formats
  const extractVideoId = (url: string): string => {
    // Handle full YouTube URLs
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[7].length === 11) {
      return match[7];
    }
    
    // Handle already extracted IDs
    if (url.length === 11) {
      return url;
    }
    
    // Handle short URLs
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) {
      return shortMatch[1];
    }
    
    return url;
  };

  const cleanVideoId = extractVideoId(videoId);

  return (
    <div className={className}>
      <iframe
        src={`https://www.youtube.com/embed/${cleanVideoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-xl"
      />
    </div>
  );
};

export default YouTubePlayer;