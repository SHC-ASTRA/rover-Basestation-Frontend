import { useContext, useEffect, useRef, useState } from "react";
import useWebSocketSetup from "../../lib/webSocket";
import GamepadContext from "../../lib/gamepadContext";
import { CoreControlData } from "../../lib/types";
import GradientIndicator from "../indicators/GradientIndicator";
import { CORE_POLLING_INTERVAL } from "../../config";

const INITIAL_BASE_SPEED = 40;
const SPEED_ADJUSTMENT = 10; // 10% adjustment

export default function CoreDrivingControl() {
	const { sendMessage } = useWebSocketSetup();
	const [coreControl, setCoreControl] = useState<CoreControlData["data"]>({
		left_stick: 0,
		right_stick: 0,
		max_speed: 0,
		brake: false,
		turn_to_enable: false,
		turn_to: 0,
		turn_to_timeout: 0,
	});
	const lastUpdate = useRef(Date.now());

	const gamepadState = useContext(GamepadContext);

	const [baseSpeed, setBaseSpeed] = useState(INITIAL_BASE_SPEED);

	// Handle D-pad speed adjustments
	useEffect(() => {
		if (gamepadState.left_trigger) return;

		if (gamepadState.dpad.up) {
			setBaseSpeed((prev) => Math.min(100, prev + SPEED_ADJUSTMENT));
		} else if (gamepadState.dpad.down) {
			setBaseSpeed((prev) => Math.max(0, prev - SPEED_ADJUSTMENT));
		}
	}, [gamepadState.dpad.up, gamepadState.dpad.down]);

	useEffect(() => {
		const data: CoreControlData = {
			type: "/core/control",
			timestamp: Date.now(),
			data: {
				max_speed: Math.min(
					100,
					Math.round(
						gamepadState.left_trigger * baseSpeed
					)
				),
				brake: gamepadState.b,
				left_stick:
					gamepadState.right_trigger < 0.5
						? gamepadState.left_stick.y
						: gamepadState.right_stick.y,
				right_stick: gamepadState.right_stick.y,
				turn_to_enable: false,
				turn_to: 0,
				turn_to_timeout: 0,
			},
		};

		setCoreControl(data.data);

		// only send data at the polling rate
		if (Date.now() - lastUpdate.current < CORE_POLLING_INTERVAL) {
			return;
		}

		lastUpdate.current = Date.now();
		sendMessage(JSON.stringify(data));
	}, [baseSpeed, gamepadState, sendMessage]);

	const col = coreControl.brake ? { borderColor: "var(--red)" } : {};

	return (
		<>
			<div>
				<h1>Core Driving</h1>
				<div className="horizontal-split indicator-subsection">
					<div />
					<div
						className="container indicator-subsection stick-slider"
						style={col}
					>
						<GradientIndicator
							scale={1}
							value={coreControl.left_stick}
							color="var(--sapphire)"
							direction="to top"
						/>
					</div>
					<div
						className="container indicator-subsection stick-slider"
						style={col}
					>
						<GradientIndicator
							scale={1}
							value={coreControl.right_stick}
							color="var(--sapphire)"
							direction="to top"
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "2rem",
							color: (gamepadState.left_trigger) ? "var(--sapphire)" : undefined,
						}}
					>
						{Math.round(baseSpeed + gamepadState.left_trigger * (100 - baseSpeed))}%
					</div>
				</div>
			</div>
		</>
	);
}