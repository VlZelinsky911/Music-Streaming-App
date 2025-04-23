import { Switch } from "@headlessui/react";

export default function SettingToggle({ label, enabled, setEnabled }: SettingToggleProps) {
	return (
		<div className="flex items-center justify-between py-3 border-b border-neutral-700">
			<span className=" text-sm">{label}</span>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${
					enabled ? "bg-green-500" : "bg-gray-600"
				} relative inline-flex h-6 w-11 items-center rounded-full transition`}
			>
				<span
					className={`${
						enabled ? "translate-x-6" : "translate-x-1"
					} inline-block h-4 w-4 transform rounded-full bg-white transition`}
				/>
			</Switch>
		</div>
	);
}