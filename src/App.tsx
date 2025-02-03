import { useMemo, useState } from 'react';
import '../src/App.css'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { CoreFeedbackData } from './lib/webSocketTypes';
import useWebSocket from './lib/useWebSocket';
import { CoreFeedbackContext } from './lib/webSocketContext';

let selectedPage = "";
function exportTestFile()
{
	console.log(document.getElementById('dynamic')?.firstElementChild?.outerHTML);
}

export default function App() {

	// set up websocket
	const [coreFeedback, setCoreFeedback] = useState<CoreFeedbackData | null>(null);

	const handlers = useMemo(() => ({
		coreFeedback: setCoreFeedback,
	}), []);

	useWebSocket('ws://localhost/api/ws', handlers);

	async function loadCurrentPreset()
	{
		// ret = await (await fetch('presets/' + SubTeams[Math.floor(selectedPreset / 16) - 1] + '/' + selectedPreset % 16 + '.jsx')).text();
		// selectedPresetFile = ret;
		// console.log(ret);
	}

  	return (
		<>
			<div className="headDiv">
				<img src="../src/assets/favicon.png" alt="Astra Logo" className="lImg" />
				<img src="../src/assets/clucky.png" alt="Clucky!" className="rImg" />
				<h1>
				<ruby>
					UAH Space Hardware Club ASTRA
					<rt>Autonomous Science Transport Research Apparatus</rt>
				</ruby>
				</h1>
			</div>

			<div className="flexDiv">
				<div>
					<Dropdown>
						<Dropdown.Toggle variant="success">
						Presets
						</Dropdown.Toggle>
						<Dropdown.Menu>
							
							<Dropdown.Item onClick={() => {selectedPage="/dev"; loadCurrentPreset()}}>Development</Dropdown.Item>
							
							<Dropdown drop="end" onClick={() => {selectedPage = "Arm/"}}>
								<Dropdown.Toggle variant="success">
									Arm
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Alpha</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Bravo</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end" onClick={() => {selectedPage = "Autonomy/"}}>
								<Dropdown.Toggle variant="success">
									Autonomy
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Alpha</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Bravo</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							<Dropdown drop="end" onClick={() => {selectedPage = "Biosensor/"}}>
								<Dropdown.Toggle variant="success">
									Biosensor
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Alpha</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Bravo</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}>Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end" onClick={() => {selectedPage = "Core/"}}>
								<Dropdown.Toggle variant="success">
									Core Rover
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {selectedPage += "Telemetry"; loadCurrentPreset()}}>Telemetry</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {selectedPage += "Driving"; loadCurrentPreset()}}>Driving</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {loadCurrentPreset()}}></Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
						</Dropdown.Menu>
					</Dropdown>
				</div>

				<Button className="expoButton" onClick={() => loadCurrentPreset()}>
					Refresh
				</Button>
			
			<Button className="expoButton" onClick={() => exportTestFile()}>
				Export
			</Button>

			</div>

			<div id="dynamic" style={{textAlign:"center"}}>
			</div>
			{/* this is for example purposes */}
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
		</>
  );
}