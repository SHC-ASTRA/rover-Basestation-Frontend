import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import ArmControl from '../../components/arm/ArmControl';
import ArmVis from '../../../src/components/arm-vis/ArmVis';

export default function ArmDigitPage() {
	return <>
		<div className="container feedback">
			<ArmControl />
			<ArmSocketFeedback />
		</div>
		<div className="container control">
			<ArmVis />
		</div>
	</>
} 