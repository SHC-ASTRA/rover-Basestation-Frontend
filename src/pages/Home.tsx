import ControllerDisplay from "../components/Controller";

export default function Home() {
	return <>
		<div className='container feedback'>
			<div style={{ position: "relative", display: "flex", flexDirection: "column", maxWidth: "50%", left: "25%" }}>
				<ControllerDisplay />
			</div>
		</div>
	</>;
}