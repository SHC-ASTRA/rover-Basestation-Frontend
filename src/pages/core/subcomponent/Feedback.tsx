import Container from '../../../components/Container';
import Core_Feedback from '../../../components/core/CoreFeedbackSource';

export default function Core_Feedback_Component() {
	return (
		<>
			<Container padUp='var(--buttonHeight)' padRight='var(--stdPad)' padDown='var(--stdPad)' padLeft='var(--stdPad)' widthSize='var(--stdContainerWidth)' heightSize='var(--stdContainerHeight)'>
				<Core_Feedback />
			</Container>
		</>
	);
}