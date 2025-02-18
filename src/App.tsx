import Banner from './Banner';
import { useEffect, useState } from 'react';
import Controller_Display from './Controller';

export default function App() {

	const [shouldRenderController, setShouldRenderController] = useState(false);
	
	useEffect(() => {
		console.log(window.location.pathname);
		if(window.location.pathname == "/")
		{
			if(shouldRenderController)
				setShouldRenderController(false);
		}
		else
		{
			if(!shouldRenderController)
				setShouldRenderController(true);
		}
	}, [shouldRenderController]);

	return <>
		<Banner />
		<Controller_Display isActive={shouldRenderController}/>
	</>;
}