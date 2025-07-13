import { useState, useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl?: string;  // Direct video file URL
  videoType?: 'youtube' | 'direct'; // Add this to distinguish between video types
  youtubeId?: string;
  thumbnail?: string;
  tags?: string[];
  software?: string[];
  clientName?: string;
  duration?: string;
  year?: string;
}

export interface ProfileData {
  name: string;
  bio: string;
  email: string;
  socials: {
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

export interface ShowreelVideo {
  url: string;
  thumbnail?: string;
}

const defaultProfile: ProfileData = {
  name: "Yash Tripathi",
  bio: "I'm a passionate video editor crafting compelling narratives and visually stunning content. With expertise in long-form documentaries and engaging short-form content, I bring stories to life through innovative editing techniques.",
  email: "yashtripathi2405.com",
  socials: {
    instagram: "https://instagram.com/yashtripathi2405/",
    twitter: "https://x.com/Yash240502",
    linkedin: "https://www.linkedin.com/in/tripathiyash21/"
  }
};

// Add a default showreel video
const defaultShowreel: ShowreelVideo = {
  url: "https://youtu.be/-dr-wvPjGFo",
  thumbnail: "" // Optional: add a thumbnail path if needed
};

const defaultLongFormProjects: Project[] = [
  {
    id: "1",
    title: "Documentary: Creative Minds",
    description: "A deep dive into the creative minds of modern artists, showcasing complex narratives through intimate interviews and stunning visuals.",
    category: "Documentary",
    tags: ["Documentary", "Color Grading", "Audio Sync", "Storytelling"],
    software: ["premiere", "aftereffects", "audition"],
    youtubeId: "fNh_GyRbJDA&t=7s",
    clientName: "Creative Studios",
    duration: "45 min",
    year: "2024"
  },
  {
    id: "2",
    title: "Podcast Trailer",
    description: "Transformed raw audio podcasts into visually compelling episodes for a technology-focused show. The project featured dynamic text overlays, relevant B-roll footage, and seamless audio-visual synchronization to enhance the viewing experience and increase audience retention.",
    category: "Podcast",
    tags: ["Podcast", "Motion Graphics", "B-Roll", "Audio Enhancement"],
    software: ["premiere", "aftereffects", "photoshop"],
    youtubeId: "Kl-I7sUcAOY",
    clientName: "Tech Talk Weekly",
    duration: "25 min",
    year: "2024"
  },
  {
    id: "3",
    title: "Motion Design ",
    description: "Created captivating motion graphics and animated sequences for a major brand campaign. This project highlighted advanced skills in visual storytelling through animation, featuring custom 2D/3D elements, smooth transitions, and brand-consistent design language.",
    category: "Motion Design",
    tags: ["Motion Graphics", "2D Animation", "Brand Design", "Visual Effects"],
    software: ["aftereffects", "illustrator", "photoshop"],
    youtubeId: "aJeJwAgjtaI",
    clientName: "Global Brand Co.",
    duration: "3 min",
    year: "2024"
  },
  {
    id: "4",
    title: "Educational Infotainment Series",
    description: "Developed an engaging infotainment series that blends educational content with entertaining visuals. The project focused on clear information delivery, dynamic typography, and fast-paced editing to maintain viewer attention while effectively communicating complex topics.",
    category: "Infotainment",
    tags: ["Education", "Typography", "Fast-Paced Editing", "Information Design"],
    software: ["premiere", "aftereffects", "illustrator"],
    youtubeId: "eVjfpr0j6Yw",
    clientName: "EduMedia Inc.",
    duration: "12 min",
    year: "2024"
  }
];

const defaultShortFormProjects: Project[] = [
  {
    id: "s1",
    title: "Brand Campaign",
    description: "Dynamic promotional video optimized for social media engagement with bold visuals and compelling messaging.",
    category: "Social Media",
    tags: ["Social Media", "Brand", "Promotional"],
    software: ["premiere", "aftereffects"],
    youtubeId: "dQw4w9WgXcQ",
    clientName: "Brand Co",
    duration: "60s",
    year: "2024"
  },
  {
    id: "s2",
    title: "Sutox Brand Showcase",
    description: "High-energy brand showcase video for Sufox, featuring dynamic transitions and modern aesthetics to capture attention and drive interest.",
    category: "Brand",
    tags: ["Brand", "Showcase", "Dynamic"],
    software: ["premiere", "photoshop"],
    youtubeId: "dQw4w9WgXcQ",
    clientName: "Sufox",
    duration: "45s",
    year: "2024"
  },
  {
    id: "s3",
    title: "Josh Lyn Highlight Reel",
    description: "Professional highlight reel showcasing key moments and achievements, edited for maximum impact and visual appeal.",
    category: "Personal Brand",
    tags: ["Highlight Reel", "Personal Brand", "Professional"],
    software: ["premiere", "aftereffects", "audition"],
    youtubeId: "dQw4w9WgXcQ",
    clientName: "Josh Lyn",
    duration: "90s",
    year: "2024"
  },
  {
    id: "s4",
    title: "Devin Jathe Content",
    description: "Engaging short-form content optimized for platform-specific requirements, focusing on audience retention and viral potential.",
    category: "Content Creation",
    tags: ["Content", "Viral", "Platform Optimized"],
    software: ["premiere", "photoshop"],
    youtubeId: "dQw4w9WgXcQ",
    clientName: "Devin Jathe",
    duration: "30s",
    year: "2024"
  },
  {
    id: "s5",
    title: "Alex Harmozi Motivational",
    description: "Powerful motivational content featuring clean editing, impactful messaging, and visual elements designed to inspire and engage viewers.",
    category: "Motivational",
    tags: ["Motivational", "Impactful", "Clean Edit"],
    software: ["premiere", "aftereffects"],
    youtubeId: "dQw4w9WgXcQ",
    clientName: "Alex Harmozi",
    duration: "75s",
    year: "2024"
  },
  {
    id: "s6",
    title: "Ali Abdel Feature",
    description: "Professional feature video showcasing personal brand and expertise, with polished editing and strategic pacing for maximum engagement.",
    category: "Feature",
    tags: ["Feature", "Professional", "Personal Brand"],
    software: ["premiere", "aftereffects", "photoshop"],
    youtubeId: "dQw4w9WgXcQ",
    clientName: "Ali Abdel",
    duration: "2 min",
    year: "2024"
  }
];

export const usePortfolioData = () => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
  const [longFormProjects, setLongFormProjects] = useState<Project[]>(defaultLongFormProjects);
  const [shortFormProjects, setShortFormProjects] = useState<Project[]>(defaultShortFormProjects);
  const [showreelVideo, setShowreelVideo] = useState<ShowreelVideo | null>(defaultShowreel);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('portfolio-profile');
    const savedLongForm = localStorage.getItem('portfolio-longform');
    const savedShortForm = localStorage.getItem('portfolio-shortform');
    const savedShowreel = localStorage.getItem('portfolio-showreel');

    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    if (savedLongForm) {
      setLongFormProjects(JSON.parse(savedLongForm));
    }
    if (savedShortForm) {
      setShortFormProjects(JSON.parse(savedShortForm));
    }
    if (savedShowreel) {
      setShowreelVideo(JSON.parse(savedShowreel));
    }
  }, []);

  const updateProfile = (updates: Partial<ProfileData>) => {
    const newProfile = { ...profileData, ...updates };
    setProfileData(newProfile);
    localStorage.setItem('portfolio-profile', JSON.stringify(newProfile));
  };

  const addProject = (project: Omit<Project, 'id'> & { type: 'long' | 'short' }) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };

    if (project.type === 'long') {
      const newLongForm = [...longFormProjects, newProject];
      setLongFormProjects(newLongForm);
      localStorage.setItem('portfolio-longform', JSON.stringify(newLongForm));
    } else {
      const newShortForm = [...shortFormProjects, newProject];
      setShortFormProjects(newShortForm);
      localStorage.setItem('portfolio-shortform', JSON.stringify(newShortForm));
    }
  };

  const deleteProject = (id: string, type: 'long' | 'short') => {
    if (type === 'long') {
      const newLongForm = longFormProjects.filter(p => p.id !== id);
      setLongFormProjects(newLongForm);
      localStorage.setItem('portfolio-longform', JSON.stringify(newLongForm));
    } else {
      const newShortForm = shortFormProjects.filter(p => p.id !== id);
      setShortFormProjects(newShortForm);
      localStorage.setItem('portfolio-shortform', JSON.stringify(newShortForm));
    }
  };

  const updateShowreel = (video: ShowreelVideo) => {
    setShowreelVideo(video);
    localStorage.setItem('portfolio-showreel', JSON.stringify(video));
  };

  return {
    profileData,
    longFormProjects,
    shortFormProjects,
    showreelVideo,
    updateProfile,
    addProject,
    deleteProject,
    updateShowreel,
  };
};
