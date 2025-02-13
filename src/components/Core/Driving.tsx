import Container from '../dev/Container';
import Core_Driving_Control from '../sources/CoreDriving';
import Core_Feedback from '../sources/CoreFeedback';

export default function Core_Driving_Component()
{
	return (
		<>
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Core_Feedback />
				<Core_Driving_Control />
			</Container>
		</>
	);
} 