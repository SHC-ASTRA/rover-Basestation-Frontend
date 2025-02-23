import { BarChart, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import useWebSocketSetup from "../../lib/webSocket";
import useFaerieFeedbackHistory from "./useFaerieFeedback";
import { useEffect, useState } from "react";

export function LuxLineChart({ width, height }: { width: number, height: number }) {
    const plotData = useFaerieFeedbackHistory();

    return (
        <div className="graph" id="lux-graph">
            <LineChart width={width} height={height} data={plotData.filter((d) => d.timestamp > Date.now() - 30 * 1000)}>
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

export function LuxHistogram({ width, height }: { width: number, height: number }) {
    const { faerieFeedback } = useWebSocketSetup();
    const [barChartData, setBarChartData] = useState<{ name: string, lux: number }[]>([]);

    useEffect(() => {
        if (faerieFeedback !== null) {
            setBarChartData([
                { name: "Lux 1", lux: faerieFeedback.data.lux_1 },
                { name: "Lux 2", lux: faerieFeedback.data.lux_2 },
                { name: "Lux 3", lux: faerieFeedback.data.lux_3 },
                { name: "Lux 4", lux: faerieFeedback.data.lux_4 },
                { name: "Lux 5", lux: faerieFeedback.data.lux_5 },
                { name: "Lux 6", lux: faerieFeedback.data.lux_6 },
                { name: "Lux 7", lux: faerieFeedback.data.lux_7 },
            ]);
        }
    }, [faerieFeedback]);

    return <>
        <div className="graph" id="lux-histogram">
            <BarChart width={width} height={height} data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="lux" stroke="var(--mauve)" />
            </BarChart>
        </div>
    </>
}