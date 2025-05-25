import CoreDrivingFeedback from '../../components/core/CoreDrivingFeedback';
import MapComponent from '../../components/Map';
import CoreDrivingControl from '../../components/core/CoreDrivingControl';

export default function CoreDrivingPage() {
	return <>
		<div className="container feedback">
			<CoreDrivingControl />
			<CoreDrivingFeedback />
		</div>
		<div className="container control">
			<MapComponent />
		</div>
	</>;
}