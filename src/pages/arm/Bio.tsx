import { LuxHistogram, LuxLineChart, ScabbardLineChart } from '../../components/bio/BioGraphs';
import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import FaerieVoltages from '../../components/bio/FaerieVoltages';
import ArmManualControl from '../../components/arm/ArmManualControl';

export default function ArmBioPage() {
	return <>
		<div className="feedback">
			<ArmSocketFeedback />
			<ArmManualControl />
		</div>
		<div className="control">
			<FaerieVoltages />
			<LuxLineChart />
			<LuxHistogram />
			<ScabbardLineChart />
		</div>
	</>
}