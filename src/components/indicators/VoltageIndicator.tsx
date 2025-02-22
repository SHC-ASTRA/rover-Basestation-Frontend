import ColoredIndicator from "./ColoredIndicator";

export function VoltageIndicator_3_3({ voltage }: { voltage: number }) {
    return <>
        <ColoredIndicator bad_value={3} good_value={3.2} current_value={voltage} precision={2} unit="v" />
    </>
}
export function VoltageIndicator_5({ voltage }: { voltage: number }) {
    return <>
        <ColoredIndicator bad_value={4.5} good_value={4.75} current_value={voltage} precision={1} unit="v" />
    </>
}
export function VoltageIndicator_12({ voltage }: { voltage: number }) {
    return <>
        <ColoredIndicator bad_value={11} good_value={11.5} current_value={voltage} precision={1} unit="v" />
    </>
}
export function VoltageIndicator_battery({ voltage }: { voltage: number }) {
    return <>
        <ColoredIndicator bad_value={13.5} good_value={14.8} current_value={voltage} precision={1} unit="v" />
    </>
}