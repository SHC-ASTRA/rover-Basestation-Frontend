import { Outlet } from "react-router";
import { useNavigate } from "react-router";

export default function Home() {
	const navigate = useNavigate();
	return <>
		<div className='container feedback'>
			<button className="home-button" onClick={() => navigate("./arm")}>
				Arm
			</button>
			<button className="home-button" onClick={() => navigate("./core")}>
				Core
			</button>
			<div className="home-controller">
				<Outlet />
			</div>
		</div>
	</>;
}