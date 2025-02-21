import { useState, useRef, useContext, useEffect } from "react";
import GamepadContext from "../../lib/gamepadContext";
import { ArmManualData } from "../../lib/types";
import { useWebSocketSetup } from "../../lib/webSocket";

export default function Arm_Socket() {
	const { sendMessage, socketFeedback } = useWebSocketSetup();
	const [armManualControl, setArmManualControl] = useState<null | ArmManualData>(null);
	const lastUpdate = useRef(Date.now());
	const gamepadState = useContext(GamepadContext);

	function applyDeadzone(value: number) {
		const a = Math.abs(value);
		return a > 0.5 ? Math.round(value / a) : 0;
	}

	useEffect(() => {
		const data: ArmManualData = {
			type: "control:arm/manual",
			timestamp: Date.now(),
			data: {
				...(!gamepadState.right_bumper ? { // regular mode
					axis0: gamepadState.dpad.x,
					axis1: applyDeadzone(gamepadState.left_stick.x),
					axis2: applyDeadzone(gamepadState.left_stick.y),
					axis3: applyDeadzone(gamepadState.right_stick.y),
					effector_roll: 0,
					effector_yaw: 0,
				} : { // right bumper mode
					axis0: 0,
					axis1: 0,
					axis2: 0,
					axis3: 0,
					effector_roll: applyDeadzone(gamepadState.right_stick.x),
					effector_yaw: applyDeadzone(gamepadState.left_stick.x),
				}),
				gripper: Math.round(gamepadState.right_trigger) - Math.round(gamepadState.left_trigger),
				linear_actuator: (gamepadState.x ? -1 : 0) + (gamepadState.y ? 1 : 0),
				laser: 0 // add a swtich to the screen
			}
		};

		setArmManualControl(data);

		// only send data at the polling rate
		if (Date.now() - lastUpdate.current < 40) {
			return;
		}

		lastUpdate.current = Date.now();
		sendMessage(JSON.stringify(data));
	}, [gamepadState, sendMessage]);

	return (
		<div>
			<h1>Arm Socket</h1>
			<div>
				{socketFeedback && (
					<>
						<p>Axis0 Angle: {socketFeedback.data.axis0_angle}</p>
						<p>Axis0 Temperature: {socketFeedback.data.axis0_temperature}</p>
						<p>Axis0 Voltage: {socketFeedback.data.axis0_voltage}</p>
						<p>Axis0 Current: {socketFeedback.data.axis0_current}</p>
						<p />
						<p>Axis1 Angle: {socketFeedback.data.axis1_angle}</p>
						<p>Axis1 Temperature: {socketFeedback.data.axis1_temperature}</p>
						<p>Axis1 Voltage: {socketFeedback.data.axis1_voltage}</p>
						<p>Axis1 Current: {socketFeedback.data.axis1_current}</p>
						<p />
						<p>Axis2 Angle: {socketFeedback.data.axis2_angle}</p>
						<p>Axis2 Temperature: {socketFeedback.data.axis2_temperature}</p>
						<p>Axis2 Voltage: {socketFeedback.data.axis2_voltage}</p>
						<p>Axis2 Current: {socketFeedback.data.axis2_current}</p>
						<p />
						<p>Axis3 Angle: {socketFeedback.data.axis3_angle}</p>
						<p>Axis3 Temperature: {socketFeedback.data.axis3_temperature}</p>
						<p>Axis3 Voltage: {socketFeedback.data.axis3_voltage}</p>
						<p>Axis3 Current: {socketFeedback.data.axis3_current}</p>
						<p />
						<p>Battery Voltage: {socketFeedback.data.voltage_battery}</p>
						<p>Voltage (12v): {socketFeedback.data.voltage_12v}</p>
						<p>Voltage (5v): {socketFeedback.data.voltage_5v}</p>
						<p>Voltage (3v): {socketFeedback.data.voltage_3v}</p>
					</>
				) || <p>No Arm Socket</p>}
			</div>
			<div>
				{armManualControl && (
					<>
						<p>Axis0: {armManualControl.data.axis0}</p>
						<p>Axis1: {armManualControl.data.axis1}</p>
						<p>Axis2: {armManualControl.data.axis2}</p>
						<p>Axis3: {armManualControl.data.axis3}</p>
						<p />
						<p>Effector Roll: {armManualControl.data.effector_roll}</p>
						<p>Effector Yaw: {armManualControl.data.effector_yaw}</p>
						<p />
						<p>Gripper: {armManualControl.data.gripper}</p>
						<p>Linear Actuator: {armManualControl.data.linear_actuator}</p>
						<p>Laser: {armManualControl.data.laser}</p>
					</>
				) || <p>No Arm Manual</p>}
			</div>
		</div>
	);
}
