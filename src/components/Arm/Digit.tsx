import Arm_Socket from './Socket';
import Container from '../dev/Container'
import Arm_Digit from '../sources/ArmDigit';

export default function Arm_Digit_Component()
{
	return (
		<>
			<Arm_Socket />
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Arm_Digit />
			</Container>
		</>
	);
} 