import './App.css'
import Banner from './components/Banner';
import ControllerDisplay from './components/Controller';
import GamepadProvider from './lib/gamepad';

export default function App() {
	return <>
		<GamepadProvider>
			<Banner />
			<ControllerDisplay />
		</GamepadProvider>
	</>;
}