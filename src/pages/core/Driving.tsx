import CoreDrivingFeedback from '../../components/core/CoreDrivingFeedback';
import MapComponent from '../../components/Map';
import CoreDrivingControl from '../../components/core/CoreDrivingControl';

export default function CoreDrivingPage() {
	return <>
		<div className="container feedback">
			<MapComponent />
			<CoreDrivingFeedback dev={false} />
		</div>
		<div className="container control">
			<CoreDrivingControl />
		</div>
	</>;
}