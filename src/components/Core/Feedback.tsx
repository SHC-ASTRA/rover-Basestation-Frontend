import Container from '../dev/Container';
import Core_Feedback from '../sources/CoreFeedback';

export default function Core_Feedback_Component()
{	
	return (
		<>
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Core_Feedback />
			</Container>
		</>
	);
}