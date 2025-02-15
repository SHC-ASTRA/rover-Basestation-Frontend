import { useMemo, useState } from 'react';
import useWebSocket from '../../lib/useWebSocket';
import { DigitFeedbackData } from '../../lib/webSocketTypes';
import { ArmDigitContext } from '../../lib/webSocketContext';
import { WebsocketAddress } from '../../lib/useWebSocket';

export default function Arm_Digit()
{
	// set up websocket
	const [armDigit, setArmDigit] = useState<DigitFeedbackData | null>(null);
	const handlers = useMemo(() => ({
		armDigit: setArmDigit,
	}), []);
	useWebSocket(WebsocketAddress, handlers);

	return (
		<ArmDigitContext.Provider value={armDigit}>
			<div>
				<h1>Arm Digit</h1>
				{armDigit && (
					<>
						<p>Wrist angle: {armDigit.data.wrist_angle}</p>
						<p>Voltage (12v): {armDigit.data.voltage_12v}</p>
						<p>Voltage (5v): {armDigit.data.voltage_5v}</p>
					</>
				) || <p>No Arm Digit</p>}
			</div>
		</ArmDigitContext.Provider>
	);
}