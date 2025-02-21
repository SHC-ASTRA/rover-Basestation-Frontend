import Container from '../../components/Container';
import Auto_Feedback from '../../components/core/AutoFeedbackSource';
import Core_Feedback_Component from './subcomponent/Feedback';
export default function Core_Autonomy_Component() {
	return (
		<>
			<Core_Feedback_Component />
			<Container
				marginUp='var(--stdMargin)'
				marginRight='var(--stdMargin)'
				marginDown='var(--stdMargin)'
				marginLeft='var(--stdMargin)'
				widthSize='var(--stdContainerWidth)'
				heightSize='var(--stdContainerHeight)'
			>
				<Auto_Feedback />
			</Container>
		</>
	);
}