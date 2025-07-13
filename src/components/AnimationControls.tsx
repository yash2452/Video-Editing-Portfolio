
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { RotateCcw } from "lucide-react";

const AnimationControls = () => {
  const { settings, updateSettings, resetToDefaults } = useAnimationSettings();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Animation Settings</h3>
        <Button onClick={resetToDefaults} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label>Background Animation</Label>
          <Select
            value={settings.backgroundAnimation}
            onValueChange={(value: 'swirls' | 'particles' | 'gradient' | 'none') => 
              updateSettings({ backgroundAnimation: value })
            }
          >
            <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="swirls">Swirling Lines</SelectItem>
              <SelectItem value="particles">Particles</SelectItem>
              <SelectItem value="gradient">Gradient</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label>Enable Swirl Animation</Label>
          <Switch
            checked={settings.enableSwirls}
            onCheckedChange={(checked) => updateSettings({ enableSwirls: checked })}
          />
        </div>

        {settings.enableSwirls && (
          <>
            <div className="space-y-2">
              <Label>Swirl Speed: {settings.swirlSpeed}s</Label>
              <Slider
                value={[settings.swirlSpeed]}
                onValueChange={([value]) => updateSettings({ swirlSpeed: value })}
                min={3}
                max={20}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Swirl Opacity: {Math.round(settings.swirlOpacity * 100)}%</Label>
              <Slider
                value={[settings.swirlOpacity]}
                onValueChange={([value]) => updateSettings({ swirlOpacity: value })}
                min={0.1}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <Label>Hover Effects</Label>
          <Switch
            checked={settings.enableHoverEffects}
            onCheckedChange={(checked) => updateSettings({ enableHoverEffects: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Button Animations</Label>
          <Switch
            checked={settings.buttonAnimations}
            onCheckedChange={(checked) => updateSettings({ buttonAnimations: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Card Animations</Label>
          <Switch
            checked={settings.cardAnimations}
            onCheckedChange={(checked) => updateSettings({ cardAnimations: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label>Transition Duration: {settings.transitionDuration}ms</Label>
          <Slider
            value={[settings.transitionDuration]}
            onValueChange={([value]) => updateSettings({ transitionDuration: value })}
            min={100}
            max={1000}
            step={50}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
