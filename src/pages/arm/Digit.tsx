import Container from '../../components/Container'
import Arm_Digit from '../../components/arm/ArmDigitSource';
import Arm_Socket_Component from './subcomponent/Socket';

export default function Arm_Digit_Component() {
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
				<Arm_Digit />
			</Container>
		</>
	);
} 