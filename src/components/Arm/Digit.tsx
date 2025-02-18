import Container from '../dev/Container'
import Arm_Digit from '../sources/ArmDigitSource';
import Arm_Socket_Component from './subcomponent/Socket';

export default function Arm_Digit_Component()
{
	return (
		<>
			<Arm_Socket_Component />
			<Container padUp='var(--buttonHeight)' padRight='var(--stdPad)' padDown='var(--stdPad)' padLeft='var(--stdPad)' widthSize='var(--stdContainerWidth)' heightSize='var(--stdContainerHeight)'>
				<Arm_Digit />
			</Container>
		</>
	);
} 