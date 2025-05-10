import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import FaerieVoltages from '../../components/bio/FaerieVoltages';
import BioControl from '../../components/bio/BioControl';
import ArmControl from '../../components/arm/ArmControl';
import { ControlContainer, FeedbackContainer } from '../../components/MainContainers';

export default function ArmBioPage() {
	return <>
		<ControlContainer >
			<ArmSocketFeedback />
			<FaerieVoltages />
			<BioControl />
		</ControlContainer>
		<FeedbackContainer>
			<ArmControl />
		</FeedbackContainer>
	</>
}