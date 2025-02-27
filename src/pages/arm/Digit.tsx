import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import ArmDigitFeedback from '../../components/arm/ArmDigitSource';
import ArmControl from '../../components/arm/ArmControl';

export default function ArmDigitPage() {
	return <>
		<div className="container feedback">
			<ArmSocketFeedback />
			<ArmDigitFeedback />
		</div>
		<div className="container control">
			<ArmControl />
		</div>
	</>
} 