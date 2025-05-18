import FaerieVoltages from '../../components/bio/FaerieVoltages';
import BioControl from '../../components/bio/BioControl';
import { ControlContainer, FeedbackContainer } from '../../components/MainContainers';

export default function ArmBioPage() {
	return <>
		<ControlContainer >
			<FaerieVoltages />
			<BioControl />
		</ControlContainer>
		<FeedbackContainer>
			<p>put something here eventually</p>
		</FeedbackContainer>
	</>
}