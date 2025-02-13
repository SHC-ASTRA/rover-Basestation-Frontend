import Container from '../dev/Container';
import Core_Driving_Control from '../sources/CoreDriving';
import Core_Feedback_Component from './subcomponent/Feedback';

export default function Core_Driving_Component()
{
	return (
		<>
			<Core_Feedback_Component />
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Core_Driving_Control />
			</Container>
		</>
	);
} 