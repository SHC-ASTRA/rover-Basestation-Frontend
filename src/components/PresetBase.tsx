import '../../App.css';
import { useParams } from "react-router";

import Arm_Bio from '../pages/arm/Bio.tsx';
import Arm_Digit from '../pages/arm/Digit.tsx';
import Core_Driving from '../pages/core/Driving.tsx';
import Core_Telemetry from '../pages/core/subcomponent/Feedback.tsx';

let currentPreset: string;
let presetRender;

export default function Preset() {
	const { module, preset } = useParams();
	const fullName = module + '/' + preset;

	if (currentPreset !== fullName) {
		currentPreset = fullName;
		switch (fullName) {
			case "Core/Telemetry":
				presetRender = Core_Telemetry();
				break;
			case "Core/Driving":
				presetRender = Core_Driving();
				break;
			case "Arm/Bio":
				presetRender = Arm_Bio();
				break;
			case "Arm/Digit":
				presetRender = Arm_Digit();
				break;
			default:
				presetRender = <></>;
				break;
		}
		return presetRender;
	}
	return;
}