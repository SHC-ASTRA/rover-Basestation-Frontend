import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Arm_Bio from './components/Arm/Bio.tsx';
import Arm_Digit from './components/Arm/Digit.tsx';
import Core_Driving from './components/Core/Driving.tsx';
import Core_Feedback from './components/Core/Feeback.tsx';
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="/arm/bio" element={<Arm_Bio />} />
				<Route path="/arm/digit" element={<Arm_Digit />} />
				<Route path="/core/feedback" element={<Core_Feedback />} />
				<Route path="/core/driving" element={<Core_Driving />} />
			</Route>
		</Routes>
	</BrowserRouter>
  </StrictMode>,
)