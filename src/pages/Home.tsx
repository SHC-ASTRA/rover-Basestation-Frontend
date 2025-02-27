import ControllerDisplay from "../components/Controller";

export default function Home() {
	return <>
		<div className='container feedback'>
			<div>
				<button className="home-button">
					Arm
				</button>
			</div>
			<div className="home-controller">
				<ControllerDisplay />
			</div>
		</div>
	</>;
}