import { useState, useEffect } from "react";
import { BioControlData, BioFeedbackData } from "../../lib/types";
import useWebSocketSetup from "../../lib/webSocket";
import BioDataContext from "./BioDataContext";

export default function BioDataProvider({ children }: { children: React.ReactNode }) {
    const { bioFeedback } = useWebSocketSetup();
    const [bioFeedbackHistory, setBioFeedbackHistory] = useState<(BioFeedbackData["data"] & { timestamp: number })[]>([]);
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
        if (bioFeedback !== null) {
            setBioFeedbackHistory(
                plot => plot.concat(
                    // add new data to the history
                    {
                        timestamp: bioFeedback.timestamp,
                        ...bioFeedback.data
                    }
                    // only keep the last 5 minutes of data
                ).filter(d => d.timestamp > bioFeedback.timestamp - 300000)
            );
        }
    }, [bioFeedback]);

    return <BioDataContext.Provider value={{ bioFeedbackHistory: bioFeedbackHistory, bioControl, setBioControl }} children={children} />
}