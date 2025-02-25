import { Outlet } from 'react-router';
import './App.css'
import Banner from './components/Banner';
import GamepadProvider from './lib/gamepad';
import { ErrorBoundary } from 'react-error-boundary';
import BioDataProvider from './components/bio/BioDataProvider';

export default function App() {
	return <>
		<GamepadProvider><BioDataProvider>
			<div className="basestation">
				<Banner />
				<div className="display">
					<ErrorBoundary fallback={<p>Something went wrong! Check the console for more details.</p>}>
						<Outlet />
					</ErrorBoundary>
				</div>
			</div>
		</BioDataProvider></GamepadProvider>
	</>;
}