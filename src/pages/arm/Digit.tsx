import ArmSocketFeedback from '../../components/arm/ArmSocketFeedback';
import ArmControl from '../../components/arm/ArmControl';
import ArmVis from '../../../src/components/arm-vis/ArmVis';
import { ErrorBoundary } from 'react-error-boundary';

export default function ArmDigitPage() {
	return <>
		<div className="container feedback">
			<ArmControl />
			<ArmSocketFeedback />
		</div>
		<div className="container control">
			<ErrorBoundary fallback={<p>arm vis exploted</p>}>
				<ArmVis />
			</ErrorBoundary>
		</div>
	</>
} 