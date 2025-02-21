import Container from '../../components/Container';
import BioFeedback from '../../components/arm/BioFeedback';
import Arm_Socket_Component from './subcomponent/Socket';
export default function Arm_Bio_Component() {
	return (
		<>
			<Arm_Socket_Component />
			<Container
				marginUp='var(--stdMargin)'
				marginRight='var(--stdMargin)'
				marginDown='var(--stdMargin)'
				marginLeft='var(--stdMargin)'
				widthSize='var(--stdContainerWidth)'
				heightSize='var(--stdContainerHeight)'
			>
				<BioFeedback />
			</Container>
		</>
	);
} 