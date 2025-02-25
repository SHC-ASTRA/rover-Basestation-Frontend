export default function GradientIndicator({ scale, value, color, direction }: { scale: number, value: number, color: string, direction: string }) {
    const lowerPercentage = (value < 0 ? (1 + value / scale) : 1) * 50;
    const upperPercentage = (value > 0 ? (1 + value / scale) : 1) * 50;

    return <div className="gradient-indicator" style={{
        background: `linear-gradient(${direction}, transparent 0%, transparent ${lowerPercentage}%, ${color} ${lowerPercentage}%, ${color} ${upperPercentage}%, transparent ${upperPercentage}%, transparent 100%)`
    }}>
    </div>;
}