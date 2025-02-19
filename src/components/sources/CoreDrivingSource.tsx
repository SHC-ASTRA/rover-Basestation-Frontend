import { useEffect, useState } from "react";
import { CoreControlData, useWebSocketSetup } from "../../lib/webSocket";
import useController from "../../lib/controller";

export default function Core_Driving_Control() {
	const { sendMessage } = useWebSocketSetup();
	const [coreControl, setCoreControl] = useState<null | CoreControlData>(null);
	const { gamepad, connectedState } = useController();

	const [controllerInterval, setControllerInterval] = useState<number | null>(null);


	useEffect(() => {

		function cleanup() {
			if (controllerInterval) {
				clearInterval(controllerInterval);
				setControllerInterval(null);
				sendMessage(JSON.stringify(
					{
						type: "control:core/driving",
						data: {
							max_speed: 0,
							brake: false,
							left_stick: 0,
							right_stick: 0
						},
						timestamp: Date.now()
					}
				));
			}
		}

		if (connectedState && !controllerInterval) {
			const interval = setInterval(() => {
				if (connectedState && gamepad) {
					const data: CoreControlData = {
						data: {
							max_speed: gamepad.a ? 1 : 0,
							brake: gamepad.b,
							left_stick: gamepad.left_stick.y,
							right_stick: gamepad.right_stick.y,
						},
						type: "control:core/driving",
						timestamp: Date.now(),
					};

					sendMessage(JSON.stringify(data));
					setCoreControl(data);
				}
			}
				, 100);
			setControllerInterval(interval);
		} else if (!connectedState) {
			cleanup();
		}

		return () => {
			cleanup();
		}
	}, [connectedState, controllerInterval, gamepad, sendMessage]);

	return (
		<div>
			<h1>Core Driving</h1>
			{coreControl && (
				<>
					<p>Max Speed: {coreControl.data.max_speed}</p>
					<p>Brake: {coreControl.data.brake ? "true" : "false"}</p>
					<p>Left Stick: {coreControl.data.left_stick.toFixed(2)}</p>
					<p>Right Stick: {coreControl.data.right_stick.toFixed(2)}</p>
				</>
			) || <p>No core driving</p>}
		</div>
	);
}