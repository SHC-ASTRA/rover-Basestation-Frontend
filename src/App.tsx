import { Outlet } from 'react-router';
import './App.css'
import Banner from './components/Banner';
import GamepadProvider from './lib/gamepad';

export default function App() {
	return <>
		<GamepadProvider>
			<Banner />
			<Outlet />
		</GamepadProvider>
	</>;
}