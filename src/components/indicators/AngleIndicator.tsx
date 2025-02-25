export default function AngleIndicator({ label, current_angle }: { label: string, current_angle: number }) {
    let angle = (current_angle + 270) % 360;
    if (angle > 180) angle -= 360;

    return <div className="container indicator-subsection">
        <h2 className="indicator-subsection-label">{label}</h2>
        <div style={{
            transform: `rotate(${angle}deg)`
        }} className="angle-indicator">
            <div className="angle-indicator-pointer" />
        </div>
    </div>
}