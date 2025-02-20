import Banner from './Banner';
import ControllerDisplay from './components/dev/Controller';
import GamepadProvider from './lib/gamepad';

export default function App() {
	return <>
		<GamepadProvider>
			<Banner />
			<ControllerDisplay />
		</GamepadProvider>
	</>;
}