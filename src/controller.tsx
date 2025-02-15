const Controller = () =>
{
	window.addEventListener("gamepadconnected", (e) => {
		console.info (
			"Gamepad connected at index %d: %s. %d buttons, %d axes.",
			e.gamepad.index,
			e.gamepad.id,
			e.gamepad.buttons.length,
			e.gamepad.axes.length,
		);
	});

	window.addEventListener("gamepaddisconnected", (e) => {
		console.info (
			"The bluetooth device has been disconnected unsuccessfully",
			e.gamepad.index,
			e.gamepad.id
		);
	});

	return(<></>);
}
export default Controller;