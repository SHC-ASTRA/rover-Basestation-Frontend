import { useContext } from "react";
import Container from "./Container";
import GamepadContext from "../../lib/gamepadContext";

function ControllerDisplay() {
	const gamepad = useContext(GamepadContext);

	return (
		<>
			{gamepad.gamepadConnected ?
				<Container
					padUp='var(--buttonHeight)'
					padRight='var(--stdPad)'
					padDown='var(--stdPad)'
					padLeft='var(--stdPad)'

					widthSize='var(--stdContainerWidth)'
					heightSize='inherit'
				>
					<div id="controller">
						<ul className='buttons'>
							<>
								<li className='button'>
									A: {gamepad.a ? "true" : "false"}
								</li>
								<li className='button'>
									B: {gamepad.b ? "true" : "false"}
								</li>
								<li className='button'>
									X: {gamepad.x ? "true" : "false"}
								</li>
								<li className='button'>
									Y: {gamepad.y ? "true" : "false"}
								</li>
								<li className='button'>
									Left Bumper: {gamepad.left_bumper ? "true" : "false"}
								</li>
								<li className='button'>
									Right Bumper: {gamepad.right_bumper ? "true" : "false"}
								</li>
								<li className='button'>
									Left Trigger: {gamepad.left_trigger.toFixed(2)}
								</li>
								<li className='button'>
									Right Trigger: {gamepad.right_trigger.toFixed(2)}
								</li>
								<li className='button'>
									Select: {gamepad.select ? "true" : "false"}
								</li>
								<li className='button'>
									Start: {gamepad.start ? "true" : "false"}
								</li>
								<li className='button'>
									Up: {gamepad.up ? "true" : "false"}
								</li>
								<li className='button'>
									Down: {gamepad.down ? "true" : "false"}
								</li>
								<li className='button'>
									Left: {gamepad.left ? "true" : "false"}
								</li>
								<li className='button'>
									Right: {gamepad.right ? "true" : "false"}
								</li>
								<li className='button'>
									Right Stick Pressed: {gamepad.right_stick.pressed ? "true" : "false"}
								</li>
								<li className='button'>
									Left Stick Pressed: {gamepad.left_stick.pressed ? "true" : "false"}
								</li>
							</>
						</ul>

						<div className='axes'>
							<progress className='axis' max='2' value={gamepad.left_stick.x + 1}>
								{gamepad.left_stick.x + 1}%
							</progress>
							<progress className='axis' max='2' value={gamepad.left_stick.y + 1}>
								{gamepad.left_stick.y + 1}%
							</progress>
							<progress className='axis' max='2' value={gamepad.right_stick.x + 1}>
								{gamepad.right_stick.x + 1}%
							</progress>
							<progress className='axis' max='2' value={gamepad.right_stick.y + 1}>
								{gamepad.right_stick.y + 1}%
							</progress>
						</div>
					</div>
				</Container>
				: <div></div>}
		</>
	);
}
export default ControllerDisplay;