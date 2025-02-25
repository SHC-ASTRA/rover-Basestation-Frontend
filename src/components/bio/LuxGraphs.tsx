import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useWebSocketSetup from "../../lib/webSocket";
import { useContext, useEffect, useState } from "react";
import LuxDataContext from "./LuxDataContext";

export function LuxLineChart() {
    const plotData = useContext(LuxDataContext);

    return <>
        <div className="graph container indicator-subsection" id="lux-graph">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={plotData.filter((d) => d.timestamp > Date.now() - 10 * 1000)}>
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="lux_1" stroke="var(--red)" isAnimationActive={false} />
                    <Line type="monotone" dataKey="lux_2" stroke="var(--peach)" isAnimationActive={false} />
                    <Line type="monotone" dataKey="lux_3" stroke="var(--yellow)" isAnimationActive={false} />
                    <Line type="monotone" dataKey="lux_4" stroke="var(--green)" isAnimationActive={false} />
                    <Line type="monotone" dataKey="lux_5" stroke="var(--sapphire)" isAnimationActive={false} />
                    <Line type="monotone" dataKey="lux_6" stroke="var(--blue)" isAnimationActive={false} />
                    <Line type="monotone" dataKey="lux_7" stroke="var(--mauve)" isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>;
}

export function LuxHistogram() {
    const { faerieFeedback } = useWebSocketSetup();
    const [barChartData, setBarChartData] = useState<{
        name: "",
        lux1: number,
        lux2: number,
        lux3: number,
        lux4: number,
        lux5: number,
        lux6: number,
        lux7: number
    }[]>([]);

    useEffect(() => {
        if (faerieFeedback !== null) {
            setBarChartData([
                {
                    name: "",
                    lux1: faerieFeedback.data.lux_1,
                    lux2: faerieFeedback.data.lux_2,
                    lux3: faerieFeedback.data.lux_3,
                    lux4: faerieFeedback.data.lux_4,
                    lux5: faerieFeedback.data.lux_5,
                    lux6: faerieFeedback.data.lux_6,
                    lux7: faerieFeedback.data.lux_7
                }
            ]);
        }
    }, [faerieFeedback]);

    return <>
        <div className="graph container indicator-subsection" id="lux-histogram">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar type="monotone" dataKey="lux1" fill="var(--red)" />
                    <Bar type="monotone" dataKey="lux2" fill="var(--peach)" />
                    <Bar type="monotone" dataKey="lux3" fill="var(--yellow)" />
                    <Bar type="monotone" dataKey="lux4" fill="var(--green)" />
                    <Bar type="monotone" dataKey="lux5" fill="var(--sapphire)" />
                    <Bar type="monotone" dataKey="lux6" fill="var(--blue)" />
                    <Bar type="monotone" dataKey="lux7" fill="var(--mauve)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </>
}