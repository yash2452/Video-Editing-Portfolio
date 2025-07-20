import { Button } from "@/components/ui/button";
import VideoPlayer from "./VideoPlayer";
import YouTubePlayer from "./YouTubePlayer";
import SoftwareIcon from "./SoftwareIcons";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { useDesignSettings } from "@/hooks/useDesignSettings";

const Hero = () => {
  const { profileData, showreelVideo } = usePortfolioData();
  const { settings } = useAnimationSettings();
  const { settings: designSettings } = useDesignSettings();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const softwareIcons = [
    { name: "Adobe Premiere Pro", key: "premiere" as const },
    { name: "Adobe After Effects", key: "aftereffects" as const },
    { name: "DaVinci Resolve", key: "davinci" as const },
    { name: "Adobe Photoshop", key: "photoshop" as const },
    { name: "Adobe Illustrator", key: "illustrator" as const },
    { name: "Adobe Audition", key: "audition" as const },
  ];

  const getBackgroundAnimation = () => {
    if (!settings.enableSwirls || settings.backgroundAnimation === 'none') return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ opacity: settings.swirlOpacity }}>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={designSettings.colors.primary} stopOpacity="0.6" />
              <stop offset="50%" stopColor={designSettings.colors.secondary} stopOpacity="0.4" />
              <stop offset="100%" stopColor={designSettings.colors.accent} stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={designSettings.colors.primary} stopOpacity="0.5" />
              <stop offset="50%" stopColor={designSettings.colors.secondary} stopOpacity="0.3" />
              <stop offset="100%" stopColor={designSettings.colors.accent} stopOpacity="0.5" />
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
    <section 
      id="home" 
      className="py-20 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${designSettings.colors.background}, ${designSettings.colors.secondary}20)`,
        color: designSettings.colors.text 
      }}
    >
      {getBackgroundAnimation()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-16 gap-12">
          <div className="relative">
            {/* Additional animated rings behind profile */}
            <div 
              className="absolute inset-0 rounded-full animate-spin" 
              style={{ 
                background: `linear-gradient(45deg, ${designSettings.colors.primary}20, ${designSettings.colors.accent}20)`,
                animation: 'spin 20s linear infinite' 
              }}
            ></div>
            <div 
              className="absolute inset-2 rounded-full animate-spin" 
              style={{ 
                background: `linear-gradient(45deg, ${designSettings.colors.accent}15, ${designSettings.colors.secondary}15)`,
                animation: 'spin 15s linear infinite reverse' 
              }}
            ></div>
            
            <div 
              className="w-48 h-48 rounded-full overflow-hidden border-4 shadow-2xl relative z-10"
              style={{ borderColor: designSettings.colors.primary }}
            >
              <img 
                src="/lovable-uploads/a0f6e820-7356-4480-8442-bcfd661d6ba7.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center z-20">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
          </div>
          
          <div className="text-center md:text-left max-w-2xl">
            <h1 
              className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
              style={{ 
                color: designSettings.colors.text,
                fontSize: designSettings.typography.headingSize 
              }}
            >
              Hi, I'm{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  background: `linear-gradient(45deg, ${designSettings.colors.primary}, ${designSettings.colors.accent})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                {profileData.name}
              </span>
            </h1>
            <p 
              className="text-xl leading-relaxed mb-8"
              style={{ 
                color: `${designSettings.colors.text}CC`,
                fontSize: designSettings.typography.fontSize 
              }}
            >
              {profileData.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                onClick={scrollToContact}
                className={`font-bold py-3 px-8 rounded-full shadow-lg transition-all ${settings.buttonAnimations ? 'transform hover:scale-105' : ''}`}
                style={{ 
                  backgroundColor: designSettings.colors.primary,
                  color: designSettings.colors.background,
                  transitionDuration: `${settings.transitionDuration}ms`
                }}
              >
                Book a Call
              </Button>
              <Button 
                onClick={scrollToProjects}
                className={`font-bold py-4 px-10 rounded-full shadow-xl transition-all ${settings.buttonAnimations ? 'transform hover:scale-110' : ''} ring-4 text-lg`}
                style={{ 
                  background: `linear-gradient(45deg, ${designSettings.colors.accent}, ${designSettings.colors.primary})`,
                  color: designSettings.colors.background,
                  ringColor: `${designSettings.colors.accent}50`,
                  transitionDuration: `${settings.transitionDuration}ms`
                }}
              >
                🎬 View Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Main Showreel */}
        <div className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-3xl font-bold text-center mb-8"
              style={{ color: designSettings.colors.text }}
            >
              Showreel
            </h2>
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800">
              <YouTubePlayer
                videoId="https://www.youtube.com/watch?v=-dr-wvPjGFo"
                className="w-full aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Software Icons */}
        <div className="text-center">
          <h3 
            className="text-2xl font-semibold mb-8"
            style={{ color: designSettings.colors.text }}
          >
            Tools I Use
          </h3>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {softwareIcons.map((tool, index) => (
              <div
                key={index}
                className={`p-3 backdrop-blur-sm rounded-xl shadow-lg ${settings.enableHoverEffects ? 'transform hover:scale-110' : ''} transition-all cursor-pointer border`}
                style={{ 
                  backgroundColor: `${designSettings.colors.background}50`,
                  borderColor: `${designSettings.colors.primary}30`,
                  transitionDuration: `${settings.transitionDuration}ms`
                }}
                title={tool.name}
              >
                <SoftwareIcon name={tool.key} size={48} />
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

