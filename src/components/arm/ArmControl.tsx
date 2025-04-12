import { useState } from "react";
import ArmManualControl from "./ArmManualControl";
import ArmIKControl from "./ArmIKControl";

export default function ArmControl() {
    const [ikMode, setIkMode] = useState(false);

    return <div className="container indicator-subsection vertical-split">
        <div className="indicator-subsection vertcal-split grow-1">
            <h2>Arm Control</h2>
            <button className="button" onClick={() => setIkMode(!ikMode)}>
                {ikMode ? "Switch to IK" : "Switch to Manual"}
            </button>
            {ikMode ? <ArmManualControl /> : <ArmIKControl />}
        </div>
        <div className="indicator-subsection grow-2">
            <h2>Arm State</h2>
            <div className="horizontal-split">
            </div>
        </div>
    </div>;
}