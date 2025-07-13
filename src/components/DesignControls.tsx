import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Palette, Type, Layout, Image } from "lucide-react";
import { useDesignSettings } from "@/hooks/useDesignSettings";
import { toast } from "@/hooks/use-toast";

const themePalettes = [
	{
		name: "Current Theme",
		colors: {
			primary: "#6366f1",
			secondary: "#a855f7",
			accent: "#ec4899",
			background: "#111827",
			text: "#ffffff",
			tab: "#23272f",
			tabBlur: "rgba(35,39,47,0.7)",
			tabBorder: "#23272f",
		},
	},
	{
		name: "Dark Glassy Blue",
		colors: {
			primary: "#1e293b",
			secondary: "#334155",
			accent: "#2563eb",
			background: "#0a0a0a",
			text: "#e0e7ef",
			tab: "#23272f",
			tabBlur: "rgba(35,39,47,0.7)",
			tabBorder: "#23272f",
		},
	},
	{
		name: "Elegant Purple",
		colors: {
			primary: "#7c3aed",
			secondary: "#a78bfa",
			accent: "#f472b6",
			background: "#18122B",
			text: "#f3e8ff",
			tab: "#2d1e4a",
			tabBlur: "rgba(45,30,74,0.7)",
			tabBorder: "#2d1e4a",
		},
	},
	{
		name: "Minimal White",
		colors: {
			primary: "#111827",
			secondary: "#6b7280",
			accent: "#f59e42",
			background: "#f9fafb",
			text: "#22223b",
			tab: "#e5e7eb",
			tabBlur: "rgba(229,231,235,0.7)",
			tabBorder: "#e5e7eb",
		},
	},
	{
		name: "Oceanic",
		colors: {
			primary: "#0ea5e9",
			secondary: "#38bdf8",
			accent: "#fbbf24",
			background: "#0f172a",
			text: "#e0f2fe",
			tab: "#1e293b",
			tabBlur: "rgba(30,41,59,0.7)",
			tabBorder: "#1e293b",
		},
	},
	{
		name: "Emerald Forest",
		colors: {
			primary: "#059669",
			secondary: "#34d399",
			accent: "#f59e42",
			background: "#052e16",
			text: "#d1fae5",
			tab: "#14532d",
			tabBlur: "rgba(20,83,45,0.7)",
			tabBorder: "#14532d",
		},
	},
	{
		name: "Sunset",
		colors: {
			primary: "#f43f5e",
			secondary: "#f59e42",
			accent: "#fbbf24",
			background: "#1e293b",
			text: "#fff7ed",
			tab: "#be185d",
			tabBlur: "rgba(190,24,93,0.7)",
			tabBorder: "#be185d",
		},
	},
	{
		name: "Nordic",
		colors: {
			primary: "#5e81ac",
			secondary: "#81a1c1",
			accent: "#a3be8c",
			background: "#2e3440",
			text: "#eceff4",
			tab: "#3b4252",
			tabBlur: "rgba(59,66,82,0.7)",
			tabBorder: "#3b4252",
		},
	},
	{
		name: "Rose Gold",
		colors: {
			primary: "#b76e79",
			secondary: "#f7cac9",
			accent: "#f6e3e1",
			background: "#2d2424",
			text: "#fff1f1",
			tab: "#7e5a5a",
			tabBlur: "rgba(126,90,90,0.7)",
			tabBorder: "#7e5a5a",
		},
	},
	{
		name: "Cyberpunk",
		colors: {
			primary: "#ff00c8",
			secondary: "#00fff7",
			accent: "#fff700",
			background: "#18181b",
			text: "#f3f4f6",
			tab: "#23272f",
			tabBlur: "rgba(35,39,47,0.7)",
			tabBorder: "#23272f",
		},
	},
	{
		name: "Coffee",
		colors: {
			primary: "#6f4e37",
			secondary: "#b58863",
			accent: "#e6ccb2",
			background: "#3e2723",
			text: "#f5f5dc",
			tab: "#4e342e",
			tabBlur: "rgba(78,52,46,0.7)",
			tabBorder: "#4e342e",
		},
	},
	{
		name: "Royal Blue",
		colors: {
			primary: "#4169e1",
			secondary: "#6a5acd",
			accent: "#ffd700",
			background: "#22223b",
			text: "#f8f8ff",
			tab: "#232972",
			tabBlur: "rgba(35,41,114,0.7)",
			tabBorder: "#232972",
		},
	},
];

