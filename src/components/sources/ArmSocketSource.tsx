import { useMemo, useState } from 'react';
import useWebSocket from '../../lib/useWebSocket';
import { SocketFeedbackData } from '../../lib/webSocketTypes';
import { ArmSocketContext } from '../../lib/webSocketContext';
import { WebsocketAddress } from '../../lib/useWebSocket';

export default function Arm_Socket()
{
	// set up websocket
	const [armSocket, setArmSocket] = useState<SocketFeedbackData | null>(null);
	const handlers = useMemo(() => ({
		armSocket: setArmSocket,
	}), []);
	useWebSocket(WebsocketAddress, handlers);

	return (
		<ArmSocketContext.Provider value={armSocket}>
			<div>
				<h1>Arm Socket</h1>
				{armSocket && (
					<>
						<p>Axis0 Angle: {armSocket.data.axis0_angle}</p>
						<p>Axis0 Temperature: {armSocket.data.axis0_temperature}</p>
						<p>Axis0 Voltage: {armSocket.data.axis0_voltage}</p>
						<p>Axis0 Current: {armSocket.data.axis0_current}</p>
						<p/>
						<p>Axis1 Angle: {armSocket.data.axis1_angle}</p>
						<p>Axis1 Temperature: {armSocket.data.axis1_temperature}</p>
						<p>Axis1 Voltage: {armSocket.data.axis1_voltage}</p>
						<p>Axis1 Current: {armSocket.data.axis1_current}</p>
						<p/>
						<p>Axis2 Angle: {armSocket.data.axis2_angle}</p>
						<p>Axis2 Temperature: {armSocket.data.axis2_temperature}</p>
						<p>Axis2 Voltage: {armSocket.data.axis2_voltage}</p>
						<p>Axis2 Current: {armSocket.data.axis2_current}</p>
						<p/>
						<p>Axis3 Angle: {armSocket.data.axis3_angle}</p>
						<p>Axis3 Temperature: {armSocket.data.axis3_temperature}</p>
						<p>Axis3 Voltage: {armSocket.data.axis3_voltage}</p>
						<p>Axis3 Current: {armSocket.data.axis3_current}</p>
						<p/>
						<p>Battery Voltage: {armSocket.data.voltage_battery}</p>
						<p>Voltage (12v): {armSocket.data.voltage_12v}</p>
						<p>Voltage (5v): {armSocket.data.voltage_5v}</p>
						<p>Voltage (3v): {armSocket.data.voltage_3v}</p>
					</>
				) || <p>No Arm Socket</p>}
			</div>
		</ArmSocketContext.Provider>
	);
}