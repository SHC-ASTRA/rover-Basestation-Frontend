import { useEffect, useState } from "react";
import GamepadContext from "./gamepadContext";
import { GamepadState } from "./types";


const GamepadProvider = ({ children }: { children: React.ReactNode }) => {
    const [gamepadState, setGamepadState] = useState(new GamepadState(null));
    let gamepad: Gamepad | null = null;

    // update gamepad state every 100ms
    useEffect(() => {
        const interval = setInterval(() => {
            setGamepadState(new GamepadState(gamepad));
        }, 100);
        return () => clearInterval(interval);
    }, [gamepad]);

    function onGamepadConnected(event: GamepadEvent) {
        if (gamepad === null) {
            gamepad = event.gamepad;
        }
    }

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

    return (
        <GamepadContext.Provider value={gamepadState}>
            {children}
        </GamepadContext.Provider>
    );
}

export default GamepadProvider;
