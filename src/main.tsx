import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Arm_Bio from './components/Arm/Bio.tsx';
import Arm_Digit from './components/Arm/Digit.tsx';
import Core_Driving from './components/Core/Driving.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import Core_Feedback_Component from './components/Core/Feedback.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="/arm/bio" element={<Arm_Bio />} />
				<Route path="/arm/digit" element={<Arm_Digit />} />
				<Route path="/core/feedback" element={<Core_Feedback_Component />} />
				<Route path="/core/driving" element={<Core_Driving />} />
			</Route>
		</Routes>
	</BrowserRouter>
  </StrictMode>,
)