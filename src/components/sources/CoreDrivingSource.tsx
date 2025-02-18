import { useState } from "react";
import { gamePad } from "../../../src/Controller";
import { CoreControlData, useWebSocketSetup } from "../../lib/webSocket";

export default function Core_Driving_Control() {
	const { sendMessage } = useWebSocketSetup();
	const [ coreControl, setCoreControl ] = useState<null | CoreControlData>(null);

	const interval = setInterval(() => {
		if (!gamePad || !gamePad.connected) {
			clearInterval(interval);
		} else {
			const data: CoreControlData = {
				data: {
					max_speed: gamePad.buttons[0].value,
					brake: gamePad.buttons[1].value == 1,
					left_stick: -gamePad.axes[1],
					right_stick: -gamePad.axes[3],
				},
				type: "control:core/driving",
				timestamp: Date.now(),
			};

			sendMessage(JSON.stringify(data));

			setCoreControl(data);
		}
	}, 1000);
	// TODO: make this not spam the everloving shit out of backend please :)
	
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