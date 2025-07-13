import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

const animationOptions = [
	{ value: "none", label: "None" },
	{ value: "particles", label: "Particles" },
	{ value: "waves", label: "Waves" },
	{ value: "gradient", label: "Animated Gradient" },
	{ value: "bubbles", label: "Bubbles" },
	{ value: "stars", label: "Stars" },
	// Add more as needed
];

const AnimationControls = () => {
	const { settings, updateSettings, resetToDefaults } = useAnimationSettings();
	const [bgAnimation, setBgAnimation] = useState("none");

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
						onValueChange={(value: "swirls" | "particles" | "gradient" | "none") =>
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

				<div>
					<label className="block text-sm font-medium mb-2">
						Background Animation for Showreel/Hero Section
					</label>
					<select
						value={bgAnimation}
						onChange={(e) => setBgAnimation(e.target.value)}
						className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
					>
						{animationOptions.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
					<div className="mt-2 text-xs text-gray-400">
						Choose an animation style for the background of your showreel or hero section.
					</div>
					{/* Optionally, preview or describe the selected animation */}
					<div className="mt-4">
						{bgAnimation === "particles" && (
							<span className="text-indigo-400">
								Particles animation will appear in the background.
							</span>
						)}
						{bgAnimation === "waves" && (
							<span className="text-blue-400">
								Waves animation will appear in the background.
							</span>
						)}
						{bgAnimation === "gradient" && (
							<span className="text-pink-400">
								Animated gradient background will be used.
							</span>
						)}
						{bgAnimation === "bubbles" && (
							<span className="text-cyan-400">
								Bubbles will float in the background.
							</span>
						)}
						{bgAnimation === "stars" && (
							<span className="text-yellow-400">
								Starfield animation will appear in the background.
							</span>
						)}
						{bgAnimation === "none" && (
							<span className="text-gray-400">No animation will be shown.</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimationControls;
