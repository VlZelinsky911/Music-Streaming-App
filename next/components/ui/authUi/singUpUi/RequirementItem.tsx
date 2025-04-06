import { CheckCircle, Circle } from "lucide-react";

type RequirementItemProps = {
	label: string;
	checked: boolean;
}

export default function RequirementItem({ label,checked}: RequirementItemProps) {
		const Icon = checked ? CheckCircle : Circle;
		return (
			<li className="flex items-center gap-2">
				<Icon
					size={18}
					className={checked ? "text-green-500" : "text-gray-500"}
				/>
				<span className={checked ? "text-white" : "text-gray-400"}>{label}</span>
			</li>
		);
	}