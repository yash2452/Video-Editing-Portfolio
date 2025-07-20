
import { useState, useEffect } from "react";

export interface AnimationSettings {
  enableSwirls: boolean;
  swirlSpeed: number;
  swirlOpacity: number;
  enableHoverEffects: boolean;
  transitionDuration: number;
  enableParticles: boolean;
  backgroundAnimation: 'swirls' | 'particles' | 'gradient' | 'none';
  buttonAnimations: boolean;
  cardAnimations: boolean;
}

const defaultSettings: AnimationSettings = {
  enableSwirls: true,
  swirlSpeed: 8,
  swirlOpacity: 0.6,
  enableHoverEffects: true,
  transitionDuration: 300,
  enableParticles: false,
  backgroundAnimation: 'swirls',
  buttonAnimations: true,
  cardAnimations: true
};

export const useAnimationSettings = () => {
  const [settings, setSettings] = useState<AnimationSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('animation-settings');
    if (saved) {
      setSettings({ ...defaultSettings, ...JSON.parse(saved) });
    }
  }, []);

  const updateSettings = (newSettings: Partial<AnimationSettings> | AnimationSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('animation-settings', JSON.stringify(updated));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.setItem('animation-settings', JSON.stringify(defaultSettings));
  };

  return {
    settings,
    updateSettings,
    resetToDefaults
  };
};
