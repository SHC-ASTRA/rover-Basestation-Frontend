import { useWebSocketSetup } from "../../lib/webSocket";

import { VoltageIndicator_12, VoltageIndicator_5, VoltageIndicator_battery } from "../indicators/VoltageIndicator";

export default function FaerieVoltages() {
    const { faerieFeedback } = useWebSocketSetup();

    return <>
        {faerieFeedback ? (
            <>
                <VoltageIndicator_12 voltage={faerieFeedback.data.voltage_12v} />
                <VoltageIndicator_5 voltage={faerieFeedback.data.voltage_5v} />
                <VoltageIndicator_battery voltage={faerieFeedback.data.voltage_battery} />
            </>
        ) : (
            <p>No Faerie Feedback</p>
        )}
    </>
}