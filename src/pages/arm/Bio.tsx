import ArmSocketFeedback from '../../components/arm/ArmSocketSource';
import BioFeedback from '../../components/arm/BioFeedback';

export default function ArmBioPage() {
	return <>
		<div className="feedback container">
			<ArmSocketFeedback />
		</div>
		<div className="control container">
			<BioFeedback />
		</div>
	</>
}