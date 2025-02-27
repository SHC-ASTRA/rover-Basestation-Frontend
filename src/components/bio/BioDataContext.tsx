import { createContext } from "react";
import { BioControlData, FaerieFeedbackData } from "../../lib/types";

const BioDataContext = createContext<{
    faerieFeedbackHistory: (FaerieFeedbackData["data"] & { timestamp: number })[],
    bioControl: BioControlData["data"],
    setBioControl: React.Dispatch<React.SetStateAction<BioControlData["data"]>>,
}>({
    faerieFeedbackHistory: [], bioControl: {
        pump_id: 0,
        pump_amount: 0,
        fan_id: 0,
        fan_duration: 0,
        servo_id: 0,
        servo_position: 0,
        lss_direction: 0,
        laser: 0,
        drill_duty: 0,
        drill_shake: 0,
        vibration_motor: 0,
    },
    setBioControl: () => {
        throw new Error("nuclear bomn (something exploted)");
    },
});

export default BioDataContext;