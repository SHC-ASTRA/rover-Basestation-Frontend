import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import Arm_Bio_Component from './components/Arm/Bio.tsx';
import Arm_Digit_Component from './components/Arm/Digit.tsx';
import Core_Driving_Component from './components/Core/Driving.tsx';
import Core_Feedback_Component from './components/Core/subcomponent/Feedback.tsx';

export const coreDrivingPath = "/Core/Driving";
export const coreFeedbackPath = "/Core/Feedback";
export const armBioPath = "/Arm/Bio";
export const armDigitPath = "/Arm/Digit";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path={armBioPath} element={<Arm_Bio_Component />} />
				<Route path={armDigitPath} element={<Arm_Digit_Component />} />
				<Route path={coreFeedbackPath} element={<Core_Feedback_Component />} />
				<Route path={coreDrivingPath} element={<Core_Driving_Component />} />
			</Route>
		</Routes>
	</BrowserRouter>
  </StrictMode>,
)