import { Button } from "@/components/ui/button";
import SoftwareIcon from "./SoftwareIcons";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import YouTubePlayer from "react-player/youtube";

const Hero = () => {
  const { profileData, showreelVideo } = usePortfolioData();

  const softwareIcons = [
    { name: "premiere", label: "Premiere Pro" },
    { name: "aftereffects", label: "After Effects" },
    { name: "davinci", label: "DaVinci Resolve" },
    { name: "photoshop", label: "Photoshop" },
    { name: "illustrator", label: "Illustrator" },
    { name: "audition", label: "Audition" },
    { name: "figma", label: "Figma" }, // Added Figma icon
  ];

  return (
    <section id="home" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {profileData.name}
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">{profileData.bio}</p>
        </div>

        {/* Tools Marquee */}
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-marquee">
            {softwareIcons.map((tool, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg shadow-lg">
                <SoftwareIcon name={tool.name} size={32} />
                <span className="text-white text-sm">{tool.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
      </div>
    </div>
  );

  return (
    <section id="home" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                  No video available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Software Icons */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">Tools I Use</h3>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {softwareIcons.map((tool, index) => (
              <div
                key={index}
                className={`p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg ${settings.enableHoverEffects ? 'transform hover:scale-110 hover:bg-gray-700/50' : ''} transition-all duration-${settings.transitionDuration} cursor-pointer border border-gray-700/50`}
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
