import { useState } from 'react';
import { NavLink, Outlet } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { coreDrivingPath, armDigitPath } from '../main.tsx';

export default function Banner() {
	const [iconAdr, setIconAdr] = useState("../src/assets/favicon.png");
	return (
		<>
			<div>
				<div className="headDiv">
					<button onClick={() => setIconAdr(iconAdr == '../src/assets/favicon.png' ? '../src/assets/serious.png' : '../src/assets/favicon.png')} className="lImg" >
						<img src={iconAdr} alt="Astra Logo" className="lImg" /></button>
					<h1 className="banner">
						UAH S.H.C ASTRA
					</h1>

					<button>
						<NavLink to={coreDrivingPath} end>
							<img src={"../src/assets/banner_icons/controller.webp"} />
						</NavLink>
					</button>
					<button>
						<NavLink to={coreDrivingPath} end>
							<img src={"../src/assets/banner_icons/rover.webp"} />
						</NavLink>
					</button>
					<button>
						<NavLink to={armDigitPath} end>
							<img src={"../src/assets/banner_icons/arm.webp"} />
						</NavLink>
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