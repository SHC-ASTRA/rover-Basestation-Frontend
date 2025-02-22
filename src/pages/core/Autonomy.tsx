import CoreAutoFeedback from '../../components/core/CoreAutoFeedback';
import CoreFeedbackComponent from './subcomponent/Feedback';

export default function CoreAutonomyPage() {
	return <>
		<div className="feedback container">
			<CoreFeedbackComponent />
		</div>
		<div className="control container">
			<CoreAutoFeedback />
		</div>
	</>
}