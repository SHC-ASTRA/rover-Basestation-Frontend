import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import ArmControl from '../../components/arm/ArmControl';
import ArmVisCanvas from '../../../src/components/arm-vis/ArmVisCanvas';

// Add a canvas here to be passed down to the ArmVis
export default function ArmDigitPage() {
	return <>
		<div className="container feedback">
			<ArmControl />
			<ArmSocketFeedback />
		</div>
		<div className="container control">
			<ArmVisCanvas />
		</div>
	</>
} 