import CitadelVoltages from '../../components/bio/CitadelVoltages';
import BioControl from '../../components/bio/BioControl';
import BioFeedback from '../../components/bio/BioFeedback';
import { ControlContainer, FeedbackContainer } from '../../components/MainContainers';

export default function ArmBioPage() {
	return <>
		<ControlContainer >
			<CitadelVoltages />
			<BioControl />
		</ControlContainer>
		<FeedbackContainer>
			<BioFeedback />
		</FeedbackContainer>
	</>
}