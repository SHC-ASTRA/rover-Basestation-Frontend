import { useState, useContext, useEffect, useRef } from "react";
import GamepadContext from "../../lib/gamepadContext";
import { ArmManualData } from "../../lib/types";
import useWebSocketSetup from "../../lib/webSocket";
import GradientIndicator from "../indicators/GradientIndicator";

function AxisControl(props: { label: string, value: number, direction?: string }) {
	let direction = props.direction;
	if (!direction) {
		direction = "to top";
	}

	return <div className="horizontal-split container indicator-subsection">
		<h1 className="subsection-indicator-label">{props.label}</h1>
		<GradientIndicator value={props.value} scale={1} direction={direction} color="var(--green)" />
	</div>;

}

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
		return a > 0.4 ? Math.round(value / a) : 0;
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
				gripper: Math.round(gamepadState.right_trigger - gamepadState.left_trigger),
				linear_actuator: (gamepadState.x ? -1 : 0) + (gamepadState.y ? 1 : 0),
				laser: laserEnabled
			}
		};

		setArmManualControl(data.data);

		// only send data at the polling rate
		if (Date.now() - lastUpdate.current < 15) {
			return;
		}

		lastUpdate.current = Date.now();
		sendMessage(JSON.stringify(data));
	}, [gamepadState, laserEnabled, sendMessage]);

	return <>
		<div className="horizontal-split">
			{!gamepadState.right_bumper ? <>
				<AxisControl label={"axis0"} value={armManualControl.axis0} direction={"to right"} />
				< AxisControl label={"axis1"} value={armManualControl.axis1} direction={"to right"} />
				<AxisControl label={"axis2"} value={armManualControl.axis2} />
				<AxisControl label={"axis3"} value={armManualControl.axis3} />
			</> : <>
				<AxisControl label={"roll"} value={armManualControl.effector_yaw} direction={"to right"} />
				<AxisControl label={"yaw"} value={armManualControl.effector_roll} direction={"to right"} />
			</>}
		</div>
		<div className="horizontal-split">
			<AxisControl label={"gripper"} value={armManualControl.gripper} direction={"to right"} />
			<AxisControl label={"actuator"} value={armManualControl.linear_actuator} />
			<div className="horizontal-split container indicator-subsection">
				<h1 className="subsection-indicator-label">laser</h1>
				<input type="range"
					max={1} min={0} step={0}
					style={{ width: "75px" }}
					value={laserEnabled}
					onChange={e => setLaserEnabled(parseInt(e.currentTarget.value))} />
			</div>
		</div>
	</>;
}