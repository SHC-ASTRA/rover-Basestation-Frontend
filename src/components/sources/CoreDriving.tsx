import { useMemo, useState } from 'react';
import useWebSocket from '../..//lib/useWebSocket';
import { CoreDrivingData } from '../..//lib/webSocketTypes';
import { CoreDrivingContext } from '../../lib/webSocketContext';

export default function Core_Driving()
{
	// set up websocket
	const [coreDriving, setCoreDriving] = useState<CoreDrivingData | null>(null);
	const handlers = useMemo(() => ({
		coreDriving: setCoreDriving,
	}), []);
	useWebSocket('ws://api/ws', handlers);

	return (
		<CoreDrivingContext.Provider value={coreDriving}>
			<div>
				<h1>Core Driving</h1>
				{coreDriving && (
					<>
						<p>Max Speed: {coreDriving.data.max_speed}</p>
						<p>Brake: {coreDriving.data.brake}</p>
						<p>Left Stick: {coreDriving.data.left_stick}</p>
						<p>Right Stick: {coreDriving.data.right_stick}</p>
					</>
				) || <p>No core driving</p>}
			</div>
		</CoreDrivingContext.Provider>
	);
}