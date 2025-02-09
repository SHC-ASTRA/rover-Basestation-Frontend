import { useParams } from "react-router";
import Core_Telemetry from '../Core/Feedback.tsx';
let currentPreset : string;
let presetRender;

export const Preset = () => {

	const {module, preset} = useParams();
	const fullName = module + '/' + preset;
	if(module === undefined || preset === undefined)
	{
		throw("apolgy for bad english\nwhere were u wen basestation die?\nI was at house eating dorito when phone ring\n\"basestation is kil\"\n\"no\"");
	}
	if(currentPreset !== fullName)
	{
		currentPreset = fullName;
		switch(fullName)
		{
			case "Core/Telemetry":
				presetRender = Core_Telemetry();
				break;
			case "Core/Driving":
				presetRender = <></>
			break;
			default:
				presetRender = <></>;
			break;
		}
		return presetRender;
	}
	return;
}