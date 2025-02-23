import App from './App.tsx';
import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import ArmBioPage from './pages/arm/Bio.tsx';
import ArmDigitPage from './pages/arm/Digit.tsx';
import CoreDrivingPage from './pages/core/Driving.tsx';
import CoreFeedbackComponent from './pages/core/subcomponent/Feedback.tsx';
import DebugPage from './pages/Debug.tsx';
import CoreAutonomyPage from './pages/core/Autonomy.tsx';

export const coreDrivingPath = "/core/driving";
export const coreFeedbackPath = "/core/feedback";
export const armBioPath = "/arm/bio";
export const armDigitPath = "/arm/digit";
export const autonomyPath = "/autonomy";
export const debugPath = "/debug";

createContext({});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path={armBioPath} element={<ArmBioPage />} />
					<Route path={armDigitPath} element={<ArmDigitPage />} />
					<Route path={coreDrivingPath} element={<CoreDrivingPage />} />
					<Route path={autonomyPath} element={<CoreAutonomyPage />} />
					<Route path={debugPath} element={<DebugPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
)