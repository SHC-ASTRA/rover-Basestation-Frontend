import Container from '../../components/Container';
import BioFeedback from '../../components/arm/BioFeedback';
import Arm_Socket_Component from './subcomponent/Socket';
export default function Arm_Bio_Component() {
	return (
		<>
			<Arm_Socket_Component />
			<Container padUp='var(--buttonHeight)' padRight='var(--stdPad)' padDown='var(--stdPad)' padLeft='var(--stdPad)' widthSize='var(--stdContainerWidth)' heightSize='var(--stdContainerHeight)'>
				<BioFeedback />
			</Container>
		</>
	);
} 