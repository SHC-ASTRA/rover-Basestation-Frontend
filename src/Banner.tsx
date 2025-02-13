import '../src/App.css'
import { Outlet } from "react-router";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

const Banner = () =>
{
	const coreDrivingPath = "/Core/Driving";
	const coreFeedbackPath = "/Core/Feedback";
	const armBioPath = "/Arm/Bio";
	const armDigitPath = "/Arm/Digit";

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

			<Outlet />
		</>
  );
}

export default Banner;