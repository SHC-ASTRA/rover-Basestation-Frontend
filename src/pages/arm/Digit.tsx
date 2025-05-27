import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import ArmControl from '../../components/arm/ArmControl';
import ArmVisCanvas from '../../../src/components/arm-vis/ArmVisCanvas';

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