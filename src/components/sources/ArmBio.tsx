import { useMemo, useState } from 'react';
import useWebSocket from '../..//lib/useWebSocket';
import { FaerieFeedbackData } from '../..//lib/webSocketTypes';
import { ArmFaerieContext } from '../../lib/webSocketContext';

export default function Arm_Bio()
{
	// set up websocket
	const [armBio, setArmBio] = useState<FaerieFeedbackData | null>(null);
	const handlers = useMemo(() => ({
		armBio: setArmBio,
	}), []);
	useWebSocket('ws://api/ws', handlers);

	return (
		<ArmFaerieContext.Provider value={armBio}>
			<div>
				<h1>Arm Bio</h1>
				{armBio && (
					<>
						<p>Voltage Battery: {armBio.data.voltage_battery}</p>
						<p>Voltage (12v): {armBio.data.voltage_12v}</p>
						<p>Voltage (5v): {armBio.data.voltage_5v}</p>

						<p>Scabbard Temperature: {armBio.data.sht_temp}</p>
						<p>Scabbard Humidity: {armBio.data.sht_humidity}</p>
						
						<p>lux 1: {armBio.data.lux_1}</p>
						<p>lux 2: {armBio.data.lux_2}</p>
						<p>lux 3: {armBio.data.lux_3}</p>
						<p>lux 4: {armBio.data.lux_4}</p>
						<p>lux 5: {armBio.data.lux_5}</p>
						<p>lux 6: {armBio.data.lux_6}</p>
						<p>lux 7: {armBio.data.lux_7}</p>
					</>
				) || <p>No Arm Bio</p>}
			</div>
		</ArmFaerieContext.Provider>
	);
}