
import { useState, useEffect } from "react";

interface DesignSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    primaryFont: string;
    fontSize: string;
    headingSize: string;
  };
  layout: {
    containerWidth: string;
    spacing: string;
    borderRadius: string;
  };
  media: {
    defaultVideoUrl: string;
    defaultThumbnail: string;
    placeholderIcon: string;
  };
}

const DEFAULT_SETTINGS: DesignSettings = {
  colors: {
    primary: "rgb(99, 102, 241)", // indigo-500
    secondary: "rgb(168, 85, 247)", // purple-500
    accent: "rgb(236, 72, 153)", // pink-500
    background: "rgb(17, 24, 39)", // gray-900
    text: "rgb(255, 255, 255)", // white
  },
  typography: {
    primaryFont: "'Inter', sans-serif",
    fontSize: "16px",
    headingSize: "2.25rem", // text-4xl
  },
  layout: {
    containerWidth: "1280px", // max-w-7xl
    spacing: "2rem", // space-8
    borderRadius: "1rem", // rounded-2xl
  },
  media: {
    defaultVideoUrl: "",
    defaultThumbnail: "/placeholder.svg",
    placeholderIcon: "🎥",
  },
};

export const useDesignSettings = () => {
  const [settings, setSettings] = useState<DesignSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem('design-settings');
    if (savedSettings) {
      setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
    }
  }, []);

  const updateSettings = (newSettings: Partial<DesignSettings> | DesignSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('design-settings', JSON.stringify(updatedSettings));
    
    // Apply colors to CSS variables immediately
    if ('colors' in newSettings && newSettings.colors) {
      const root = document.documentElement;
      Object.entries(newSettings.colors).forEach(([key, value]) => {
        if (typeof value === "string") {
          root.style.setProperty(`--${key}`, value);
        }
      });
    }
  };

  const updateColorSettings = (colors: Partial<DesignSettings['colors']>) => {
    updateSettings({ colors: { ...settings.colors, ...colors } });
  };

  const updateTypographySettings = (typography: Partial<DesignSettings['typography']>) => {
    updateSettings({ typography: { ...settings.typography, ...typography } });
  };

  const updateLayoutSettings = (layout: Partial<DesignSettings['layout']>) => {
    updateSettings({ layout: { ...settings.layout, ...layout } });
  };

  const updateMediaSettings = (media: Partial<DesignSettings['media']>) => {
    updateSettings({ media: { ...settings.media, ...media } });
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('design-settings');
    
    // Reset CSS variables to defaults
    const root = document.documentElement;
    Object.entries(DEFAULT_SETTINGS.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  return {
    settings,
    updateSettings,
    updateColorSettings,
    updateTypographySettings,
    updateLayoutSettings,
    updateMediaSettings,
    resetToDefaults,
  };
};
