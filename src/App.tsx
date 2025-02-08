import '../src/App.css'
import { useActionState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Outlet } from "react-router";

function exportTestFile()
{
	console.log(document.getElementById('dynamic')?.firstElementChild?.outerHTML);
}

export default function App()
{
	async function setMajorPath(MP : string)
	{
		return MP;
	}

	async function loadCurrentPreset(minorPath : string)
	{
		console.log(rootMajorPath + minorPath);
		return rootMajorPath + minorPath;
	}

	let rootMajorPath = "";

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
							
							<Dropdown.Item >Development</Dropdown.Item>
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Arm
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button">Alpha</Dropdown.Item>
									<Dropdown.Item as="button">Bravo</Dropdown.Item>
									<Dropdown.Item as="button">Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Autonomy
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button">Alpha</Dropdown.Item>
									<Dropdown.Item as="button">Bravo</Dropdown.Item>
									<Dropdown.Item as="button">Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							<Dropdown drop="end" >
								<Dropdown.Toggle variant="success">
									Biosensor
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button">Alpha</Dropdown.Item>
									<Dropdown.Item as="button">Bravo</Dropdown.Item>
									<Dropdown.Item as="button">Charlie</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							
							
							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Core Rover
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item as="button" >Telemetry</Dropdown.Item>
									<Dropdown.Item as="button" >Driving</Dropdown.Item>
									<Dropdown.Item as="button" ></Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Dropdown.Menu>
					</Dropdown>
				</div>

				<Button className="expoButton" type="submit">
					Refresh
				</Button>

			<Button className="expoButton" type="submit" onClick={() => exportTestFile()}>
				Export
			</Button>

			</div>

			<div id="Dynamic">
				<Outlet />
			</div>
		</>
  );
}