import { useState, useRef, useContext, useEffect } from "react";
import GamepadContext from "../../lib/gamepadContext";
import { ArmManualData } from "../../lib/types";
import useWebSocketSetup from "../../lib/webSocket";
import MotorTempIndicator from "../indicators/MotorTempIndicator";
import { VoltageIndicator_12, VoltageIndicator_3_3, VoltageIndicator_5, VoltageIndicator_battery } from "../indicators/VoltageIndicator";
import { BaseCurrentIndicator } from "../indicators/CurrentIndicators";

export default function ArmSocketFeedback() {
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

	return <>
		<h1>Arm Socket</h1>
		<div>
			{socketFeedback && (
				<>
					<p>Axis0 Angle: {socketFeedback.data.axis0_angle}</p>
					<p>Axis1 Angle: {socketFeedback.data.axis1_angle}</p>
					<p>Axis2 Angle: {socketFeedback.data.axis2_angle}</p>
					<p>Axis3 Angle: {socketFeedback.data.axis3_angle}</p>

					<div className="horizontal-split">
						<div className="container indicator-subsection">
							<h2 className="indicator-subsection-label">Axis 0</h2>
							<MotorTempIndicator temperature={socketFeedback.data.axis0_temp} />
							<VoltageIndicator_battery voltage={socketFeedback.data.axis0_voltage} />
							<BaseCurrentIndicator current={socketFeedback.data.axis0_current} />
						</div>

						<div className="container indicator-subsection">
							<h2 className="indicator-subsection-label">Axis 1</h2>
							<MotorTempIndicator temperature={socketFeedback.data.axis1_temp} />
							<VoltageIndicator_battery voltage={socketFeedback.data.axis1_voltage} />
							<BaseCurrentIndicator current={socketFeedback.data.axis1_current} />
						</div>
					</div>

					<div className="horizontal-split">
						<div className="container indicator-subsection">
							<h2 className="indicator-subsection-label">Axis 2</h2>
							<MotorTempIndicator temperature={socketFeedback.data.axis2_temp} />
							<VoltageIndicator_battery voltage={socketFeedback.data.axis2_voltage} />
							<BaseCurrentIndicator current={socketFeedback.data.axis2_current} />
						</div>

						<div className="container indicator-subsection">
							<h2 className="indicator-subsection-label">Axis 3</h2>
							<MotorTempIndicator temperature={socketFeedback.data.axis3_temp} />
							<VoltageIndicator_battery voltage={socketFeedback.data.axis3_voltage} />
							<BaseCurrentIndicator current={socketFeedback.data.axis3_current} />
						</div>
					</div>

					<div className="container indicator-subsection">
						<h2 className="indicator-subsection-label">System Voltages</h2>
						<div className="horizontal-split">
							<div>
								<VoltageIndicator_battery label="Battery" voltage={socketFeedback.data.bat_voltage} />
								<VoltageIndicator_12 label="12V" voltage={socketFeedback.data.voltage_12} />
							</div>
							<div>
								<VoltageIndicator_5 label="5V" voltage={socketFeedback.data.voltage_5} />
								<VoltageIndicator_3_3 label="3V" voltage={socketFeedback.data.voltage_3} />
							</div>
						</div>
					</div>
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
	</>;
}