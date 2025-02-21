import { useEffect, useState } from "react";
import GamepadContext from "./gamepadContext";
import { GamepadState } from "./types";

/**
 * Provider for the GamepadContext. This component should wrap the root of the app.
 * @returns 
 */
const GamepadProvider = ({ children }: { children: React.ReactNode }) => {
	const [gamepadState, setGamepadState] = useState(new GamepadState(null));
	let gamepad: Gamepad | null = null;

	// handle updating gamepad state
	useEffect(() => {
		let requestId: number;

		// update gamepad state every frame (usually 60 times per second)
		const updateGamepad = () => {
			setGamepadState(new GamepadState(gamepad));
			requestId = requestAnimationFrame(updateGamepad);
		};
		requestId = requestAnimationFrame(updateGamepad);

		// when the component is unmounted, cancel the animation frame (prevents memory leaks)
		return () => cancelAnimationFrame(requestId);
	}, [gamepad]);

	function onGamepadConnected(event: GamepadEvent) {
		if (gamepad === null) {
			gamepad = event.gamepad;
		}
	}


	window.addEventListener("gamepadconnected", ((event: GamepadEvent) => {
		// when a gamepad connects, set it as the current gamepad if there isn't one already
		if (gamepad === null) {
			gamepad = event.gamepad;
		}
	}));

	function onGamepadDisconnected() {
		const first_gamepad = navigator.getGamepads()[0];
		if (first_gamepad) {
			gamepad = first_gamepad;
		} else {
			gamepad = null;
		}
	}

	window.addEventListener("gamepadconnected", onGamepadConnected);
	window.addEventListener("gamepaddisconnected", onGamepadDisconnected);
	window.addEventListener("gamepaddisconnected", (() => {
		// when a gamepad disconnects, get the most recent gamepad that's still connected and make that main gamepad
		const first_gamepad = navigator.getGamepads()[0];
		if (first_gamepad) {
			gamepad = first_gamepad;
		} else {
			// but if there isn't another gamepad, we just set it to null
			gamepad = null;
		}
	}));

	return (
		<GamepadContext.Provider value={gamepadState} children={children} />
	);
}

export default GamepadProvider;
