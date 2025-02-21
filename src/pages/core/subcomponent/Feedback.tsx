import Container from '../../../components/Container';
import Core_Feedback from '../../../components/core/CoreFeedbackSource';

export default function Core_Feedback_Component() {
	return (
		<>
			<Container
				marginUp='var(--stdMargin)'
				marginRight='var(--stdMargin)'
				marginDown='var(--stdMargin)'
				marginLeft='var(--stdMargin)'
				widthSize='var(--stdContainerWidth)'
				heightSize='var(--stdContainerHeight)'
			>
				<Core_Feedback />
			</Container>
		</>
	);
}