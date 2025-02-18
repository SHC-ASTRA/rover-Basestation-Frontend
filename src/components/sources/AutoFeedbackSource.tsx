import { useWebSocketSetup } from "../../lib/webSocket";

export default function Auto_Feedback() {
	const { autoFeedback } = useWebSocketSetup();

	return (
		<div>
			<h1>Core Autonomy</h1>
			{autoFeedback && (
				<>
					<p>Mission: {autoFeedback.data.mission_type}</p>
					<p>Target latitude: {autoFeedback.data.target_latitude}</p>
					<p>Target longitude: {autoFeedback.data.target_longitude}</p>
					<p>Remaining distance: {autoFeedback.data.remaining_distance}</p>
					<p>Update: {autoFeedback.data.update}</p>
					<p>Current Job: {autoFeedback.data.current_job}</p>
					<p>Warning: {autoFeedback.data.warning}</p>
				</>
			) || <p>No Core Autonomy</p>}
		</div>
	);
}