import { useEffect, useState } from "react";
import useWebSocketSetup from "../../lib/webSocket";
import { FaerieFeedbackData } from "../../lib/types";

export default function useFaerieFeedbackHistory() {
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

    return faerieFeedbackHistory;
}