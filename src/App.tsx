import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from './assets/favicon.png';
import clucky from './assets/clucky.png';
import './App.css';

const SubTeams = ["dev", "Arm", "Autonomy", "Biosensor", "Core"];

let ret = "";
let selectedPresetFile = "";

function exportTestFile()
{
	console.log(document.getElementById('dynamic')?.firstElementChild?.outerHTML);
	// this is just to mark the function as "used". Don't @ me.
}

function App() {
	const [selectedPreset, setPresets] = useState(0x00);
	
	async function loadCurrentPreset()
	{
		ret = await (await fetch('presets/' + SubTeams[Math.floor(selectedPreset / 16) - 1] + '/' + selectedPreset % 16 + '.jsx')).text();
		selectedPresetFile = ret;
		console.log(ret);
	}

  	return (
		<>
			<div className="headDiv">
				<img src={logo} alt="Astra Logo" className="lImg" />
				<img src={clucky} alt="Clucky!" className="rImg" />
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
							
							<Dropdown.Item onClick={() => {setPresets(0x00); loadCurrentPreset()}}>Development</Dropdown.Item>
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Arm
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x10); loadCurrentPreset()}}>Alpha</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x11); loadCurrentPreset()}}>Bravo</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x12); loadCurrentPreset()}}>Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Autonomy
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x20); loadCurrentPreset()}}>Alpha</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x21); loadCurrentPreset()}}>Bravo</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x22); loadCurrentPreset()}}>Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Based Station
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x30); loadCurrentPreset()}}>Alpha</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x31); loadCurrentPreset()}}>Bravo</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x32); loadCurrentPreset()}}>Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Bio Sensor
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x40); loadCurrentPreset()}}>Alpha</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x41); loadCurrentPreset()}}>Bravo</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x42); loadCurrentPreset()}}>Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Core Rover
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x50); loadCurrentPreset()}}>Telemetry</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x51); loadCurrentPreset()}}>Driving</Dropdown.Item>
									<Dropdown.Item as="button" onClick={() => {setPresets(0x52); loadCurrentPreset()}}></Dropdown.Item>
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
				{selectedPreset}
				<script async src={selectedPresetFile} onLoad={() => <selectedPreset.layout></selectedPreset.layout>} />
			</div>

		</>
  );
}

export default App;