const DesignControls = () => {
	const {
		settings,
		updateColorSettings,
		updateTypographySettings,
		updateLayoutSettings,
		updateMediaSettings,
		resetToDefaults,
	} = useDesignSettings();

	// Local draft state for settings
	const [draft, setDraft] = useState(settings);
	const [activeColorTab, setActiveColorTab] = useState("colors");
	const [hasChanges, setHasChanges] = useState(false);

	// Sync draft with global settings when settings change externally
	useEffect(() => {
		setDraft(settings);
		setHasChanges(false);
	}, [settings]);

	// Compare draft and settings to enable/disable Apply button
	useEffect(() => {
		setHasChanges(JSON.stringify(draft) !== JSON.stringify(settings));
	}, [draft, settings]);

	// Handlers update draft only
	const handleColorChange = (colorKey: string, value: string) => {
		setDraft((prev) => ({
			...prev,
			colors: { ...prev.colors, [colorKey]: value },
		}));
	};

	const handleTypographyChange = (typographyKey: string, value: string) => {
		setDraft((prev) => ({
			...prev,
			typography: { ...prev.typography, [typographyKey]: value },
		}));
	};

	const handleLayoutChange = (layoutKey: string, value: string) => {
		setDraft((prev) => ({
			...prev,
			layout: { ...prev.layout, [layoutKey]: value },
		}));
	};

	const handleMediaChange = (mediaKey: string, value: string) => {
		setDraft((prev) => ({
			...prev,
			media: { ...prev.media, [mediaKey]: value },
		}));
	};

	const handleReset = () => {
		resetToDefaults();
		toast({
			title: "Settings Reset",
			description: "All design settings have been reset to defaults.",
		});
	};

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const idx = parseInt(e.target.value, 10);
		const palette = themePalettes[idx]?.colors;
		if (palette) {
			setDraft((prev) => ({
				...prev,
				colors: {
					...prev.colors,
					primary: palette.primary,
					secondary: palette.secondary,
					accent: palette.accent,
					background: palette.background,
					text: palette.text,
					tab: palette.tab,
					tabBlur: palette.tabBlur,
					tabBorder: palette.tabBorder,
				},
			}));
			toast({
				title: "Theme Changed",
				description: `Theme set to "${themePalettes[idx].name}" (not applied yet)`,
			});
		}
	};

	// Apply button handler
	const handleApply = () => {
		updateColorSettings(draft.colors);
		updateTypographySettings(draft.typography);
		updateLayoutSettings(draft.layout);
		updateMediaSettings(draft.media);
		toast({
			title: "Design Applied",
			description: "Your design changes have been applied.",
		});
	};

	return (
		<div className="space-y-6">
			{/* Theme Selector */}
			<div>
				<label className="block text-sm font-medium mb-2">Website Theme</label>
				<select
					className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white mb-4"
					onChange={handleThemeChange}
					defaultValue={0}
				>
					{themePalettes.map((theme, idx) => (
						<option value={idx} key={theme.name}>{`Theme ${idx}: ${theme.name}`}</option>
					))}
				</select>
				<div className="flex flex-wrap gap-2">
					{themePalettes.map((theme, idx) => (
						<div key={idx} className="flex items-center gap-1">
							<span className="text-xs">{idx}</span>
							<div className="flex">
								<span style={{ background: theme.colors.primary, width: 16, height: 16, borderRadius: 4, display: 'inline-block', marginRight: 2 }} />
								<span style={{ background: theme.colors.secondary, width: 16, height: 16, borderRadius: 4, display: 'inline-block', marginRight: 2 }} />
								<span style={{ background: theme.colors.accent, width: 16, height: 16, borderRadius: 4, display: 'inline-block', marginRight: 2 }} />
								<span style={{ background: theme.colors.background, width: 16, height: 16, borderRadius: 4, display: 'inline-block', marginRight: 2, border: '1px solid #333' }} />
								<span style={{ background: theme.colors.text, width: 16, height: 16, borderRadius: 4, display: 'inline-block', marginRight: 2, border: '1px solid #333' }} />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Design Settings</h3>
				<div className="flex gap-2">
					<Button
						onClick={handleApply}
						variant="default"
						size="sm"
						disabled={!hasChanges}
						className="bg-indigo-600 hover:bg-indigo-700 text-white"
					>
						Apply
					</Button>
					<Button onClick={handleReset} variant="outline" size="sm">
						<RotateCcw className="h-4 w-4 mr-2" />
						Reset to Defaults
					</Button>
				</div>
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
									value={draft.colors.primary}
									onChange={(e) => handleColorChange("primary", e.target.value)}
									className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
								/>
								<Input
									value={draft.colors.primary}
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
									value={draft.colors.secondary}
									onChange={(e) => handleColorChange("secondary", e.target.value)}
									className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
								/>
								<Input
									value={draft.colors.secondary}
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
									value={draft.colors.accent}
									onChange={(e) => handleColorChange("accent", e.target.value)}
									className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
								/>
								<Input
									value={draft.colors.accent}
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
									value={draft.colors.background}
									onChange={(e) => handleColorChange("background", e.target.value)}
									className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
								/>
								<Input
									value={draft.colors.background}
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
									value={draft.colors.text}
									onChange={(e) => handleColorChange("text", e.target.value)}
									className="w-16 h-10 p-1 bg-gray-800 border-gray-600"
								/>
								<Input
									value={draft.colors.text}
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
								value={draft.typography.primaryFont}
								onChange={(e) => handleTypographyChange("primaryFont", e.target.value)}
								className="bg-gray-800 border-gray-600"
								placeholder="'Inter', sans-serif"
							/>
						</div>

						<div>
							<Label htmlFor="font-size">Base Font Size</Label>
							<Input
								id="font-size"
								value={draft.typography.fontSize}
								onChange={(e) => handleTypographyChange("fontSize", e.target.value)}
								className="bg-gray-800 border-gray-600"
								placeholder="16px"
							/>
						</div>

						<div>
							<Label htmlFor="heading-size">Heading Size</Label>
							<Input
								id="heading-size"
								value={draft.typography.headingSize}
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
								value={draft.layout.containerWidth}
								onChange={(e) => handleLayoutChange("containerWidth", e.target.value)}
								className="bg-gray-800 border-gray-600"
								placeholder="1280px"
							/>
						</div>

						<div>
							<Label htmlFor="spacing">Default Spacing</Label>
							<Input
								id="spacing"
								value={draft.layout.spacing}
								onChange={(e) => handleLayoutChange("spacing", e.target.value)}
								className="bg-gray-800 border-gray-600"
								placeholder="2rem"
							/>
						</div>

						<div>
							<Label htmlFor="border-radius">Border Radius</Label>
							<Input
								id="border-radius"
								value={draft.layout.borderRadius}
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
								value={draft.media.defaultVideoUrl}
								onChange={(e) => handleMediaChange("defaultVideoUrl", e.target.value)}
								className="bg-gray-800 border-gray-600"
								placeholder="https://example.com/video.mp4"
							/>
						</div>

						<div>
							<Label htmlFor="default-thumbnail">Default Thumbnail URL</Label>
							<Input
								id="default-thumbnail"
								value={draft.media.defaultThumbnail}
								onChange={(e) => handleMediaChange("defaultThumbnail", e.target.value)}
								className="bg-gray-800 border-gray-600"
								placeholder="/placeholder.svg"
							/>
						</div>

						<div>
							<Label htmlFor="placeholder-icon">Placeholder Icon</Label>
							<Input
								id="placeholder-icon"
								value={draft.media.placeholderIcon}
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
