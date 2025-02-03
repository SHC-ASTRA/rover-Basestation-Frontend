import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../src/static/favicon.png';
import clucky from '../src/static/clucky.png';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//let ret = "";
let selectedPage = "";
function exportTestFile()
{
	console.log(document.getElementById('dynamic')?.firstElementChild?.outerHTML);
	// this is just to mark the function as "used". Don't @ me.
}

export default function App() {
	const navigate = useNavigate();

	async function loadCurrentPreset()
	{
		selectedPage;
		// navigate(selectedPage);
		// ret = await (await fetch('presets/' + SubTeams[Math.floor(selectedPreset / 16) - 1] + '/' + selectedPreset % 16 + '.jsx')).text();
		// selectedPresetFile = ret;
		
		// console.log(ret);
	}

  	return (
		<>
			<div class="headDiv">
				<img src={logo} alt="Astra Logo" className="lImg" />
				<img src={clucky} alt="Clucky!" className="rImg" />
				<h1>
				<ruby>
					UAH Space Hardware Club ASTRA
					<rt>Autonomous Science Transport Research Apparatus</rt>
				</ruby>
				</h1>
			</div>

			<div class="flexDiv">
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

				<Button class="expoButton" onClick={() => loadCurrentPreset()}>
					Refresh
				</Button>
			
			<Button class="expoButton" onClick={() => exportTestFile()}>
				Export
			</Button>

			</div>

			<div id="dynamic" style={{textAlign:"center"}}>
			</div>
		</>
  );
}