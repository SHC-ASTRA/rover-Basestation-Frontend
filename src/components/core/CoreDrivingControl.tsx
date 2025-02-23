import { useContext, useEffect, useRef, useState } from "react";
import useWebSocketSetup from "../../lib/webSocket";
import GamepadContext from "../../lib/gamepadContext";
import { CoreControlData } from "../../lib/types";

const POLLING_RATE = 40;
const DEADZONE = 0.01;
const POLLING_INTERVAL = Math.round(1000 / POLLING_RATE);

export default function CoreDrivingControl() {
	const { sendMessage } = useWebSocketSetup();
	const [coreControl, setCoreControl] = useState<null | CoreControlData>(null);
	const lastUpdate = useRef(Date.now());

	const gamepadState = useContext(GamepadContext);

	function applyDeadzone(value: number) {
		return Math.abs(value) > DEADZONE ? value : 0;
	}

	useEffect(() => {
		const data: CoreControlData = {
			type: "control:core/driving",
			timestamp: Date.now(),
			data: {
				max_speed: gamepadState.a ? 100 : 75,
				brake: gamepadState.b,
				left_stick: gamepadState.right_trigger < 0.5 ? applyDeadzone(gamepadState.left_stick.y) : applyDeadzone(gamepadState.right_stick.y),
				right_stick: applyDeadzone(gamepadState.right_stick.y)
			}
		};

		setCoreControl(data);

		// only send data at the polling rate
		if (Date.now() - lastUpdate.current < POLLING_INTERVAL) {
			return;
		}

		lastUpdate.current = Date.now();
		sendMessage(JSON.stringify(data));
	}, [gamepadState, sendMessage]);


	return <>
		<div>
			<h1>Core Driving</h1>
			{coreControl && (
				<>
					<p>Max Speed: {coreControl.data.max_speed >= 0.5 ? "1" : "0"}</p>
					<p>Brake: {coreControl.data.brake ? "true" : "false"}</p>
					<p>Left Stick: {coreControl.data.left_stick.toFixed(2)}</p>
					<p>Right Stick: {coreControl.data.right_stick.toFixed(2)}</p>
				</>
			) || <p>No core driving</p>}
		</div>
	</>
}