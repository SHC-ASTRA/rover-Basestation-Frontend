import useWebSocketSetup from "../../lib/webSocket";
import ArmVisUpdate from "./ArmVisUpdate";

export default function ArmVisRoverFeedback() {
    const VisData = useWebSocketSetup();;
    const angle_data = [VisData.socketFeedback?.data.axis0_angle ?? 0,
    VisData.socketFeedback?.data.axis1_angle ?? 0,
    VisData.socketFeedback?.data.axis2_angle ?? 0,
    VisData.socketFeedback?.data.axis3_angle ?? 0,
    VisData.digitFeedback?.data.wrist_angle ?? 0];

    return <ArmVisUpdate feedbackData={angle_data} />;
}
