import { useState, useContext, useEffect, useRef } from "react";
import GradientIndicator from "../indicators/GradientIndicator";
import GamepadContext from "../../lib/gamepadContext";
import useWebSocketSetup from "../../lib/webSocket";
import { ArmIKData, Vector3 } from "../../lib/types";

function AxisControl(props: { label: string, value: number }) {
    return <div className="horizontal-split container indicator-subsection">
        <h1 className="subsection-indicator-label">{props.label}</h1>
        <GradientIndicator value={props.value} scale={1} direction="to top" color="var(--green)" />
    </div>;
}

export default function ArmIKControl() {
    const lastUpdate = useRef(Date.now());
    const { sendMessage } = useWebSocketSetup();
    const [laserEnabled, setLaserEnabled] = useState(0);
    const [armManualControl, setArmManualControl] = useState<ArmIKData["data"]>({
        movement_vector: new Vector3(0, 0, 0), // Assuming Vector3 has x, y, z properties
        gripper: 0,
        linear_actuator: 0,
        laser: 0,
        effector_roll: 0,
        effector_yaw: 0,
    });
    const gamepadState = useContext(GamepadContext);

    function applyDeadzone(value: number) {
        const a = Math.abs(value);
        return a > 0.5 ? Math.round(value / a) : 0;
    }

    useEffect(() => {
        const data: ArmIKData = {
            type: "/arm/control/ik",
            timestamp: Date.now(),
            data: {
                movement_vector: new Vector3(
                    applyDeadzone(gamepadState.left_stick.x),
                    applyDeadzone(gamepadState.left_stick.y),
                    applyDeadzone(gamepadState.right_stick.y)
                ),
                gripper: Math.round(gamepadState.right_trigger) - Math.round(gamepadState.left_trigger),
                linear_actuator: (gamepadState.x ? -1 : 0) + (gamepadState.y ? 1 : 0),
                laser: laserEnabled,
                effector_roll: gamepadState.dpad.x,
                effector_yaw: gamepadState.dpad.y,
            }
        };

        setArmManualControl(data.data);

        // only send data at the polling rate
        if (Date.now() - lastUpdate.current < 40) {
            return;
        }

        lastUpdate.current = Date.now();
        sendMessage(JSON.stringify(data));
    }, [gamepadState, laserEnabled, sendMessage]);

    return <>
        <div className="horizontal-split">
            <AxisControl label={"roll"} value={armManualControl.effector_yaw} />
            <AxisControl label={"yaw"} value={armManualControl.effector_roll} />
        </div>
        <div className="horizontal-split">
            <AxisControl label={"gripper"} value={armManualControl.gripper} />
            <AxisControl label={"actuator"} value={armManualControl.linear_actuator} />
            <div className="horizontal-split container indicator-subsection">
                <h1 className="subsection-indicator-label">laser</h1>
                <input type="range"
                    max={1} min={0} step={0}
                    style={{ width: "75px" }}
                    value={laserEnabled}
                    onChange={e => setLaserEnabled(parseInt(e.currentTarget.value))} />
            </div>
        </div>
    </>;
}