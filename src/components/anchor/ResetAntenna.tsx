import useWebSocketSetup from "../../lib/webSocket";

export default function ResetAntenna() {
    const { sendMessage } = useWebSocketSetup();

    function resetAntenna() {
        sendMessage(JSON.stringify({
            type: 'reset_antenna',
            timestamp: Date.now(),
            data: {}
        }));
    }

    return <>
        <button className="submit-button" onClick={resetAntenna} style={{ width: "100%", flexGrow: 0 }}>
            Reset Antenna
        </button>
    </>
}