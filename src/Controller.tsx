import Container from "./components/dev/Container";

let gamePads: (Gamepad | null)[];
let loopStarted: boolean;

export let gamePad: Gamepad;

let addedListeners: boolean;

function addListeners() {
	window.addEventListener("gamepadconnected", () => {
		if (gamePads != null && gamePads[0])
			return;
		onGamepadConnected();
	});

	window.addEventListener("gamepaddisconnected", () => {
		if (gamePads[0] == null)
			//Hardware disconnect
			return;
		gamepadDisconnected();
	});
}

function ControllerDisplay({ isActive = true }) {
	if (!addedListeners) {
		addListeners();
		addedListeners = true;
	}

	return (
		<>
			{isActive &&
				<Container
					padUp='var(--buttonHeight)'
					padRight='var(--stdPad)'
					padDown='var(--stdPad)'
					padLeft='var(--stdPad)'

					widthSize='var(--stdContainerWidth)'
					heightSize='inherit'
				>
					<div id="controller0">
						<h1>
							gamepad: 0
						</h1>

						<ul className='buttons'>
							<>
								<li className='button'>
									Button 0
								</li>
								<li className='button'>
									Button 1
								</li>
								<li className='button'>
									Button 2
								</li>
								<li className='button'>
									Button 3
								</li>
								<li className='button'>
									Button 4
								</li>
								<li className='button'>
									Button 5
								</li>
								<li className='button'>
									Button 6
								</li>
								<li className='button'>
									Button 7
								</li>
								<li className='button'>
									Button 8
								</li>
								<li className='button'>
									Button 9
								</li>
								<li className='button'>
									Button 10
								</li>
								<li className='button'>
									Button 11
								</li>
								<li className='button'>
									Button 12
								</li>
								<li className='button'>
									Button 13
								</li>
								<li className='button'>
									Button 14
								</li>
								<li className='button'>
									Button 15
								</li>
								<li className='button'>
									Button 16
								</li>
							</>
						</ul>

						<div className='axes'>
							<progress className='axis' max='2' value='1'>
								0
							</progress>
							<progress className='axis' max='2' value='1'>
								1
							</progress>
							<progress className='axis' max='2' value='1'>
								0
							</progress>
							<progress className='axis' max='2' value='1'>
								1
							</progress>
						</div>
					</div>
				</Container>
			}
			{!isActive && <div></div>}
		</>
	);
}

function gamepadDisconnected() {
	document.querySelector('#controller0')?.remove();
	gamePads = [];
	console.warn("Gamepad Disconnected");
	return (<></>);
}

function onGamepadConnected() {
	gamePads = navigator.getGamepads();
	if (gamePads[0] == null) {
		console.warn("No gamepad found");
		return;
	}
	gamePad = gamePads[0];
	console.warn("Gamepad Connected");

	if (!loopStarted) {
		requestAnimationFrame(updateStatus);
		loopStarted = true;
	}
}

function updateStatus() {
	if (gamePads[0]) {
		const d = document.getElementById("controller0");
		console.warn(d);
		const buttonElements = d?.getElementsByClassName("button");
		for (const [i, button] of gamePads[0].buttons.entries()) {
			if (!buttonElements) {
				console.warn('Controller Disconnected');
				return;
			}

			const el: Element = buttonElements[i];

			if (button.pressed) {
				el.textContent = `Button ${i} [PRESSED]`;
				el.className = "button pressed";
			} else {
				el.textContent = `Button ${i}`;
				el.className = "button";
			}
		}

		const axisElements = d?.getElementsByClassName("axis");
		for (const [i, axis] of gamePads[0].axes.entries()) {
			if (!axisElements)
				return;
			const el = axisElements[i];
			el.textContent = `${i}: ${axis.toFixed(4)}`;
			el.setAttribute("value", (axis + 1).toString());
		}
	}
	requestAnimationFrame(updateStatus);
}

export default ControllerDisplay;