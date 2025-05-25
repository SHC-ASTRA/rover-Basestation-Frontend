import CoreDrivingFeedback from '../../components/core/CoreDrivingFeedback';
import MapComponent from '../../components/Map';
import CoreDrivingControl from '../../components/core/CoreDrivingControl';

export default function CoreDrivingPage() {
	return <>
		<div className="container feedback">
			<MapComponent />
		</div>
		<div className="container control">
			<CoreDrivingControl />
			<CoreDrivingFeedback dev={false} />
		</div>
	</>;
}