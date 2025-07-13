
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Palette, Type, Layout, Image } from "lucide-react";
import { useDesignSettings } from "@/hooks/useDesignSettings";
import { toast } from "@/hooks/use-toast";

const DesignControls = () => {
  const {
    settings,
    updateColorSettings,
    updateTypographySettings,
    updateLayoutSettings,
    updateMediaSettings,
    resetToDefaults,
  } = useDesignSettings();

  const [activeColorTab, setActiveColorTab] = useState("colors");

  const handleColorChange = (colorKey: string, value: string) => {
    updateColorSettings({ [colorKey]: value });
    toast({
      title: "Color Updated",
      description: `${colorKey} color has been changed.`,
    });
  };

  const handleTypographyChange = (typographyKey: string, value: string) => {
    updateTypographySettings({ [typographyKey]: value });
    toast({
      title: "Typography Updated",
      description: `${typographyKey} has been changed.`,
    });
  };

  const handleLayoutChange = (layoutKey: string, value: string) => {
    updateLayoutSettings({ [layoutKey]: value });
    toast({
      title: "Layout Updated",
      description: `${layoutKey} has been changed.`,
    });
  };

  const handleMediaChange = (mediaKey: string, value: string) => {
    updateMediaSettings({ [mediaKey]: value });
    toast({
      title: "Media Settings Updated",
      description: `${mediaKey} has been changed.`,
    });
  };

  const handleReset = () => {
    resetToDefaults();
    toast({
      title: "Settings Reset",
      description: "All design settings have been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Design Settings</h3>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>

      <Tabs value={activeColorTab} onValueChange={setActiveColorTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="colors" className="data-[state=active]:bg-indigo-600">
            <Palette className="h-4 w-4 mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="data-[state=active]:bg-indigo-600">
            <Type className="h-4 w-4 mr-2" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout" className="data-[state=active]:bg-indigo-600">
            <Layout className="h-4 w-4 mr-2" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-indigo-600">
            <Image className="h-4 w-4 mr-2" />
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={settings.colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
                />
                <Input
                  value={settings.colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                  placeholder="rgb(99, 102, 241)"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={settings.colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
                />
                <Input
                  value={settings.colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                  placeholder="rgb(168, 85, 247)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accent-color"
                  type="color"
                  value={settings.colors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
                />
                <Input
                  value={settings.colors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                  placeholder="rgb(236, 72, 153)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="background-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="background-color"
                  type="color"
                  value={settings.colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
                />
                <Input
                  value={settings.colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                  placeholder="rgb(17, 24, 39)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  id="text-color"
                  type="color"
                  value={settings.colors.text}
                  onChange={(e) => handleColorChange("text", e.target.value)}
                  className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
                />
                <Input
                  value={settings.colors.text}
                  onChange={(e) => handleColorChange("text", e.target.value)}
                  className="bg-gray-800 border-gray-600"
                  placeholder="rgb(255, 255, 255)"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="primary-font">Primary Font</Label>
              <Input
                id="primary-font"
                value={settings.typography.primaryFont}
                onChange={(e) => handleTypographyChange("primaryFont", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="'Inter', sans-serif"
              />
            </div>
            
            <div>
              <Label htmlFor="font-size">Base Font Size</Label>
              <Input
                id="font-size"
                value={settings.typography.fontSize}
                onChange={(e) => handleTypographyChange("fontSize", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="16px"
              />
            </div>
            
            <div>
              <Label htmlFor="heading-size">Heading Size</Label>
              <Input
                id="heading-size"
                value={settings.typography.headingSize}
                onChange={(e) => handleTypographyChange("headingSize", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="2.25rem"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="container-width">Container Max Width</Label>
              <Input
                id="container-width"
                value={settings.layout.containerWidth}
                onChange={(e) => handleLayoutChange("containerWidth", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="1280px"
              />
            </div>
            
            <div>
              <Label htmlFor="spacing">Default Spacing</Label>
              <Input
                id="spacing"
                value={settings.layout.spacing}
                onChange={(e) => handleLayoutChange("spacing", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="2rem"
              />
            </div>
            
            <div>
              <Label htmlFor="border-radius">Border Radius</Label>
              <Input
                id="border-radius"
                value={settings.layout.borderRadius}
                onChange={(e) => handleLayoutChange("borderRadius", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="1rem"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="default-video">Default Video URL</Label>
              <Input
                id="default-video"
                value={settings.media.defaultVideoUrl}
                onChange={(e) => handleMediaChange("defaultVideoUrl", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="https://example.com/video.mp4"
              />
            </div>
            
            <div>
              <Label htmlFor="default-thumbnail">Default Thumbnail URL</Label>
              <Input
                id="default-thumbnail"
                value={settings.media.defaultThumbnail}
                onChange={(e) => handleMediaChange("defaultThumbnail", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="/placeholder.svg"
              />
            </div>
            
            <div>
              <Label htmlFor="placeholder-icon">Placeholder Icon</Label>
              <Input
                id="placeholder-icon"
                value={settings.media.placeholderIcon}
                onChange={(e) => handleMediaChange("placeholderIcon", e.target.value)}
                className="bg-gray-800 border-gray-600"
                placeholder="🎥"
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-md font-medium mb-3">Video Placeholder Links</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="sample-long-form">Sample Long Form Video</Label>
                <Input
                  id="sample-long-form"
                  className="bg-gray-800 border-gray-600"
                  placeholder="https://example.com/longform-sample.mp4"
                />
              </div>
              <div>
                <Label htmlFor="sample-short-form">Sample Short Form Video</Label>
                <Input
                  id="sample-short-form"
                  className="bg-gray-800 border-gray-600"
                  placeholder="https://example.com/shortform-sample.mp4"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignControls;
