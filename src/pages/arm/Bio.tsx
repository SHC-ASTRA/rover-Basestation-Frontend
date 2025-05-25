import CitadelVoltages from '../../components/bio/CitadelVoltages';
import BioControl from '../../components/bio/BioControl';
import { ControlContainer, FeedbackContainer } from '../../components/MainContainers';

export default function ArmBioPage() {
	return <>
		<ControlContainer >
			<CitadelVoltages />
			<BioControl />
		</ControlContainer>
		<FeedbackContainer>
			<p>put something here eventually</p>
		</FeedbackContainer>
	</>
}