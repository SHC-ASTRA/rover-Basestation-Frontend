import useWebSocketSetup from "../../lib/webSocket";

export default function ResetAntenna() {
    const { sendMessage } = useWebSocketSetup();

    function resetAntenna() {
        sendMessage(JSON.stringify({
            type: 'antenna',
            timestamp: Date.now(),
            data: {
                message: "reset"
            }
        }));
    }

    return <>
        <button className="submit-button" onClick={resetAntenna} style={{ width: "100%", flexGrow: 0 }}>
            Reset Antenna
        </button>
    </>
}