import useWebSocketSetup from "../../lib/webSocket";

export default function ArmDigitFeedback() {
	const { digitFeedback } = useWebSocketSetup();

	return (
		<div>
			<h1>Arm Digit</h1>
			{digitFeedback && (
				<>
					<p>Wrist angle: {digitFeedback.data.wrist_angle}</p>
					<p>Voltage (12v): {digitFeedback.data.voltage_12v}</p>
					<p>Voltage (5v): {digitFeedback.data.voltage_5v}</p>
				</>
			) || <p>No Arm Digit</p>}
		</div>
	);
}