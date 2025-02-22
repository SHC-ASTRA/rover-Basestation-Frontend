import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router";
import { coreDrivingPath, armDigitPath } from '../main.tsx';

function BannerButton(props: { path: string, img: string }) {
	const navigate = useNavigate();
	const currentLocation = useLocation();

	return <button onClick={() => navigate(props.path)} className={`banner-button ${(currentLocation.pathname == props.path) && "banner-button-active"}`}>
		<img src={props.img} />
	</button>
}

export default function Banner() {
	const [iconAdr, setIconAdr] = useState("../src/assets/favicon.png");

	return (
		<>
			<div>
				<div className="banner">
					<button onClick={() => setIconAdr(iconAdr == '../src/assets/favicon.png' ? '../src/assets/serious.png' : '../src/assets/favicon.png')} className="lImg" >
						<img src={iconAdr} alt="Astra Logo" className="lImg" /></button>
					<h1 className="banner-text">
						UAH S.H.C ASTRA
					</h1>

					<BannerButton path="/" img={"../src/assets/banner_icons/manual.webp"} />
					<BannerButton path={coreDrivingPath} img="../src/assets/banner_icons/rover.webp" />
					<BannerButton path={armDigitPath} img="../src/assets/banner_icons/arm.webp" />
					<img src="../src/assets/clucky.png" alt="Clucky!" className="rImg" />
				</div>
			</div>
		</>
	);
}