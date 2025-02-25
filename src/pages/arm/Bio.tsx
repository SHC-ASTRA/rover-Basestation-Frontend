import { LuxHistogram, LuxLineChart } from '../../components/bio/LuxGraphs';
import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import FaerieVoltages from '../../components/bio/FaerieVoltages';

export default function ArmBioPage() {
	return <>
		<div className="feedback container">
			<ArmSocketFeedback />
		</div>
		<div className="control container">
			<LuxLineChart />
			<LuxHistogram />
			<FaerieVoltages />
		</div>
	</>
}