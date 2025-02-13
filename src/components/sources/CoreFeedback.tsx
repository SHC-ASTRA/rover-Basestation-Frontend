import { useMemo, useState } from 'react';
import useWebSocket from '../..//lib/useWebSocket';
import { CoreFeedbackData } from '../..//lib/webSocketTypes';
import { CoreFeedbackContext } from '../../lib/webSocketContext';

export default function Core_Feedback()
{
	// set up websocket
	const [coreFeedback, setCoreFeedback] = useState<CoreFeedbackData | null>(null);
	const handlers = useMemo(() => ({
		coreFeedback: setCoreFeedback,
	}), []);
	useWebSocket('ws://api/ws', handlers);

	return (
		<CoreFeedbackContext.Provider value={coreFeedback}>
			<div>
				<h1>Core Feedback</h1>
				{coreFeedback && (
					<>
						<p>Latitude: {coreFeedback.data.gps_lat}</p>
						<p>Longitude: {coreFeedback.data.gps_long}</p>
						<p>Satellites: {coreFeedback.data.gps_sats}</p>

						<p>Gyro: {coreFeedback.data.bno_gyro}</p>
						<p>Acceleration: {coreFeedback.data.bno_accel}</p>
						
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
		</CoreFeedbackContext.Provider>
	);
}