import { useState, useEffect } from "react";
import useController from "../../lib/controller";
import { CoreControlData, useWebSocketSetup } from "../../lib/webSocket";

export default function Core_Driving_Control() {
	const { sendMessage } = useWebSocketSetup();
	const { connectedState, gamepad } = useController();
	const [ coreControl, setCoreControl ] = useState<null | CoreControlData>(null);

	useEffect(() => {
		if (!connectedState || !gamepad) {
			return;
		}

		const interval = setInterval(() => {
			if (!connectedState || !gamepad) {
				clearInterval(interval);
			}
			const data: CoreControlData = {
				data: {
					max_speed: gamepad.buttons[0].value,
					brake: gamepad.buttons[1].value == 1,
					left_stick: -gamepad.axes[1],
					right_stick: -gamepad.axes[3],
				},
				type: "control:core/driving",
				timestamp: Date.now(),
			};

			sendMessage(JSON.stringify(data));

			setCoreControl(data);
		}, 100);

		return () => clearInterval(interval);
	}, [connectedState, gamepad, sendMessage]);
	
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