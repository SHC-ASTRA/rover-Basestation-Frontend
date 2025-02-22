import ColoredIndicator from "./ColoredIndicator";

export default function MotorTempIndicator({ temperature }: { temperature: number }) {
    return <>
        <ColoredIndicator good_value={80} bad_value={90} current_value={temperature} precision={1} unit="°C" />
    </>
}