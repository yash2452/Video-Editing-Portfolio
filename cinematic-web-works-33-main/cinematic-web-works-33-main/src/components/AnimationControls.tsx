import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

const animationOptions = [
	{ value: "swirls", label: "Swirling Lines" },
	{ value: "particles", label: "Particles" },
	{ value: "gradient", label: "Animated Gradient" },
	{ value: "bubbles", label: "Bubbles" },
	{ value: "stars", label: "Stars" },
	{ value: "none", label: "None" },
];

const AnimationControls = ({
	draft,
	setDraft,
	onReset,
}: {
	draft: any;
	setDraft: (draft: any) => void;
	onReset: () => void;
}) => {
	// Sync local state with parent draft
	useEffect(() => {
		// no-op, just to ensure re-render on parent draft change
	}, [draft]);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Animation Settings</h3>
				<Button onClick={onReset} variant="outline" size="sm">
					<RotateCcw className="h-4 w-4 mr-2" />
					Reset
				</Button>
			</div>

			<div className="grid gap-6">
				<div className="space-y-2">
					<Label>Background Animation</Label>
					<Select
						value={draft.backgroundAnimation}
						onValueChange={(value: string) =>
							setDraft({ ...draft, backgroundAnimation: value })
						}
					>
						<SelectTrigger className="bg-gray-700 border-gray-600">
							<SelectValue />
						</SelectTrigger>
						<SelectContent className="bg-gray-800 border-gray-600">
							{animationOptions.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center justify-between">
					<Label>Enable Swirl Animation</Label>
					<Switch
						checked={draft.enableSwirls}
						onCheckedChange={(checked) =>
							setDraft({ ...draft, enableSwirls: checked })
						}
					/>
				</div>

				{draft.enableSwirls && (
					<>
						<div className="space-y-2">
							<Label>Swirl Speed: {draft.swirlSpeed}s</Label>
							<Slider
								value={[draft.swirlSpeed]}
								onValueChange={([value]) =>
									setDraft({ ...draft, swirlSpeed: value })
								}
								min={3}
								max={20}
								step={1}
								className="w-full"
							/>
						</div>

						<div className="space-y-2">
							<Label>Swirl Opacity: {Math.round(draft.swirlOpacity * 100)}%</Label>
							<Slider
								value={[draft.swirlOpacity]}
								onValueChange={([value]) =>
									setDraft({ ...draft, swirlOpacity: value })
								}
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
						checked={draft.enableHoverEffects}
						onCheckedChange={(checked) =>
							setDraft({ ...draft, enableHoverEffects: checked })
						}
					/>
				</div>

				<div className="flex items-center justify-between">
					<Label>Button Animations</Label>
					<Switch
						checked={draft.buttonAnimations}
						onCheckedChange={(checked) =>
							setDraft({ ...draft, buttonAnimations: checked })
						}
					/>
				</div>

				<div className="flex items-center justify-between">
					<Label>Card Animations</Label>
					<Switch
						checked={draft.cardAnimations}
						onCheckedChange={(checked) =>
							setDraft({ ...draft, cardAnimations: checked })
						}
					/>
				</div>

				<div className="space-y-2">
					<Label>Transition Duration: {draft.transitionDuration}ms</Label>
					<Slider
						value={[draft.transitionDuration]}
						onValueChange={([value]) =>
							setDraft({ ...draft, transitionDuration: value })
						}
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
