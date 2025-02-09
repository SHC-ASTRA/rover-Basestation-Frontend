import { useMemo, useState } from 'react';
import useWebSocket from '../..//lib/useWebSocket';
import CoreFeedbackData from '../..//lib/webSocketTypes';
import CoreFeedbackContext from '../../lib/webSocketContext';

export default function Core_Feedback()
{
	// set up websocket
	const [coreFeedback, setCoreFeedback] = useState<CoreFeedbackData | null>(null);
	const handlers = useMemo(() => ({
		coreFeedback: setCoreFeedback,
	}), []);
	useWebSocket('ws://api/ws', handlers);

	return (
		//  this is for example purposes
		<CoreFeedbackContext.Provider value={coreFeedback}>
			<div>
				<h1>Core Feedback</h1>
				{coreFeedback && (
					<>
						<p>Temperature: {coreFeedback.temperature}</p>
						<p>Pressure: {coreFeedback.pressure}</p>
						<p>Humidity: {coreFeedback.humidity}</p>
					</>
				) || <p>No core feedback</p>}
			</div>
		</CoreFeedbackContext.Provider>
	);
}