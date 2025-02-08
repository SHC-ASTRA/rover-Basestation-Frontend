import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Core_Telemetry from './components/Core/Telemetry.tsx';
import Core_Driving from './components/Core/Driving.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="Core/Telemetry" element={<Core_Telemetry />} />
				<Route path="Core/Driving" element={<Core_Driving />} />
			</Route>
		</Routes>
	</BrowserRouter>
  </StrictMode>,
)