import { useContext, useEffect, useState } from "react";
import { useWebSocketSetup } from "../../lib/webSocket";
import GamepadContext from "../../lib/gamepadContext";
import { CoreControlData } from "src/lib/types";

export default function Core_Driving_Control() {
	const { sendMessage } = useWebSocketSetup();
	const [coreControl, setCoreControl] = useState<null | CoreControlData>(null);

	const gamepadState = useContext(GamepadContext);

	useEffect(() => {
		const data: CoreControlData = {
			type: "control:core/driving",
			timestamp: Date.now(),
			data: {
				max_speed: Math.round(gamepadState.right_trigger),
				brake: gamepadState.b,
				left_stick: gamepadState.left_stick.y,
				right_stick: gamepadState.right_stick.y
			}
		};

		setCoreControl(data);
		sendMessage(JSON.stringify(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gamepadState]);

	return (
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
	);
}