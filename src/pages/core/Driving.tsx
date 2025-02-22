import CoreDrivingControl from '../../components/core/CoreDrivingControl';
import CoreFeedbackComponent from './subcomponent/Feedback';

export default function CoreDrivingPage() {
	return <>
		<div className="feedback container">
			<CoreFeedbackComponent />
		</div>
		<div className="control container">
			<CoreDrivingControl />
		</div>
	</>;
}