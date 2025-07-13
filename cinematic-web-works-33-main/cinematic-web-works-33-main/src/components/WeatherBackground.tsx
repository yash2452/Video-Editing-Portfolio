import React, { useEffect, useState } from "react";

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
type Season = typeof SEASONS[number];

function getSeasonColor(season: Season) {
  switch (season) {
    case "spring":
      return "#4b5563"; // muted green/gray
    case "summer":
      return "#374151"; // muted blue/gray
    case "autumn":
      return "#6b4f2b"; // muted brown
    case "winter":
      return "#334155"; // muted blue
    default:
      return "#374151";
  }
}

const WeatherBackground: React.FC = () => {
  const [season, setSeason] = useState<Season>("spring");
  const [showRain, setShowRain] = useState(false);
  const [showSnow, setShowSnow] = useState(false);
  const [cloudKey, setCloudKey] = useState(0); // For triggering re-mount/animation

  // Cycle seasons every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSeason((prev) => {
        const idx = SEASONS.indexOf(prev);
        return SEASONS[(idx + 1) % SEASONS.length];
      });
      setCloudKey((k) => k + 1); // trigger cloud animation
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Randomly show rain or snow for a few seconds
  useEffect(() => {
    let rainTimeout: NodeJS.Timeout;
    let snowTimeout: NodeJS.Timeout;
    if (season === "spring" || season === "autumn") {
      setShowRain(true);
      rainTimeout = setTimeout(() => setShowRain(false), 5000);
    } else if (season === "winter") {
      setShowSnow(true);
      snowTimeout = setTimeout(() => setShowSnow(false), 6000);
    } else {
      setShowRain(false);
      setShowSnow(false);
    }
    return () => {
      clearTimeout(rainTimeout);
      clearTimeout(snowTimeout);
    };
  }, [season]);

  // Clouds always present, animate in/out sideways
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${getSeasonColor(season)} 0%, #111827 100%)`,
        transition: "background 2s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Clouds with sideways and exit animation */}
      <svg
        key={cloudKey}
        width="100%"
        height="100%"
        className="absolute left-0 top-0 cloud-animate"
        style={{ zIndex: 1 }}
      >
        <g>
          <ellipse cx="15%" cy="18%" rx="120" ry="40" fill="#22292f" opacity="0.5" />
          <ellipse cx="40%" cy="12%" rx="90" ry="30" fill="#1e293b" opacity="0.4" />
          <ellipse cx="70%" cy="20%" rx="110" ry="35" fill="#22292f" opacity="0.5" />
          <ellipse cx="85%" cy="10%" rx="70" ry="22" fill="#1e293b" opacity="0.3" />
        </g>
      </svg>

      {/* Rain with sideways and exit animation */}
      {showRain && (
        <svg
          key={season + "-rain"}
          width="100%"
          height="100%"
          className="absolute left-0 top-0 rain-animate"
          style={{ zIndex: 2 }}
        >
          {[...Array(30)].map((_, i) => (
            <rect
              key={i}
              x={`${(i * 3 + (i % 2 ? 10 : 0))}%`}
              y="-10"
              width="2"
              height="30"
              fill="#374151"
              opacity="0.25"
            >
              <animate
                attributeName="y"
                values="-10;110%"
                dur={`${1.2 + (i % 7) * 0.2}s`}
                repeatCount="indefinite"
                begin={`${(i % 10) * 0.2}s`}
              />
            </rect>
          ))}
        </svg>
      )}

      {/* Snow with sideways and exit animation */}
      {showSnow && (
        <svg
          key={season + "-snow"}
          width="100%"
          height="100%"
          className="absolute left-0 top-0 snow-animate"
          style={{ zIndex: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={`${(i * 5 + (i % 3 ? 10 : 0))}%`}
              cy="-10"
              r={2 + (i % 3)}
              fill="#e5e7eb"
              opacity="0.15"
            >
              <animate
                attributeName="cy"
                values="-10;110%"
                dur={`${2 + (i % 5) * 0.5}s`}
                repeatCount="indefinite"
                begin={`${(i % 10) * 0.3}s`}
              />
            </circle>
          ))}
        </svg>
      )}

      {/* Season indicator (optional, bottom right) */}
      <div
        className="absolute bottom-4 right-6 text-xs font-bold text-gray-500 opacity-60 select-none"
        style={{ zIndex: 3, letterSpacing: 2 }}
      >
        {season.charAt(0).toUpperCase() + season.slice(1)}
      </div>

      {/* Animations for sideways and exit */}
      <style>{`
        .cloud-animate {
          animation: cloudSideExit 2s cubic-bezier(0.4,0,0.2,1);
        }
        .rain-animate, .snow-animate {
          animation: weatherSideExit 2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes cloudSideExit {
          0% { opacity: 0; transform: translateX(-80px);}
          10% { opacity: 1; transform: translateX(0);}
          90% { opacity: 1; transform: translateX(0);}
          100% { opacity: 0; transform: translateX(120px);}
        }
        @keyframes weatherSideExit {
          0% { opacity: 0; transform: translateX(40px);}
          10% { opacity: 1; transform: translateX(0);}
          90% { opacity: 1; transform: translateX(0);}
          100% { opacity: 0; transform: translateX(-80px);}
        }
      `}</style>
    </div>
  );
};

export default WeatherBackground;

// This file already provides animated weather backgrounds with clouds, rain, and snow.
// To activate, render <WeatherBackground /> at the root of your app/layout.
