import ControllerDisplay from "../components/Controller";

export default function Home() {
	return <>
		<div className='container feedback'>
			<div>
				<button className="homeButton">
					Arm
				</button>
			</div>
			<div className="homeController">
				<ControllerDisplay />
			</div>
		</div>
	</>;
}