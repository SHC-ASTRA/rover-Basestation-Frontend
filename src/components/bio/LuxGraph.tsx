import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import useFaerieFeedbackHistory from "./useFaerieFeedback";

export default function LuxGraph({ width, height }: { width: number, height: number }) {
    const plotData = useFaerieFeedbackHistory();

    return (
        <div className="graph" id="lux-graph">
            <LineChart width={width} height={height} data={plotData}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="lux_1" stroke="var(--mauve)" />
                <Line type="monotone" dataKey="lux_2" stroke="var(--red)" />
                <Line type="monotone" dataKey="lux_3" stroke="var(--peach)" />
                <Line type="monotone" dataKey="lux_4" stroke="var(--yellow)" />
                <Line type="monotone" dataKey="lux_5" stroke="var(--green)" />
                <Line type="monotone" dataKey="lux_6" stroke="var(--blue)" />
                <Line type="monotone" dataKey="lux_7" stroke="var(--lavender)" />
            </LineChart>
        </div>
    );
}