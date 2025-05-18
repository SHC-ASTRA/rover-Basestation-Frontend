import { useContext, useEffect, useRef, useState } from "react";
import useWebSocketSetup from "../../lib/webSocket";
import { BioSetter } from "./BioSetter";
import BioDataContext from "./BioDataContext";
import GradientIndicator from "../indicators/GradientIndicator";

export default function BioControl() {
    const { sendMessage } = useWebSocketSetup();
    const { bioControl, setBioControl } = useContext(BioDataContext)
    const lssDirection = useRef<{ left: boolean, right: boolean }>({
        left: false,
        right: false
    });
    const drillRunning = useRef(false);
    const [rawDrillDuty, setRawDrillDuty] = useState("0");
    const drillDuty = useRef(0);
    const [laserEnabled, setLaserEnabled] = useState(false);

    useEffect(() => {
        setBioControl((b) => {
            return {
                ...b,
                laser: laserEnabled ? 1 : 0,
            }
        });
    }, [laserEnabled, setBioControl]);

    useEffect(() => {
        let parsed = parseFloat(rawDrillDuty);
        if (Math.abs(parsed) > 1) {
            setRawDrillDuty(Math.min(1, Math.max(parsed, -1)).toString())
            return;
        }
        if (isNaN(parsed)) {
            parsed = 0;
        }
        drillDuty.current = parsed;
    }, [rawDrillDuty])


    // listen for left and right on the keyboard
    useEffect(() => {
        function updateLssDirection(left?: boolean, right?: boolean) {
            // if left or right is undefined, use the current value
            left = left ?? lssDirection.current.left;
            right = right ?? lssDirection.current.right;

            // if nothing changed, return
            if (left === lssDirection.current.left && right === lssDirection.current.right) return;

            lssDirection.current = { left, right };
            setBioControl((b) => {
                return {
                    ...b,
                    bio_arm: (right ? 100 : 0) - (left ? 100 : 0)
                }
            });
        }

        function onKeyDown(e: KeyboardEvent) {
            let left: boolean | undefined = undefined;
            let right: boolean | undefined = undefined;

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                left = true;
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                right = true;
            }
            updateLssDirection(left, right);

            if (e.key === " ") {
                e.preventDefault();
                if (!drillRunning.current) {
                    drillRunning.current = true;
                    setBioControl((b) => {
                        return {
                            ...b,
                            drill: drillDuty.current
                        }
                    });
                }
            }
        }
        function onKeyUp(e: KeyboardEvent) {
            let left: boolean | undefined = undefined;
            let right: boolean | undefined = undefined;

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                left = false;
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                right = false;
            }
            updateLssDirection(left, right);

            if (e.key === " ") {
                e.preventDefault();
                if (drillRunning.current) {
                    drillRunning.current = false;
                    setBioControl((b) => {
                        return {
                            ...b,
                            drill: 0
                        }
                    });
                }
            }
        }

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        }
    }, [setBioControl]);

    useEffect(() => {
        const data = {
            type: "/bio/control",
            timestamp: Date.now(),
            data: bioControl
        };

        sendMessage(JSON.stringify(data));

        // reset bioControl without updating state
        bioControl.pump_id = 0;
        bioControl.pump_amount = 0;
        bioControl.fan_id = 0;
        bioControl.fan_duration = 0;
        bioControl.servo_position = 0;
        // bioControl.bio_arm = 0;
        // bioControl.drill = 0;
        // bioControl.drill_arm = 0;
    }, [bioControl, sendMessage]);

    return <>
        <div className="container indicator-subsection vertical-split">
            <BioSetter label="Pumps" min={0} max={Infinity} placeholder="amount (mL)" onSubmission={(id, value) => {
                setBioControl((b) => {
                    return {
                        ...b,
                        pump_id: id,
                        pump_amount: value
                    }
                });
            }}>
                <option value={1}>Pump 1</option>
                <option value={2}>Pump 2</option>
                <option value={3}>Pump 3</option>
                <option value={4}>Pump 4</option>
            </BioSetter>
            <BioSetter label="Fans" min={0} max={Infinity} placeholder="duration (ms)" onSubmission={(id, value) => {
                setBioControl((b) => {
                    return {
                        ...b,
                        fan_id: id,
                        fan_duration: value
                    }
                }
                );
            }}>
                <option value={1}>Fan 1</option>
                <option value={2}>Fan 2</option>
                <option value={3}>Fan 3</option>
            </BioSetter>
            <BioSetter label="Servos" max={360} min={0} placeholder="angle" onSubmission={(_, value) => {
                setBioControl((b) => {
                    return {
                        ...b,
                        servo_position: value
                    }
                });
            }}>
                <option value={1}>Servo 1</option>
            </BioSetter>
            <div className="indicator-subsection horizontal-split">
                <h2 className="indicator-subsection-label">LSS Direction</h2>
                <div className="container">
                    <GradientIndicator scale={100} color="var(--red)" value={bioControl.bio_arm} />
                </div>
            </div>
            <div className="indicator-subsection horizontal-split">
                <h2 className="indicator-subsection-label">Laser</h2>
                <input type="checkbox" id="laser" onChange={(e) => setLaserEnabled(e.target.checked)} />
            </div>
            <div className="indicator-subsection horizontal-split">
                <h2 className="indicator-subsection-label">Drill</h2>
                <div className="horizontal-split">
                    <input type="number" min={-1} max={1} value={rawDrillDuty} onChange={(e) => { setRawDrillDuty(e.target.value); }} />
                    <GradientIndicator className="container" scale={1} color="var(--blue)" value={bioControl.drill} />
                </div>
            </div>
        </div>
    </>;
}