import useWebSocketSetup from "../../lib/webSocket";

import { VoltageIndicator_5, VoltageIndicator_battery } from "../indicators/VoltageIndicator";

export default function FaerieVoltages() {
    const { faerieFeedback } = useWebSocketSetup();

    return <div><div className="container indicator-subsection">
        <h2 className="indicator-subsection-label">Faerie Voltages</h2>
        <VoltageIndicator_5 label={"5V"} voltage={faerieFeedback?.data.voltage_5} />
        <VoltageIndicator_battery label={"Battery"} voltage={faerieFeedback?.data.bat_voltage} />
    </div></div>
}