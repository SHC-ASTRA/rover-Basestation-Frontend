import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useWebSocketSetup } from "../../lib/webSocket";
import { useState, useEffect } from "react";
import { Vector3 } from "../../lib/types"

export default function Core_Feedback() {
	const { coreFeedback } = useWebSocketSetup();

	const [plotData, setPlotData] = useState<{ timestamp: number, acceleration: number, voltage12: number }[]>([])
	useEffect(() => {
		if (coreFeedback !== null) {
			setPlotData(plot => plot.concat({ timestamp: coreFeedback.timestamp, acceleration: (new Vector3(coreFeedback.data.bno_accel.x, coreFeedback.data.bno_accel.y, coreFeedback.data.bno_accel.z)).magnitude, voltage12: coreFeedback.data.voltage_12 }));
		}
	}, [coreFeedback])

	return (
		<>
			<div>
				<h1>Core Feedback</h1>
				{coreFeedback && (
					<>
						<p>Latitude: {coreFeedback.data.gps_lat}</p>
						<p>Longitude: {coreFeedback.data.gps_long}</p>
						<p>Satellites: {coreFeedback.data.gps_sats}</p>

						<p>Gyro: {coreFeedback.data.bno_gyro.x}, {coreFeedback.data.bno_gyro.y}, {coreFeedback.data.bno_gyro.z}</p>
						<p>Acceleration: {coreFeedback.data.bno_accel.x}, {coreFeedback.data.bno_accel.y}, {coreFeedback.data.bno_accel.z}</p>

						<p>Orientation: {coreFeedback.data.orientation}</p>

						<p>Temp: {coreFeedback.data.bmp_temp}</p>
						<p>Altitude: {coreFeedback.data.bmp_alt}</p>
						<p>Pressure: {coreFeedback.data.bmp_pres}</p>

						<p>Battery Voltage: {coreFeedback.data.bat_voltage}</p>
						<p>Voltage 12: {coreFeedback.data.voltage_12}</p>
						<p>Voltage 5: {coreFeedback.data.voltage_5}</p>
						<p>Voltage 3: {coreFeedback.data.voltage_3}</p>
					</>
				) || <p>No core feedback</p>}
			</div>
			<LineChart width={400} height={400} data={plotData} >
				<YAxis type="number" domain={[0, 1]} />
				<Line type="monotone" dataKey="acceleration" stroke="#8884d8" animationDuration={100} />
				<Line type="monotone" dataKey="voltage12" stroke="#8884d8" animationDuration={100} />
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="timestamp" />
			</LineChart>
		</>
	);
}