import "../App.css"
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { coreDrivingPath, armDigitPath, autonomyPath, debugPath } from '../main.tsx';

function BannerButton(props: { path: string, img: string }) {
	const navigate = useNavigate();
	const currentLocation = useLocation();

	return <button onClick={() => navigate(props.path)} className={`banner-button ${(currentLocation.pathname == props.path) && "banner-button-active"}`}>
		<img src={props.img} className="banner-button-image" />
	</button>
}

export default function Banner() {
	const [iconAdr, setIconAdr] = useState("../ASTRA_Logo.png");

	return (
		<>
			<div className="banner">
				<button onClick={() => setIconAdr(iconAdr == '../ASTRA_Logo.png' ? '../src/assets/serious.png' : '../ASTRA_Logo.png')} className="lImg" >
					<img src={iconAdr} alt="Astra Logo" className="logo" /></button>

				<div style={{ flexGrow: 1 }}></div>

				<BannerButton path="/" img={"../src/assets/banner_icons/autonomy.webp"} />
				<BannerButton path={coreDrivingPath} img="../src/assets/banner_icons/rover.webp" />
				<BannerButton path={armDigitPath} img="../src/assets/banner_icons/arm.webp" />
				<BannerButton path={autonomyPath} img="../src/assets/banner_icons/autonomy.webp" />
				<BannerButton path={debugPath} img="../src/assets/banner_icons/debug.webp" />

				<div style={{ flexGrow: 1 }}></div>

				<div className="clucky">
					<img className="clucky-image" src="../src/assets/clucky.png" alt="Clucky!" />
				</div>
			</div>
		</>
	);
}