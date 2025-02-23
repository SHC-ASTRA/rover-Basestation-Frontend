import ArmSocketFeedback from '../../components/arm/ArmSocketSource';
import ArmDigitFeedback from '../../components/arm/ArmDigitSource';

export default function ArmDigitPage() {
	return <>
		<div className="feedback container">
			<ArmSocketFeedback />
		</div>
		<div className="control container">
			<ArmDigitFeedback />
		</div>
	</>
} 