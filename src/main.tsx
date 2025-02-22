import App from './App.tsx';
import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import Arm_Bio_Component from './pages/arm/Bio.tsx';
import Arm_Digit_Component from './pages/arm/Digit.tsx';
import Core_Driving_Component from './pages/core/Driving.tsx';
import Core_Feedback_Component from './pages/core/subcomponent/Feedback.tsx';

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
					<Route path={armBioPath} element={<Arm_Bio_Component />} />
					<Route path={armDigitPath} element={<Arm_Digit_Component />} />
					<Route path={coreFeedbackPath} element={<Core_Feedback_Component />} />
					<Route path={coreDrivingPath} element={<Core_Driving_Component />} />
					<Route path={autonomyPath} element={<Core_Driving_Component />} />
					<Route path={debugPath} element={<Core_Driving_Component />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
)