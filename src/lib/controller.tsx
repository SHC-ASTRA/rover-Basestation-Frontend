import { useState } from "react";

export default function useController() {
    const [connectedState, setConnectedState] = useState(false);
    const [gamepad, setGamepad] = useState<null | Gamepad>(null);

    window.addEventListener('gamepadconnected', () => {
        setConnectedState(true);
        setGamepad(navigator.getGamepads()[0]);
    });

    window.addEventListener('gamepaddisconnected', (event) => {
        if (gamepad == event.gamepad) {
            setConnectedState(false);
            setGamepad(null);
        }
    });

    return { connectedState, gamepad };
}
