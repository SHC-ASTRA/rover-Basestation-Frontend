import { useWebSocketSetup } from "../../lib/webSocket";

export default function Arm_Socket() {
	const { socketFeedback } = useWebSocketSetup();

	return (
		<div>
			<h1>Arm Socket</h1>
			{socketFeedback && (
				<>
					<p>Axis0 Angle: {socketFeedback.data.axis0_angle}</p>
					<p>Axis0 Temperature: {socketFeedback.data.axis0_temperature}</p>
					<p>Axis0 Voltage: {socketFeedback.data.axis0_voltage}</p>
					<p>Axis0 Current: {socketFeedback.data.axis0_current}</p>
					<p/>
					<p>Axis1 Angle: {socketFeedback.data.axis1_angle}</p>
					<p>Axis1 Temperature: {socketFeedback.data.axis1_temperature}</p>
					<p>Axis1 Voltage: {socketFeedback.data.axis1_voltage}</p>
					<p>Axis1 Current: {socketFeedback.data.axis1_current}</p>
					<p/>
					<p>Axis2 Angle: {socketFeedback.data.axis2_angle}</p>
					<p>Axis2 Temperature: {socketFeedback.data.axis2_temperature}</p>
					<p>Axis2 Voltage: {socketFeedback.data.axis2_voltage}</p>
					<p>Axis2 Current: {socketFeedback.data.axis2_current}</p>
					<p/>
					<p>Axis3 Angle: {socketFeedback.data.axis3_angle}</p>
					<p>Axis3 Temperature: {socketFeedback.data.axis3_temperature}</p>
					<p>Axis3 Voltage: {socketFeedback.data.axis3_voltage}</p>
					<p>Axis3 Current: {socketFeedback.data.axis3_current}</p>
					<p/>
					<p>Battery Voltage: {socketFeedback.data.voltage_battery}</p>
					<p>Voltage (12v): {socketFeedback.data.voltage_12v}</p>
					<p>Voltage (5v): {socketFeedback.data.voltage_5v}</p>
					<p>Voltage (3v): {socketFeedback.data.voltage_3v}</p>
				</>
			) || <p>No Arm Socket</p>}
		</div>
	);
}