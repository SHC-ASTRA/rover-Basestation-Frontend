import { useState, useEffect } from "react";
import useWebSocketSetup from "../../lib/webSocket";

export default function CoreDrivingFeedback() {
	const { coreFeedback } = useWebSocketSetup();
	const [plotData, setPlotData] = useState<{ timestamp: number, orientation: number, temperature: number, altitude: number, voltage_bat: number, voltage12: number, voltage5: number, voltage3: number }[]>([])

	useEffect(() => {
		if (coreFeedback !== null) {
			setPlotData(plot => plot.concat({
				timestamp: coreFeedback.timestamp,
				orientation: coreFeedback.data.orientation,
				temperature: coreFeedback.data.bmp_temp,
				altitude: coreFeedback.data.bmp_alt,
				voltage_bat: coreFeedback.data.bat_voltage,
				voltage12: coreFeedback.data.voltage_12,
				voltage5: coreFeedback.data.voltage_5,
				voltage3: coreFeedback.data.voltage_3
			}).filter((x) => x.timestamp >= Date.now() - 5000));
		}
	}, [coreFeedback])

	return <>
		<div>
			<h1>Core Feedback</h1>
			<p>Orientation: {coreFeedback?.data.orientation}</p>

			<p>Temp: {coreFeedback?.data.bmp_temp}</p>
			<p>Altitude: {coreFeedback?.data.bmp_alt}</p>
			<p>Pressure: {coreFeedback?.data.bmp_pres}</p>

			<p>Battery Voltage: {coreFeedback?.data.bat_voltage}</p>
			<p>Voltage 12: {coreFeedback?.data.voltage_12}</p>
			<p>Voltage 5: {coreFeedback?.data.voltage_5}</p>
			<p>Voltage 3: {coreFeedback?.data.voltage_3}</p>
		</div>
	</>;
}