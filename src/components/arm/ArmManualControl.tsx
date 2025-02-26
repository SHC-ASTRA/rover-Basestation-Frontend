import { useState, useContext, useEffect, useRef } from "react";
import GamepadContext from "../../lib/gamepadContext";
import { ArmManualData } from "../../lib/types";
import useWebSocketSetup from "../../lib/webSocket";

export default function ArmManualControl() {
	const lastUpdate = useRef(Date.now());
	const { sendMessage } = useWebSocketSetup();
	const [laserEnabled, setLaserEnabled] = useState(0);
	const [armManualControl, setArmManualControl] = useState<ArmManualData["data"]>({
		axis0: 0,
		axis1: 0,
		axis2: 0,
		axis3: 0,
		effector_roll: 0,
		effector_yaw: 0,
		gripper: 0,
		linear_actuator: 0,
		laser: 0
	});
	const gamepadState = useContext(GamepadContext);

	function applyDeadzone(value: number) {
		const a = Math.abs(value);
		return a > 0.5 ? Math.round(value / a) : 0;
	}

	useEffect(() => {
		const data: ArmManualData = {
			type: "/arm/control/manual",
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
				laser: laserEnabled
			}
		};

		setArmManualControl(data.data);

		// only send data at the polling rate
		if (Date.now() - lastUpdate.current < 40) {
			return;
		}

		lastUpdate.current = Date.now();
		sendMessage(JSON.stringify(data));
	}, [gamepadState, laserEnabled, sendMessage]);

	return <>
		<div className="container indicator-subsection">
			<p>Axis0: {armManualControl.axis0}</p>
			<p>Axis1: {armManualControl.axis1}</p>
			<p>Axis2: {armManualControl.axis2}</p>
			<p>Axis3: {armManualControl.axis3}</p>
			<p />
			<p>Effector Roll: {armManualControl.effector_roll}</p>
			<p>Effector Yaw: {armManualControl.effector_yaw}</p>
			<p />
			<p>Gripper: {armManualControl.gripper}</p>
			<p>Linear Actuator: {armManualControl.linear_actuator}</p>
			<p>Laser: {armManualControl.laser}
				<input type="range"
					max={1} min={0} step={0}
					style={{ width: "75px" }}
					onChange={e => setLaserEnabled(parseInt(e.currentTarget.value))} />
			</p>
		</div>
	</>;
}