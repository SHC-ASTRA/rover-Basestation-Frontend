import { useState } from 'react';
import { Outlet } from "react-router";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { coreDrivingPath, coreFeedbackPath, armBioPath, armDigitPath } from '../main.tsx';

export default function Banner() {
	const [iconAdr, setIconAdr] = useState("../src/assets/favicon.png");
	return (
		<>
			<div className="headDiv">
				<button onClick={() => setIconAdr(iconAdr == '../src/assets/favicon.png' ? '../src/assets/serious.png' : '../src/assets/favicon.png')} className="lImg" >
					<img src={iconAdr} alt="Astra Logo" className="lImg" /></button>
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
									<Dropdown.Item href={armBioPath}>
										Bio
									</Dropdown.Item>

									<Dropdown.Item href={armDigitPath}>
										Digit
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>

							<Dropdown drop="end">
								<Dropdown.Toggle variant="success">
									Core Rover
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item href={coreDrivingPath}>
										Driving
									</Dropdown.Item>

									<Dropdown.Item href={coreFeedbackPath}>
										Feedback
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Dropdown.Menu>
					</Dropdown>

				</div>

				<Button className="sideButton" href={window.location.href}>
					Refresh
				</Button>

			</div>
			<div className="flexDiv">
				<Outlet />
			</div>
		</>
	);
}