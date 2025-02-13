import Container from '../dev/Container';
import Auto_Feedback from '../sources/AutoFeedback';
import Core_Feedback_Component from './subcomponent/Feedback';
export default function Core_Autonomy_Component()
{	
	return (
		<>
			<Core_Feedback_Component />
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Auto_Feedback />
			</Container>
		</>
	);
}