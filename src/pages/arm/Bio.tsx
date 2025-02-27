import { LuxHistogram, LuxLineChart, ScabbardLineChart } from '../../components/bio/BioGraphs';
import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import FaerieVoltages from '../../components/bio/FaerieVoltages';
import BioControl from '../../components/bio/BioControl';
import ArmControl from '../../components/arm/ArmControl';
import { ControlContainer, FeedbackContainer } from '../../components/MainContainers';

export default function ArmBioPage() {
	return <>
		<ControlContainer >
			<ArmSocketFeedback />
			<ArmControl />
			<BioControl />
		</ControlContainer>
		<FeedbackContainer>
			<FaerieVoltages />
			<LuxLineChart />
			<LuxHistogram />
			<ScabbardLineChart />
		</FeedbackContainer>
	</>
}