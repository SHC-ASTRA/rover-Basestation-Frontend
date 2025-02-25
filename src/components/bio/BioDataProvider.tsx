import { useState, useEffect } from "react";
import { FaerieFeedbackData } from "../../lib/types";
import useWebSocketSetup from "../../lib/webSocket";
import BioDataContext from "./BioDataContext";

export default function BioDataProvider({ children }: { children: React.ReactNode }) {
    const { faerieFeedback } = useWebSocketSetup();
    const [faerieFeedbackHistory, setFaerieFeedbackHistory] = useState<(FaerieFeedbackData["data"] & { timestamp: number })[]>([]);

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

    return <BioDataContext.Provider value={faerieFeedbackHistory} children={children} />
}