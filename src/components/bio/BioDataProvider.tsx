import { useState, useEffect } from "react";
import { BioControlData, FaerieFeedbackData } from "../../lib/types";
import useWebSocketSetup from "../../lib/webSocket";
import BioDataContext from "./BioDataContext";

export default function BioDataProvider({ children }: { children: React.ReactNode }) {
    const { faerieFeedback } = useWebSocketSetup();
    const [faerieFeedbackHistory, setFaerieFeedbackHistory] = useState<(FaerieFeedbackData["data"] & { timestamp: number })[]>([]);
    const [bioControl, setBioControl] = useState<BioControlData["data"]>({
        pump_id: 0,
        pump_amount: 0,

        fan_id: 0,
        fan_duration: 0,

        servo_position: 0,

        bio_arm: 0,

        laser: 0,

        drill: 0,
        drill_arm: 0,

        vibration_motor: 0,
    });

    useEffect(() => {
        if (faerieFeedback !== null) {
            setFaerieFeedbackHistory(
                plot => plot.concat(
                    // add new data to the history
                    {
                        timestamp: faerieFeedback.timestamp,
                        ...faerieFeedback.data
                    }
                    // only keep the last 5 minutes of data
                ).filter(d => d.timestamp > faerieFeedback.timestamp - 300000)
            );
        }
    }, [faerieFeedback]);

    return <BioDataContext.Provider value={{ faerieFeedbackHistory, bioControl, setBioControl }} children={children} />
}