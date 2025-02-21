import Container from '../../components/Container';
import Core_Driving_Control from '../../components/core/CoreDrivingSource';
import Core_Feedback_Component from './subcomponent/Feedback';

export default function Core_Driving_Component() {
	return (
		<>
			<Core_Feedback_Component />
			<Container padUp='var(--buttonHeight)' padRight='var(--stdPad)' padDown='var(--stdPad)' padLeft='var(--stdPad)' widthSize='var(--stdContainerWidth)' heightSize='var(--stdContainerHeight)'>
				<Core_Driving_Control />
			</Container>
		</>
	);
} 