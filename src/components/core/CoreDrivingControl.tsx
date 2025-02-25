import { useContext, useEffect, useRef, useState } from "react";
import useWebSocketSetup from "../../lib/webSocket";
import GamepadContext from "../../lib/gamepadContext";
import { CoreControlData } from "../../lib/types";
import GradientIndicator from "../indicators/GradientIndicator";

const POLLING_RATE = 40;
const DEADZONE = 0.025;
const POLLING_INTERVAL = Math.round(1000 / POLLING_RATE);
const INITIAL_BASE_SPEED = 50;

export default function CoreDrivingControl() {
	const { sendMessage } = useWebSocketSetup();
	const [coreControl, setCoreControl] = useState<CoreControlData["data"]>({
		left_stick: 0,
		right_stick: 0,
		max_speed: 0,
		brake: false
	});
	const lastUpdate = useRef(Date.now());

	const gamepadState = useContext(GamepadContext);

	const [baseSpeed, setBaseSpeed] = useState(INITIAL_BASE_SPEED);

	function applyDeadzone(value: number) {
		return Math.abs(value) > DEADZONE ? value : 0;
	}

	useEffect(() => {
		const data: CoreControlData = {
			type: "/core/control",
			timestamp: Date.now(),
			data: {
				max_speed: Math.min(100, Math.round(baseSpeed + (gamepadState.left_trigger * (100 - baseSpeed)))),
				brake: gamepadState.b,
				left_stick: gamepadState.right_trigger < 0.5 ? applyDeadzone(gamepadState.left_stick.y) : applyDeadzone(gamepadState.right_stick.y),
				right_stick: applyDeadzone(gamepadState.right_stick.y)
			}
		};

		setCoreControl(data.data);

		// only send data at the polling rate
		if (Date.now() - lastUpdate.current < POLLING_INTERVAL) {
			return;
		}

		lastUpdate.current = Date.now();
		sendMessage(JSON.stringify(data));
	}, [baseSpeed, gamepadState, sendMessage]);


	return <>
		<div>
			<h1>Core Driving</h1>
			{coreControl && (
				<>
					<div className="horizontal-split indicator-subsection">
						<div />
						<div className="container indicator-subsection stick-slider">
							<GradientIndicator scale={1} value={coreControl.left_stick} color="var(--sapphire)" direction="to top" />
						</div>
						<div className="container indicator-subsection stick-slider">
							<GradientIndicator scale={1} value={coreControl.right_stick} color="var(--sapphire)" direction="to top" />
						</div>
						<div />
					</div>
					<div>
						<div style={{
							width: "100%",
							height: "20px",
							background:
								`linear-gradient(to right, var(--sapphire), var(--sapphire) ${coreControl.max_speed}%, transparent ${coreControl.max_speed}%, transparent 100%)`
						}}>
						</div>
						<input type="range" min="0" max="100" value={baseSpeed} onChange={e => setBaseSpeed(parseInt(e.target.value))} />
					</div>
					<p>Max Speed: {coreControl.max_speed}</p>
					<p>Brake: {coreControl.brake ? "true" : "false"}</p>
					<p>Left Stick: {coreControl.left_stick.toFixed(2)}</p>
					<p>Right Stick: {coreControl.right_stick.toFixed(2)}</p>
				</>
			) || <p>No core driving</p>}
		</div>
	</>
}