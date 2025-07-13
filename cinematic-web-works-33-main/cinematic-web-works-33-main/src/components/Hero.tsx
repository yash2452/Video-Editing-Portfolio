import { Button } from "@/components/ui/button";
import VideoPlayer from "./VideoPlayer";
import YouTubePlayer from "./YouTubePlayer";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import SoftwareIcon from "./SoftwareIcons";

const Hero = () => {
  const { profileData, showreelVideo } = usePortfolioData();
  const { settings } = useAnimationSettings();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const softwareIcons = [
    { name: "premiere" as const, label: "Premiere Pro" },
    { name: "aftereffects" as const, label: "After Effects" },
    { name: "davinci" as const, label: "DaVinci Resolve" },
    { name: "photoshop" as const, label: "Photoshop" },
    { name: "illustrator" as const, label: "Illustrator" },
    { name: "audition" as const, label: "Audition" }
  ];

  const getBackgroundAnimation = () => {
    if (!settings.enableSwirls || settings.backgroundAnimation === 'none') return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ opacity: settings.swirlOpacity }}>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          <path 
            d="M100,500 Q300,100 500,500 T900,500" 
            fill="none" 
            stroke="url(#gradient1)" 
            strokeWidth="3"
            className="animate-pulse"
            style={{
              animation: `swirl1 ${settings.swirlSpeed}s ease-in-out infinite`,
              transformOrigin: 'center'
            }}
          />
          <path 
            d="M200,300 Q500,700 800,300 T400,300" 
            fill="none" 
            stroke="url(#gradient2)" 
            strokeWidth="2"
            style={{
              animation: `swirl2 ${settings.swirlSpeed + 4}s ease-in-out infinite reverse`,
              transformOrigin: 'center'
            }}
          />
          <path 
            d="M50,700 Q400,200 750,700 T950,400" 
            fill="none" 
            stroke="url(#gradient1)" 
            strokeWidth="2"
            opacity="0.7"
            style={{
              animation: `swirl3 ${settings.swirlSpeed + 2}s ease-in-out infinite`,
              transformOrigin: 'center'
            }}
          />
        </svg>
      </div>
    );
  };

  return (
    <section id="home" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {getBackgroundAnimation()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-16 gap-12">
          <div className="relative">
            {/* Additional animated rings behind profile */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-spin" style={{ animation: 'spin 20s linear infinite' }}></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500/15 to-blue-500/15 animate-spin" style={{ animation: 'spin 15s linear infinite reverse' }}></div>
            
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-500 shadow-2xl relative z-10">
              <img 
                src="/img/profile.png"  // Updated path to match your public/img folder structure
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center z-20">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
          </div>
          
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {profileData.name}
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {profileData.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                onClick={scrollToContact}
                className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-${settings.transitionDuration} ${settings.buttonAnimations ? 'transform hover:scale-105' : ''}`}
              >
                Book a Call
              </Button>
              <Button 
                onClick={scrollToProjects}
                className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-${settings.transitionDuration} ${settings.buttonAnimations ? 'transform hover:scale-110' : ''} ring-4 ring-purple-400/50 hover:ring-purple-300/70 text-lg`}
              >
                🎬 View Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Main Showreel */}
        <div className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Featured Showreel</h2>
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800">
              {showreelVideo ? (
                <YouTubePlayer
                  videoId={showreelVideo.url}
                  className="w-full aspect-video"
                  title="Featured Showreel"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎬</span>
                    </div>
                    <p className="text-gray-400 text-lg">Main Showreel Video</p>
                    <p className="text-gray-500 text-sm">Upload your featured video in admin panel</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Software Icons */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">Tools I Use</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {softwareIcons.map((tool, index) => (
              <div
                key={index}
                className={`w-16 h-16 bg-gray-800/50 rounded-xl flex items-center justify-center shadow-lg ${
                  settings.enableHoverEffects ? 'transform hover:scale-110' : ''
                } transition-all duration-${settings.transitionDuration} cursor-pointer p-3`}
                title={tool.label}
              >
                <SoftwareIcon name={tool.name} className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes swirl1 {
          0%, 100% { 
            transform: rotate(0deg) scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: rotate(180deg) scale(1.1); 
            opacity: 0.8; 
          }
        }
        
        @keyframes swirl2 {
          0%, 100% { 
            transform: rotate(0deg) translateX(0px); 
            opacity: 0.4; 
          }
          33% { 
            transform: rotate(120deg) translateX(20px); 
            opacity: 0.7; 
          }
          66% { 
            transform: rotate(240deg) translateX(-20px); 
            opacity: 0.5; 
          }
        }
        
        @keyframes swirl3 {
          0%, 100% { 
            transform: rotate(0deg) scale(1) translateY(0px); 
            opacity: 0.3; 
          }
          50% { 
            transform: rotate(180deg) scale(0.9) translateY(10px); 
            opacity: 0.6; 
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
