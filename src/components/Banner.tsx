import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, NavLink, Outlet } from "react-router";
import { coreDrivingPath, armDigitPath } from '../main.tsx';
export default function Banner() {
	const [iconAdr, setIconAdr] = useState("../src/assets/favicon.png");
	const currentLocation = useLocation();
	return (
		<>
			<div>
				<div className="banner">
					<button onClick={() => setIconAdr(iconAdr == '../src/assets/favicon.png' ? '../src/assets/serious.png' : '../src/assets/favicon.png')} className="lImg" >
						<img src={iconAdr} alt="Astra Logo" className="lImg" /></button>
					<h1 className="banner-text">
						UAH S.H.C ASTRA
					</h1>

					<button className={currentLocation.pathname == "/" ? "selectedButton" : "unselectedButton"}>
						<NavLink to={'/'} end>
							<img src={"../src/assets/banner_icons/manual.webp"} />
						</NavLink>
					</button>
					<div className='buttonSpacer' />
					<button className={currentLocation.pathname == coreDrivingPath ? "selectedButton" : "unselectedButton"}>
						<NavLink to={coreDrivingPath} end>
							<img src={"../src/assets/banner_icons/rover.webp"} />
						</NavLink>
					</button>
					<div className='buttonSpacer' />
					<button className={currentLocation.pathname == armDigitPath ? "selectedButton" : "unselectedButton"}>
						<div className='button'>
							<NavLink to={armDigitPath} end>
								<img src={"../src/assets/banner_icons/arm.webp"} />
							</NavLink>
						</div>
					</button>
					<img src="../src/assets/clucky.png" alt="Clucky!" className="rImg" />
				</div>
			</div>

			<div className="flexDiv">
				<Outlet />
			</div>
		</>
	);
}