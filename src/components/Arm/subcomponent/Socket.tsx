import Container from '../../dev/Container'
import Arm_Socket from 'src/components/sources/ArmSocket';

export default function Arm_Socket_Component()
{
	return (
		<>
			<Container padUp='var(--buttonHeight)' padRight='12px' padDown='12px' padLeft='12px' widthSize='var(--standardSourceWidth)' heightSize='var(--standardSourceHeight)'>
				<Arm_Socket />
			</Container>
		</>
	);
} 