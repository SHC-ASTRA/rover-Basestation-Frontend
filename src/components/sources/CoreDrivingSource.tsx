export default function Core_Driving_Control() {
	const coreControl = {data: { max_speed: 0, brake: 0, left_stick: 0, right_stick: 0 }};
	
	return (
		<div>
			<h1>Core Driving</h1>
			{coreControl && (
				<>
					<p>Max Speed: {coreControl.data.max_speed}</p>
					<p>Brake: {coreControl.data.brake}</p>
					<p>Left Stick: {coreControl.data.left_stick}</p>
					<p>Right Stick: {coreControl.data.right_stick}</p>
				</>
			) || <p>No core driving</p>}
		</div>
	);
}