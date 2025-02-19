import { useState } from "react";
import { Vector2 } from "./types";

export class ControllerStick extends Vector2 {
    pressed: boolean;

    constructor(x: number, y: number, pressed: boolean) {
        super(x, y);
        this.pressed = pressed;
    }
};

export class GamepadWrapper {
    gamepad: Gamepad;

    get a() { return this.gamepad.buttons[0].pressed; }
    get b() { return this.gamepad.buttons[1].pressed; }
    get x() { return this.gamepad.buttons[2].pressed; }
    get y() { return this.gamepad.buttons[3].pressed; }

    get left_bumper() { return this.gamepad.buttons[4].pressed; }
    get right_bumper() { return this.gamepad.buttons[5].pressed; }

    get left_trigger() { return this.gamepad.buttons[6].value; }
    get right_trigger() { return this.gamepad.buttons[7].value; }

    get select() { return this.gamepad.buttons[8].pressed; }
    get start() { return this.gamepad.buttons[9].pressed; }

    get left_stick() { return new ControllerStick(this.gamepad.axes[0], -this.gamepad.axes[1], this.gamepad.buttons[10].pressed); }
    get right_stick() { return new ControllerStick(this.gamepad.axes[2], -this.gamepad.axes[3], this.gamepad.buttons[11].pressed); }

    get up() { return this.gamepad.buttons[12].pressed; }
    get down() { return this.gamepad.buttons[13].pressed; }
    get left() { return this.gamepad.buttons[14].pressed; }
    get right() { return this.gamepad.buttons[15].pressed; }

    /**
     * D-Pad as a stick. x is left/right, y is up/down.
     */
    get dpad(): ControllerStick {
        return new ControllerStick(
            (this.left ? -1 : 0) + (this.right ? 1 : 0),
            (this.up ? -1 : 0) + (this.down ? 1 : 0),
            false
        );
    }

    constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
    }
}

export default function useController() {
    const [connectedState, setConnectedState] = useState(false);
    const [gamepad, setGamepad] = useState<GamepadWrapper | null>(null);

    window.addEventListener('gamepadconnected', () => {
        const gamepad = navigator.getGamepads()[0];
        if (gamepad) {
            console.log('Gamepad connected');
            setConnectedState(true);
            setGamepad(new GamepadWrapper(gamepad));
        }
    });

    window.addEventListener('gamepaddisconnected', () => {
        console.log('Gamepad disconnected');

        const gamepad = navigator.getGamepads()[0];

        if (!gamepad) {
            console.log('No gamepads connected');
            setConnectedState(false);
            setGamepad(null);
        } else {
            setGamepad(new GamepadWrapper(gamepad));
        }
    });

    return { connectedState, gamepad };
}
