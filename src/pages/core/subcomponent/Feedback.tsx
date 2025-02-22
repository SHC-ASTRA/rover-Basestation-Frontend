import MapComponent from '../../../components/Map';
import CoreDrivingFeedback from '../../../components/core/CoreDrivingFeedback';

export default function CoreFeedbackComponent() {
	return <>
		<MapComponent />
		<CoreDrivingFeedback dev={false} />
	</>
}