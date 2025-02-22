import MapComponent from "../components/Map";
import CoreDrivingFeedback from "../components/core/CoreDrivingFeedback";

export default function Debug() {
    return <>
        <MapComponent />
        <CoreDrivingFeedback dev={true} />
    </>
}