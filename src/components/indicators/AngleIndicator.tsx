export default function AngleIndicator({ current_angle }: { label: string, current_angle?: number }) {
    let angle = ((current_angle ?? 0) + 270) % 360;
    if (angle > 180) angle -= 360;

    return <div style={{ flexGrow: .3 }}>
        <div className="vertical-split">
            <div />
            <div className="horizontal-split">
                <div />
                <div style={{
                    flexGrow: 0,
                    transform: `rotate(${angle}deg)`
                }} className="angle-indicator">
                    <div className="angle-indicator-pointer" />
                </div>
                <div />
            </div>
            <div />
        </div>
    </div>
}