import Container from '../../components/Container';
import Core_Driving_Control from '../../components/core/CoreDrivingSource';
import Core_Feedback_Component from './subcomponent/Feedback';

export default function Core_Driving_Component() {
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
				<Core_Driving_Control />
			</Container>
		</>
	);
} 