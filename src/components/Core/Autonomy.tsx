import Container from '../dev/Container';
import Auto_Feedback from '../sources/AutoFeedbackSource';
import Core_Feedback_Component from './subcomponent/Feedback';
export default function Core_Autonomy_Component()
{	
	return (
		<>
			<Core_Feedback_Component />
			<Container padUp='var(--buttonHeight)' padRight='var(--stdPad)' padDown='var(--stdPad)' padLeft='var(--stdPad)' widthSize='var(--stdContainerWidth)' heightSize='var(--stdContainerHeight)'>
				<Auto_Feedback />
			</Container>
		</>
	);
}